import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  created_at: string;
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, "");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

const BlogIndex = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, content, cover_image, tags, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts((data as Post[]) ?? []));
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <SEOHead
        title="Blog – UAE Business Setup Insights & Guides"
        description="Expert insights, practical guides, and updates on UAE business setup, free zones, corporate tax, licensing, and relocation for entrepreneurs."
        schema={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      <Header />
      <main className="page-offset min-h-screen pb-20">
        {/* Hero header */}
        <div className="relative border-b border-border/10">
          <img src="/images/section-blog.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 pb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="section-label mb-3 block">Insights & Guides</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                The Blog
              </h1>
              <p className="body-text max-w-lg">
                Practical guides, expert analysis, and real-world insights on UAE business setup, taxation, and growth.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-12">
          {/* Featured post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <Link
                to={`/blog/${featured.slug}`}
                className="group block glass-card-hover overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {featured.cover_image && (
                    <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className={`p-8 md:p-10 flex flex-col justify-center ${!featured.cover_image ? "md:col-span-2" : ""}`}>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {featured.tags?.slice(0, 3).map((t) => (
                        <span key={t} className="badge-pill">{t}</span>
                      ))}
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="body-text line-clamp-3 mb-5">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {new Date(featured.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {estimateReadTime(featured.content)} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid of remaining posts */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group block h-full glass-card-hover overflow-hidden"
                  >
                    {p.cover_image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={p.cover_image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.tags?.slice(0, 2).map((t) => (
                          <span key={t} className="badge-pill text-[10px]">{t}</span>
                        ))}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{p.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {new Date(p.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {estimateReadTime(p.content)} min
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-center text-muted-foreground py-20 text-lg">
              No posts yet. Check back soon!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndex;
