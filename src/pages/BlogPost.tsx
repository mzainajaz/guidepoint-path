import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { articleSchema } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setPost(data as Post | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="page-offset min-h-screen pb-16 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted-foreground/30 border-t-accent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="page-offset min-h-screen pb-16 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-lg">Post not found.</p>
          <Link to="/blog" className="btn-secondary text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const readTime = estimateReadTime(post.content);
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
      <main className="page-offset min-h-screen pb-20">
        {/* Hero area */}
        <div className="relative border-b border-border/10">
          <div className="absolute inset-0 dot-pattern opacity-40" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-8 pb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags?.map((t) => (
                  <span key={t} className="badge-pill">{t}</span>
                ))}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] mb-6">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readTime} min read
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cover image */}
        {post.cover_image && (
          <div className="max-w-4xl mx-auto px-5 sm:px-8 -mt-0 mb-10">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full rounded-xl object-cover max-h-[420px]"
            />
          </div>
        )}

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto px-5 sm:px-8"
        >
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* Bottom nav */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 mt-16 pt-8 border-t border-border/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            All articles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
