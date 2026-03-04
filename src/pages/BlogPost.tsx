import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { articleSchema } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => setPost(data as Post | null));
  }, [slug]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="page-offset min-h-screen pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Post not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        canonical={`https://incorporateuae.com/blog/${post.slug}`}
        type="article"
        schema={articleSchema({
          title: post.meta_title || post.title,
          description: post.meta_description || post.excerpt || "",
          url: `/blog/${post.slug}`,
          dateModified: post.created_at,
        })}
      />
      <Header />
      <main className="page-offset min-h-screen pb-16">
        <article className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="w-full rounded-xl mb-6 object-cover max-h-80" />
          )}
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">{post.title}</h1>
          <div className="flex items-center gap-2 mb-8">
            {post.tags?.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
            <span className="text-sm text-muted-foreground ml-auto">{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <div className="prose prose-slate max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
