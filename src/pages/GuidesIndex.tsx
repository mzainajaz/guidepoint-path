import { useState, useMemo } from "react";
import { useT } from "@/i18n/context";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { guideParts, guideChapters } from "@/data/setupGuides";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Plane, Receipt, MapPin, Rocket, Layers, Landmark,
  ArrowRight, ChevronRight, BookOpen, Search, X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const iconMap: Record<string, React.ElementType> = {
  Building2, Plane, Receipt, MapPin, Rocket, Layers, Landmark,
};

const GuidesIndex = () => {
  const [query, setQuery] = useState("");
  const [activePart, setActivePart] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return guideChapters.filter((ch) => {
      if (activePart && ch.partId !== activePart) return false;
      if (!q) return true;
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.summary.toLowerCase().includes(q) ||
        ch.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q) ||
            s.bullets?.some((b) => b.toLowerCase().includes(q))
        )
      );
    });
  }, [query, activePart]);

  const visibleParts = useMemo(() => {
    const partIds = new Set(filtered.map((c) => c.partId));
    return guideParts.filter((p) => partIds.has(p.id));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="UAE Business Setup Guides — The Complete Reference"
        description="50+ chapter reference covering UAE setup architecture, free zones, mainland, visas, tax, banking, and startup strategy. Built from official sources."
        schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }])]}
      />
      <Header />
      <main className="page-offset">
        {/* Hero Image */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src="/images/section-guides.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          <div className="relative container h-full flex items-end pb-6">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">Guides</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary/80 mb-3 block">
              <BookOpen className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              Complete Reference
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
              UAE Business Setup Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              A structured decision tool covering mainland, free zones, offshore, activities, pricing, visas, tax, banking, startup leverage, family structuring, and operating workflows — compiled from official UAE government and registrar sources.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search guides by keyword…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-9 bg-card border-border"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Part filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setActivePart(null)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  !activePart
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                All Parts
              </button>
              {guideParts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePart(activePart === p.id ? null : p.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activePart === p.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  {p.number}. {p.title}
                </button>
              ))}
            </div>

            {/* Result count */}
            {(query || activePart) && (
              <p className="text-sm text-muted-foreground mt-3">
                {filtered.length} {filtered.length === 1 ? "guide" : "guides"} found
                {query && <> matching "<span className="text-foreground font-medium">{query}</span>"</>}
              </p>
            )}
          </motion.div>
        </section>

        {/* Parts grid */}
        <section className="container pb-20 space-y-14">
          <AnimatePresence mode="wait">
            {visibleParts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground">No guides match your search. Try a different keyword or clear the filter.</p>
              </motion.div>
            ) : (
              visibleParts.map((part, pi) => {
                const Icon = iconMap[part.icon] || Building2;
                const chapters = filtered.filter((c) => c.partId === part.id);
                return (
                  <motion.div
                    key={part.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: pi * 0.05 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground">
                          Part {part.number}: {part.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">{part.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {chapters.map((ch) => (
                        <Link
                          key={ch.id}
                          to={`/guides/${ch.slug}`}
                          className="group border border-border rounded-xl bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all flex flex-col"
                        >
                          <Badge variant="secondary" className="text-[10px] w-fit mb-2">
                            Ch. {ch.chapterNumber}
                          </Badge>
                          <h3 className="font-display text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                            {ch.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                            {ch.summary}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3">
                            Read guide <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </section>

        {/* Disclaimer */}
        <section className="container pb-16">
          <div className="border-t border-border pt-8 max-w-2xl space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Evidence Model</p>
            <p>
              These guides rely on federal or emirate-level government sources first, then official registrar/free-zone sources, then official bank sources. Third-party consultants and reseller sites are intentionally excluded.
            </p>
            <p className="text-xs">
              This content is educational and not legal or tax advice. Always confirm the latest official requirements.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesIndex;
