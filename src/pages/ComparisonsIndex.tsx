import { Link } from "react-router-dom";
import { useT } from "@/i18n/context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { comparisons } from "@/data/comparisons";
import {
  ChevronRight,
  ArrowRight,
  Scale,
  Search,
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";

const typeLabels: Record<string, string> = {
  "free-zone-vs-free-zone": "Free Zone vs Free Zone",
  "mainland-vs-free-zone": "Mainland vs Free Zone",
  entity: "Entity / Structure",
  market: "Market / Use-case",
};

const ComparisonsIndex = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Compare UAE Setup Options — Free Zones, Mainland & Structures"
      description="Side-by-side comparisons of UAE free zones, mainland options, and entity structures. Transparent criteria, honest trade-offs, and clear methodology."
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Compare", url: "/compare" }])]}
    />
    <Header />
    <main className="page-offset">
      {/* Hero Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src="/images/section-comparisons.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="relative container h-full flex items-end pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Compare</span>
          </nav>
        </div>
      </div>

      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Compare UAE Setup Options
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Side-by-side comparisons with transparent criteria, honest trade-offs, and clear methodology. Make informed decisions, not guesses.
        </p>
        <BestAnswerBlock
          title="How to use these comparisons"
          content="Each comparison uses a consistent set of criteria — cost, visas, office, banking, timeline, and suitability. Start with the summary verdict, check the criteria table, then review pros/cons for your specific situation."
          audience="Founders comparing setup routes, free zones, or entity structures."
          caution="Suitability depends on your specific activity, residency context, banking needs, and timing. These are editorial assessments, not legal advice."
        />
      </section>

      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisons.map((comp) => (
            <article key={comp.id} className="border border-border rounded-lg bg-card hover:border-accent/40 hover:shadow-md transition-all flex flex-col">
              <div className="p-6 flex-1 space-y-3">
                <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                  {typeLabels[comp.type]}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">{comp.title}</h3>
                <p className="text-sm text-muted-foreground">{comp.subtitle}</p>
                <p className="text-sm text-muted-foreground italic">"{comp.summaryVerdict.split(".")[0]}."</p>
              </div>
              <div className="border-t border-border p-4">
                <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to={`/compare/${comp.id}`}>
                    View comparison <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ComparisonsIndex;
