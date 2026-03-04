import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { guideParts, guideChapters } from "@/data/setupGuides";
import { motion } from "framer-motion";
import {
  Building2, Plane, Receipt, MapPin, Rocket, Layers, Landmark,
  ArrowRight, ChevronRight, BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  Building2, Plane, Receipt, MapPin, Rocket, Layers, Landmark,
};

const GuidesIndex = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="UAE Business Setup Guides — The Complete Reference"
      description="39-chapter reference covering UAE setup architecture, free zones, mainland, visas, tax, banking, and startup strategy. Built from official sources."
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }])]}
    />
    <Header />
    <main className="page-offset">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Guides</span>
        </nav>
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
          <p className="text-lg text-muted-foreground max-w-3xl">
            A structured decision tool covering mainland, free zones, offshore, activities, pricing, visas, tax, banking, startup leverage, family structuring, and operating workflows — compiled from official UAE government and registrar sources.
          </p>
        </motion.div>
      </section>

      {/* Parts grid */}
      <section className="container pb-20 space-y-14">
        {guideParts.map((part, pi) => {
          const Icon = iconMap[part.icon] || Building2;
          const chapters = guideChapters.filter(c => c.partId === part.id);
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
                {chapters.map(ch => (
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
        })}
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

export default GuidesIndex;
