import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

const emptyPost: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
  slug: "", title: "", excerpt: "", content: "", cover_image: "", meta_title: "", meta_description: "", tags: [], published: false,
};

const AdminBlog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) ?? []);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) return;
    setSaving(true);
    const payload = {
      slug: editing.slug,
      title: editing.title,
      excerpt: editing.excerpt || null,
      content: editing.content || "",
      cover_image: editing.cover_image || null,
      meta_title: editing.meta_title || null,
      meta_description: editing.meta_description || null,
      tags: editing.tags || [],
      published: editing.published ?? false,
      author_id: user?.id,
      updated_at: new Date().toISOString(),
    };

    if (editing.id) {
      await supabase.from("blog_posts").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }
    setEditing(null);
    setSaving(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  };

  const addTag = () => {
    if (!tagInput.trim() || !editing) return;
    setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] });
    setTagInput("");
  };

  const removeTag = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, tags: (editing.tags || []).filter((_, i) => i !== idx) });
  };

  if (editing) {
    return (
      <div className="p-6 space-y-4 max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">{editing.id ? "Edit Post" : "New Post"}</h1>
          <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Title</Label><Input value={editing.title ?? ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={editing.slug ?? ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
          </div>
          <div><Label>Excerpt</Label><Textarea rows={2} value={editing.excerpt ?? ""} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
          <div><Label>Content (HTML/Markdown)</Label><Textarea rows={12} value={editing.content ?? ""} onChange={e => setEditing({ ...editing, content: e.target.value })} className="font-mono text-xs" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Cover Image URL</Label><Input value={editing.cover_image ?? ""} onChange={e => setEditing({ ...editing, cover_image: e.target.value })} /></div>
            <div><Label>Meta Title</Label><Input value={editing.meta_title ?? ""} onChange={e => setEditing({ ...editing, meta_title: e.target.value })} /></div>
          </div>
          <div><Label>Meta Description</Label><Textarea rows={2} value={editing.meta_description ?? ""} onChange={e => setEditing({ ...editing, meta_description: e.target.value })} /></div>
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 flex-wrap mb-2">
              {(editing.tags || []).map((t, i) => (
                <Badge key={i} variant="secondary" className="gap-1">{t} <button onClick={() => removeTag(i)}><X className="h-3 w-3" /></button></Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add tag…" onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} />
              <Button variant="outline" size="sm" onClick={addTag}>Add</Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={editing.published ?? false} onCheckedChange={v => setEditing({ ...editing, published: v })} />
            <Label>Published</Label>
          </div>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Post"}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Blog Posts</h1>
        <Button onClick={() => setEditing({ ...emptyPost })} className="gap-2"><Plus className="h-4 w-4" /> New Post</Button>
      </div>
      <div className="space-y-2">
        {posts.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{p.title}</span>
                <Badge variant={p.published ? "default" : "secondary"}>{p.published ? "Published" : "Draft"}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">/{p.slug} · {new Date(p.updated_at).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">No blog posts yet</p>}
      </div>
    </div>
  );
};

export default AdminBlog;
