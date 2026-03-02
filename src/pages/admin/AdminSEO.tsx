import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface PageMeta {
  id: string;
  page_path: string;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
  extra_head: string | null;
  updated_at: string;
}

const emptyMeta: Omit<PageMeta, "id" | "updated_at"> = {
  page_path: "", meta_title: "", meta_description: "", og_title: "", og_description: "", og_image: "", canonical_url: "", noindex: false, extra_head: "",
};

const AdminSEO = () => {
  const { user } = useAuth();
  const [metas, setMetas] = useState<PageMeta[]>([]);
  const [editing, setEditing] = useState<Partial<PageMeta> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchMetas = async () => {
    const { data } = await supabase.from("page_meta").select("*").order("page_path");
    setMetas((data as PageMeta[]) ?? []);
  };

  useEffect(() => { fetchMetas(); }, []);

  const handleSave = async () => {
    if (!editing?.page_path) return;
    setSaving(true);
    const payload = {
      page_path: editing.page_path,
      meta_title: editing.meta_title || null,
      meta_description: editing.meta_description || null,
      og_title: editing.og_title || null,
      og_description: editing.og_description || null,
      og_image: editing.og_image || null,
      canonical_url: editing.canonical_url || null,
      noindex: editing.noindex ?? false,
      extra_head: editing.extra_head || null,
      updated_at: new Date().toISOString(),
      updated_by: user?.id,
    };
    if (editing.id) {
      await supabase.from("page_meta").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("page_meta").insert(payload);
    }
    setSaving(false);
    setEditing(null);
    fetchMetas();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this meta entry?")) return;
    await supabase.from("page_meta").delete().eq("id", id);
    fetchMetas();
  };

  if (editing) {
    return (
      <div className="p-6 space-y-4 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">{editing.id ? "Edit Meta" : "New Page Meta"}</h1>
          <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-4">
          <div><Label>Page Path</Label><Input value={editing.page_path ?? ""} onChange={e => setEditing({ ...editing, page_path: e.target.value })} placeholder="/free-zones" /></div>
          <div><Label>Meta Title</Label><Input value={editing.meta_title ?? ""} onChange={e => setEditing({ ...editing, meta_title: e.target.value })} /><p className="text-xs text-muted-foreground mt-1">{(editing.meta_title ?? "").length}/60 chars</p></div>
          <div><Label>Meta Description</Label><Textarea rows={2} value={editing.meta_description ?? ""} onChange={e => setEditing({ ...editing, meta_description: e.target.value })} /><p className="text-xs text-muted-foreground mt-1">{(editing.meta_description ?? "").length}/160 chars</p></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>OG Title</Label><Input value={editing.og_title ?? ""} onChange={e => setEditing({ ...editing, og_title: e.target.value })} /></div>
            <div><Label>OG Description</Label><Input value={editing.og_description ?? ""} onChange={e => setEditing({ ...editing, og_description: e.target.value })} /></div>
          </div>
          <div><Label>OG Image URL</Label><Input value={editing.og_image ?? ""} onChange={e => setEditing({ ...editing, og_image: e.target.value })} /></div>
          <div><Label>Canonical URL</Label><Input value={editing.canonical_url ?? ""} onChange={e => setEditing({ ...editing, canonical_url: e.target.value })} /></div>
          <div className="flex items-center gap-3">
            <Switch checked={editing.noindex ?? false} onCheckedChange={v => setEditing({ ...editing, noindex: v })} />
            <Label>noindex (hide from search engines)</Label>
          </div>
          <div><Label>Extra Head HTML</Label><Textarea rows={3} value={editing.extra_head ?? ""} onChange={e => setEditing({ ...editing, extra_head: e.target.value })} placeholder="GA script, custom tags…" className="font-mono text-xs" /></div>
          <Button onClick={handleSave} disabled={saving} className="gap-2"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">SEO / Meta Tags</h1>
        <Button onClick={() => setEditing({ ...emptyMeta })} className="gap-2"><Plus className="h-4 w-4" /> Add Page</Button>
      </div>
      <p className="text-sm text-muted-foreground">Override meta tags for any page. These take priority over default SEO settings.</p>
      <div className="space-y-2">
        {metas.map(m => (
          <div key={m.id} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <div>
              <span className="font-medium text-foreground font-mono text-sm">{m.page_path}</span>
              {m.noindex && <span className="ml-2 text-xs text-destructive">noindex</span>}
              <p className="text-xs text-muted-foreground mt-1">{m.meta_title || "No title set"}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setEditing(m)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {metas.length === 0 && <p className="text-muted-foreground text-center py-8">No page meta overrides yet</p>}
      </div>
    </div>
  );
};

export default AdminSEO;
