import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

/**
 * Admin page: bulk-import how-to articles from CSV.
 * Expected CSV columns: language,language_code,text_direction,article_number,slug,page_title,meta_description,primary_keyword,word_count,content_html,content_markdown
 */

function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && i + 1 < row.length && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(text: string) {
  // Split by newlines but respect quoted fields
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && i + 1 < text.length && text[i + 1] === '"') {
        current += '""';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      current += char;
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (current.trim()) lines.push(current);
      current = "";
      if (char === "\r" && i + 1 < text.length && text[i + 1] === "\n") i++;
    } else {
      current += char;
    }
  }
  if (current.trim()) lines.push(current);

  if (lines.length < 2) return [];

  const headers = parseCSVRow(lines[0]).map((h) => h.replace(/^\uFEFF/, "").trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] ?? "";
    });
    rows.push(obj);
  }
  return rows;
}

const AdminHowToImport = () => {
  const [importing, setImporting] = useState(false);
  const [stats, setStats] = useState<{ total: number; success: number; errors: number } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setStats(null);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error("No valid rows found in CSV");
        setImporting(false);
        return;
      }

      let success = 0;
      let errors = 0;
      const BATCH_SIZE = 20;

      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE).map((r) => ({
          language: r.language || "english",
          language_code: r.language_code || "en",
          text_direction: r.text_direction || "ltr",
          article_number: r.article_number || "00",
          slug: r.slug,
          page_title: r.page_title,
          meta_description: r.meta_description || null,
          primary_keyword: r.primary_keyword || null,
          word_count: parseInt(r.word_count) || 0,
          content_html: r.content_html || "",
          content_markdown: r.content_markdown || "",
          published: true,
        }));

        const { error } = await supabase
          .from("howto_articles")
          .upsert(batch, { onConflict: "language_code,slug" });

        if (error) {
          console.error("Batch insert error:", error);
          errors += batch.length;
        } else {
          success += batch.length;
        }

        // Update progress
        setStats({ total: rows.length, success, errors });
      }

      setStats({ total: rows.length, success, errors });
      if (errors === 0) {
        toast.success(`Successfully imported ${success} articles!`);
      } else {
        toast.warning(`Imported ${success} articles, ${errors} failed.`);
      }
    } catch (err) {
      console.error("Import error:", err);
      toast.error("Failed to parse CSV file");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Import How-To Articles</h1>
        <p className="text-muted-foreground mt-1">
          Upload the CSV file to bulk-import articles into the How-To library. Existing articles with matching language + slug will be updated.
        </p>
      </div>

      <div className="border border-dashed border-border rounded-xl p-10 text-center bg-card space-y-4">
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-sm text-muted-foreground mb-4">
          Expected columns: language, language_code, text_direction, article_number, slug, page_title, meta_description, primary_keyword, word_count, content_html, content_markdown
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <label className="inline-block">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={importing}
            />
            <Button variant="default" disabled={importing} asChild>
              <span>
                {importing ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing…</>
                ) : (
                  <><Upload className="h-4 w-4 mr-2" /> Select CSV File</>
                )}
              </span>
            </Button>
          </label>
          <Button
            variant="outline"
            disabled={importing}
            onClick={async () => {
              setImporting(true);
              setStats(null);
              try {
                const res = await fetch("/imports/howto-articles.csv");
                const text = await res.text();
                const rows = parseCSV(text);
                if (rows.length === 0) {
                  toast.error("No valid rows found in bundled CSV");
                  setImporting(false);
                  return;
                }
                let success = 0;
                let errors = 0;
                const BATCH_SIZE = 20;
                for (let i = 0; i < rows.length; i += BATCH_SIZE) {
                  const batch = rows.slice(i, i + BATCH_SIZE).map((r) => ({
                    language: r.language || "english",
                    language_code: r.language_code || "en",
                    text_direction: r.text_direction || "ltr",
                    article_number: r.article_number || "00",
                    slug: r.slug,
                    page_title: r.page_title,
                    meta_description: r.meta_description || null,
                    primary_keyword: r.primary_keyword || null,
                    word_count: parseInt(r.word_count) || 0,
                    content_html: r.content_html || "",
                    content_markdown: r.content_markdown || "",
                    published: true,
                  }));
                  const { error } = await supabase
                    .from("howto_articles")
                    .upsert(batch, { onConflict: "language_code,slug" });
                  if (error) {
                    console.error("Batch insert error:", error);
                    errors += batch.length;
                  } else {
                    success += batch.length;
                  }
                  setStats({ total: rows.length, success, errors });
                }
                setStats({ total: rows.length, success, errors });
                if (errors === 0) toast.success(`Imported ${success} articles!`);
                else toast.warning(`Imported ${success}, ${errors} failed.`);
              } catch (err) {
                console.error("Import error:", err);
                toast.error("Failed to fetch bundled CSV");
              } finally {
                setImporting(false);
              }
            }}
          >
            {importing ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing…</>
            ) : (
              <>📦 Import Bundled CSV</>
            )}
          </Button>
        </div>
      </div>

      {stats && (
        <div className="border border-border rounded-xl p-6 bg-card space-y-3">
          <h3 className="font-semibold text-foreground">Import Results</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Rows</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
                <CheckCircle className="h-5 w-5" /> {stats.success}
              </p>
              <p className="text-xs text-muted-foreground">Imported</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400 flex items-center justify-center gap-1">
                <AlertCircle className="h-5 w-5" /> {stats.errors}
              </p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHowToImport;
