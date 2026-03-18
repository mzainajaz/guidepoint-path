import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { useLocale } from "@/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, BookOpen, ArrowRight, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: string;
  slug: string;
  page_title: string;
  meta_description: string | null;
  article_number: string;
  primary_keyword: string | null;
  word_count: number;
  language: string;
  language_code: string;
}

const TOPIC_MAP: Record<string, { label: string; articles: string[] }> = {
  structures: { label: "Structures & Jurisdictions", articles: ["01", "02", "03"] },
  freezones: { label: "Free Zones", articles: ["04", "05", "06"] },
  licensing: { label: "Licensing & Activities", articles: ["07", "08"] },
  costs: { label: "Costs & Setup", articles: ["09", "10"] },
  visas: { label: "Visas & Residency", articles: ["11", "12", "13"] },
  banking: { label: "Banking", articles: ["14"] },
  tax: { label: "Tax & Compliance", articles: ["15", "16", "17"] },
  business: { label: "Business Types & Strategy", articles: ["18", "19", "20"] },
};

const LANG_LABELS: Record<string, string> = {
  en: "English", ar: "العربية", ru: "Русский", zh: "中文",
  fr: "Français", de: "Deutsch", it: "Italiano", es: "Español",
  uk: "Українська", pt: "Português",
};

const HowToIndex = () => {
  const { locale } = useLocale();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<string>("en");

  // Map site locale to content language code
  useEffect(() => {
    const localeToLangCode: Record<string, string> = {
      en: "en", fr: "fr", de: "de", es: "es", ar: "ar", it: "it", ru: "ru", uk: "uk",
    };
    setActiveLang(localeToLangCode[locale] || "en");
  }, [locale]);

  useEffect(() => {
    supabase
      .from("howto_articles")
      .select("id, slug, page_title, meta_description, article_number, primary_keyword, word_count, language, language_code")
      .eq("language_code", activeLang)
      .eq("published", true)
      .order("article_number")
      .then(({ data }) => {
        setArticles((data as Article[]) ?? []);
        setLoading(false);
      });
  }, [activeLang]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return articles.filter((a) => {
      if (activeTopic) {
        const topicArticles = TOPIC_MAP[activeTopic]?.articles ?? [];
        if (!topicArticles.includes(a.article_number)) return false;
      }
      if (!q) return true;
      return (
        a.page_title.toLowerCase().includes(q) ||
        a.meta_description?.toLowerCase().includes(q) ||
        a.primary_keyword?.toLowerCase().includes(q)
      );
    });
  }, [articles, query, activeTopic]);

  const basePath = activeLang === "en" ? "/how-to/uae-business-setup" : `/${activeLang}/how-to/uae-business-setup`;

  const availableLanguages = useMemo(() => {
    // Show all supported languages as tabs
    return ["en", "ar", "ru", "zh", "fr", "de", "it", "es", "uk", "pt"];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.seo.howTo.title}
        description={t.seo.howTo.description}
        schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "How-To Library", url: "/how-to/uae-business-setup" }])]}
      />
      <Header />
      <main className="page-offset">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">How-To Library</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary/80 mb-3 block">
              <BookOpen className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              How-To Content Library
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
              UAE Business Setup — How-To Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              20 in-depth articles across 10 languages, grounded in 488 real consumer queries.
              Structures, free zones, licensing, visas, tax, banking — all answered.
            </p>

            {/* Language selector */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              <Globe className="h-4 w-4 text-muted-foreground mt-1 mr-1" />
              {availableLanguages.map((lc) => (
                <button
                  key={lc}
                  onClick={() => setActiveLang(lc)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeLang === lc
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  {LANG_LABELS[lc]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search articles by keyword…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-9 bg-card border-border"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Topic filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setActiveTopic(null)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  !activeTopic
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                All Topics
              </button>
              {Object.entries(TOPIC_MAP).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setActiveTopic(activeTopic === key ? null : key)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeTopic === key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {(query || activeTopic) && (
              <p className="text-sm text-muted-foreground mt-3">
                {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
                {query && <> matching "<span className="text-foreground font-medium">{query}</span>"</>}
              </p>
            )}
          </motion.div>
        </section>

        {/* Articles grid */}
        <section className="container pb-20">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                <p className="text-muted-foreground">
                  {articles.length === 0
                    ? "No articles available in this language yet. Try English for the full library."
                    : "No articles match your search. Try a different keyword or clear the filter."}
                </p>
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <Link
                      to={`${basePath}/${a.slug}`}
                      className="group border border-border rounded-xl bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all flex flex-col h-full"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]">
                          #{a.article_number}
                        </Badge>
                        {a.word_count > 0 && (
                          <span className="text-[10px] text-muted-foreground">{Math.ceil(a.word_count / 200)} min read</span>
                        )}
                      </div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                        {a.page_title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {a.meta_description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3">
                        Read article <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Disclaimer */}
        <section className="container pb-16">
          <div className="border-t border-border pt-8 max-w-2xl space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Research Foundation</p>
            <p>
              All content is grounded in 488 real, sourced consumer queries mined from Reddit, expat forums, Arabic portals, Russian communities, and Google Autocomplete across 10 languages.
            </p>
            <p className="text-xs">
              This content is educational and not legal or tax advice. No brand or consultancy is named. Always confirm the latest official requirements.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowToIndex;
