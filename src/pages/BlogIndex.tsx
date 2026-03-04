import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[];
  created_at: string;
}

const BlogIndex = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image, tags, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts((data as Post[]) ?? []));
  }, []);

  return (
    <>
      <Header />
      <main className="page-offset min-h-screen pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground mb-8">Insights, guides, and updates on UAE business setup.</p>
          <div className="space-y-6">
            {posts.map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="block bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <h2 className="font-display text-xl font-bold text-foreground mb-1">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>}
                <div className="flex items-center gap-2">
                  {p.tags?.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  <span className="text-xs text-muted-foreground ml-auto">{new Date(p.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
            {posts.length === 0 && <p className="text-center text-muted-foreground py-12">No posts yet. Check back soon!</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndex;
