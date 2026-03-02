import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X, Save } from "lucide-react";

interface SiteContent {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  cta_text: string | null;
  cta_link: string | null;
  image_url: string | null;
  updated_at: string;
}

const DEFAULT_SECTIONS = [
  { key: "hero", label: "Hero Section" },
  { key: "trust_strip", label: "Trust Strip" },
  { key: "featured_tools", label: "Featured Tools" },
  { key: "final_cta", label: "Final CTA" },
  { key: "why_founders", label: "Why Founders Section" },
];

const AdminContent = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState<SiteContent[]>([]);
  const [editing, setEditing] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section_key");
    setSections((data as SiteContent[]) ?? []);
  };

  useEffect(() => { fetchContent(); }, []);

  const initSection = async (key: string) => {
    await supabase.from("site_content").insert({ section_key: key, updated_by: user?.id });
    fetchContent();
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    await supabase.from("site_content").update({
      title: editing.title,
      subtitle: editing.subtitle,
      body: editing.body,
      cta_text: editing.cta_text,
      cta_link: editing.cta_link,
      image_url: editing.image_url,
      updated_at: new Date().toISOString(),
      updated_by: user?.id,
    }).eq("id", editing.id);
    setSaving(false);
    setEditing(null);
    fetchContent();
  };

  const existingKeys = new Set(sections.map(s => s.section_key));

  if (editing) {
    return (
      <div className="p-6 space-y-4 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">Edit: {editing.section_key}</h1>
          <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-4">
          <div><Label>Title</Label><Input value={editing.title ?? ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
          <div><Label>Subtitle</Label><Input value={editing.subtitle ?? ""} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} /></div>
          <div><Label>Body</Label><Textarea rows={6} value={editing.body ?? ""} onChange={e => setEditing({ ...editing, body: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>CTA Text</Label><Input value={editing.cta_text ?? ""} onChange={e => setEditing({ ...editing, cta_text: e.target.value })} /></div>
            <div><Label>CTA Link</Label><Input value={editing.cta_link ?? ""} onChange={e => setEditing({ ...editing, cta_link: e.target.value })} /></div>
          </div>
          <div><Label>Image URL</Label><Input value={editing.image_url ?? ""} onChange={e => setEditing({ ...editing, image_url: e.target.value })} /></div>
          <Button onClick={handleSave} disabled={saving} className="gap-2"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="font-display text-2xl font-bold text-foreground">Site Content</h1>
      <p className="text-sm text-muted-foreground">Edit key website sections. Changes override the default content shown on the site.</p>
      <div className="space-y-2">
        {DEFAULT_SECTIONS.map(ds => {
          const existing = sections.find(s => s.section_key === ds.key);
          return (
            <div key={ds.key} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
              <div>
                <span className="font-medium text-foreground">{ds.label}</span>
                <span className="text-xs text-muted-foreground ml-2">({ds.key})</span>
                {existing && <p className="text-xs text-muted-foreground mt-1">Last updated: {new Date(existing.updated_at).toLocaleDateString()}</p>}
              </div>
              {existing ? (
                <Button variant="ghost" size="icon" onClick={() => setEditing(existing)}><Pencil className="h-4 w-4" /></Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => initSection(ds.key)}>Initialize</Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminContent;
