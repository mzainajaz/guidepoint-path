import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import FinalCTA from "@/components/FinalCTA";
import { useLocale } from "@/i18n/context";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, ArrowRight, Clock, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: string;
  slug: string;
  page_title: string;
  meta_description: string | null;
  primary_keyword: string | null;
  word_count: number;
  content_html: string;
  language: string;
  language_code: string;
  text_direction: string;
  article_number: string;
}

interface NavArticle {
  slug: string;
  page_title: string;
  article_number: string;
}

const LANG_LABELS: Record<string, string> = {
  en: "English", ar: "العربية", ru: "Русский", zh: "中文",
  fr: "Français", de: "Deutsch", it: "Italiano", es: "Español",
  uk: "Українська", pt: "Português",
};

const HowToArticle = () => {
  const { slug, lang } = useParams<{ slug: string; lang?: string }>();
  const { locale } = useLocale();
  const langCode = lang || (locale === "en" ? "en" : locale);

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevArt, setPrev] = useState<NavArticle | null>(null);
  const [nextArt, setNext] = useState<NavArticle | null>(null);
  const [altLangs, setAltLangs] = useState<{ language_code: string; slug: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    supabase
      .from("howto_articles")
      .select("*")
      .eq("slug", slug)
      .eq("language_code", langCode)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setArticle(data as Article | null);
        setLoading(false);

        if (data) {
          // Fetch prev/next
          supabase
            .from("howto_articles")
            .select("slug, page_title, article_number")
            .eq("language_code", langCode)
            .eq("published", true)
            .order("article_number")
            .then(({ data: all }) => {
              if (!all) return;
              const idx = all.findIndex((a: any) => a.slug === slug);
              setPrev(idx > 0 ? (all[idx - 1] as NavArticle) : null);
              setNext(idx < all.length - 1 ? (all[idx + 1] as NavArticle) : null);
            });

          // Fetch alternate language versions
          supabase
            .from("howto_articles")
            .select("language_code, slug")
            .eq("article_number", (data as Article).article_number)
            .eq("published", true)
            .then(({ data: alts }) => {
              setAltLangs((alts as { language_code: string; slug: string }[]) ?? []);
            });
        }
      });
  }, [slug, langCode]);

  const basePath = langCode === "en" ? "/how-to/uae-business-setup" : `/${langCode}/how-to/uae-business-setup`;
  const indexPath = langCode === "en" ? "/how-to/uae-business-setup" : `/${langCode}/how-to/uae-business-setup`;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="page-offset container py-20">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="page-offset container py-20 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">This article doesn't exist or hasn't been published yet.</p>
          <Link to={indexPath} className="text-primary hover:underline">← Back to How-To Library</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Build hreflang links for SEO
  const hreflangLinks = altLangs.map((alt) => {
    const href = alt.language_code === "en"
      ? `/how-to/uae-business-setup/${alt.slug}`
      : `/${alt.language_code}/how-to/uae-business-setup/${alt.slug}`;
    return { lang: alt.language_code, href };
  });

  return (
    <div className="min-h-screen bg-background" dir={article.text_direction}>
      <SEOHead
        title={article.page_title}
        description={article.meta_description || ""}
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "How-To Library", url: indexPath },
            { name: article.page_title, url: `${basePath}/${article.slug}` },
          ]),
        ]}
      />
      {/* Inject hreflang tags */}
      {hreflangLinks.length > 1 && (
        <head>
          {hreflangLinks.map((hl) => (
            <link key={hl.lang} rel="alternate" hrefLang={hl.lang} href={hl.href} />
          ))}
        </head>
      )}

      <Header />
      <main className="page-offset">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={indexPath} className="hover:text-foreground transition-colors">How-To Library</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium line-clamp-1">{article.page_title}</span>
          </nav>
        </div>

        {/* Article header */}
        <section className="container py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="secondary" className="text-[10px]">
                Article #{article.article_number}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {LANG_LABELS[article.language_code] || article.language}
              </Badge>
              {article.word_count > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {Math.ceil(article.word_count / 200)} min read
                </span>
              )}
            </div>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight">
              {article.page_title}
            </h1>
            {article.meta_description && (
              <p className="text-lg text-muted-foreground">{article.meta_description}</p>
            )}

            {/* Language switcher for this article */}
            {altLangs.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-5">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mr-1">Also in:</span>
                {altLangs
                  .filter((al) => al.language_code !== article.language_code)
                  .map((al) => {
                    const path = al.language_code === "en"
                      ? `/how-to/uae-business-setup/${al.slug}`
                      : `/${al.language_code}/how-to/uae-business-setup/${al.slug}`;
                    return (
                      <Link
                        key={al.language_code}
                        to={path}
                        className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                      >
                        {LANG_LABELS[al.language_code] || al.language_code}
                      </Link>
                    );
                  })}
              </div>
            )}
          </motion.div>
        </section>

        {/* Article content */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-3xl prose prose-invert prose-headings:font-display prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-[#c0c0c0] prose-p:leading-relaxed prose-table:text-sm prose-th:text-left prose-th:bg-muted/30 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-border prose-li:text-[#c0c0c0] prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />
        </section>

        {/* Prev/Next navigation */}
        <section className="container pb-12">
          <div className="max-w-3xl flex flex-col sm:flex-row gap-4 border-t border-border pt-8">
            {prevArt ? (
              <Link
                to={`${basePath}/${prevArt.slug}`}
                className="flex-1 group border border-border rounded-lg p-4 hover:border-primary/30 transition-all"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <p className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-1">
                  {prevArt.page_title}
                </p>
              </Link>
            ) : <div className="flex-1" />}
            {nextArt ? (
              <Link
                to={`${basePath}/${nextArt.slug}`}
                className="flex-1 group border border-border rounded-lg p-4 hover:border-primary/30 transition-all text-right"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-1">
                  {nextArt.page_title}
                </p>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HowToArticle;
