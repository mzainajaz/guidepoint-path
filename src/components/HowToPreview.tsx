import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  slug: string;
  page_title: string;
  meta_description: string | null;
  article_number: string;
  word_count: number;
}

const HowToPreview = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    supabase
      .from("howto_articles")
      .select("id, slug, page_title, meta_description, article_number, word_count")
      .eq("published", true)
      .eq("language_code", "en")
      .order("article_number")
      .limit(6)
      .then(({ data }) => setArticles((data as Article[]) ?? []));
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-muted/20">
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
              <BookOpen className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              How-To Library
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Expert Setup Guides — 10 Languages
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              20 in-depth articles covering every step of UAE business setup, available in English, Arabic, Russian, and 7 more languages.
            </p>
          </div>
          <Link
            to="/how-to/uae-business-setup"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Browse all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/how-to/uae-business-setup/${a.slug}`}
                className="group block h-full bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px]">#{a.article_number}</Badge>
                  {a.word_count > 0 && (
                    <span className="text-[10px] text-muted-foreground">{Math.ceil(a.word_count / 200)} min</span>
                  )}
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                  {a.page_title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {a.meta_description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3">
                  Read article <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/how-to/uae-business-setup"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6"
        >
          Browse all articles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default HowToPreview;
