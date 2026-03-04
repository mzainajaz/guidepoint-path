import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  created_at: string;
}

const BlogPreview = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, tags, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts((data as Post[]) ?? []));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary/80 mb-2 block">
              Insights & Guides
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              From the Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${p.slug}`}
                className="block h-full bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags?.slice(0, 2).map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px] font-medium">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {p.excerpt}
                  </p>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/blog"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6"
        >
          View all posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default BlogPreview;
