import { Link } from "react-router-dom";
import { useT } from "@/i18n/context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { taxGuides, complianceChecklists } from "@/data/taxCompliance";
import {
  ChevronRight,
  ArrowRight,
  Receipt,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  AlertTriangle,
  Info,
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";

const iconMap: Record<string, React.ElementType> = {
  Receipt,
  Building2,
};

const TaxComplianceHub = () => {
  const t = useT();
  return (
  <div className="min-h-screen bg-background">
    <SEOHead
      title={t.seo.taxes.title}
      description={t.seo.taxes.description}
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Taxes & Compliance", url: "/taxes" }])]}
    />
    <Header />
    <main className="page-offset">
      {/* Hero Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src="/images/section-taxes.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="relative container h-full flex items-end pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Taxes & Compliance</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          UAE Taxes & Compliance: what founders actually need to know
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          The UAE's tax landscape has changed significantly. VAT since 2018, Corporate Tax since 2023. Understanding your obligations — and planning for them from the start — prevents costly mistakes and surprises.
        </p>

        <BestAnswerBlock
          title="Taxes & compliance at a glance"
          content="UAE businesses face two primary taxes: VAT (5% on most supplies, mandatory registration above AED 375,000) and Corporate Tax (9% on profits above AED 375,000). Free zone businesses may qualify for 0% CT on qualifying income, but this requires genuine substance and compliance. Beyond taxes, annual compliance includes licence renewal, visa management, UBO declarations, and ESR reporting."
          audience="Founders setting up or already operating a business in the UAE."
          caution="Tax rules evolve. This guidance reflects the position as of February 2026. Always verify with the FTA or a qualified tax advisor."
        />
      </section>

      {/* Tax guides grid */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Tax guides</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {taxGuides.map((guide) => {
            const Icon = iconMap[guide.icon] || Receipt;
            return (
              <article
                key={guide.id}
                className="border border-border rounded-lg bg-card hover:border-accent/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground leading-snug">
                      {guide.shortName}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{guide.bestAnswer}</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.keyThresholds.slice(0, 3).map((t) => (
                      <span key={t.label} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">
                        {t.label}: <strong>{t.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link to={`/taxes/${guide.slug}`}>
                      Read guide <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Compliance checklists */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-accent" />
          Compliance checklists
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {complianceChecklists.map((checklist) => (
            <div key={checklist.id} className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="p-5 border-b border-border bg-secondary/30">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  {checklist.title}
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {checklist.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded border border-border bg-background flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{item.label}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <span className="text-xs text-muted-foreground">⏱ {item.when}</span>
                        {item.penalty && (
                          <span className="text-xs text-destructive">⚠ {item.penalty}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key numbers strip */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Key numbers at a glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "VAT rate", value: "5%" },
            { label: "CT rate", value: "9%" },
            { label: "VAT threshold", value: "AED 375K" },
            { label: "CT threshold", value: "AED 375K" },
            { label: "Free zone CT", value: "0% QFZP" },
            { label: "CT filing", value: "9 months" },
          ].map((item) => (
            <div key={item.label} className="border border-border rounded-lg p-4 bg-card text-center">
              <p className="text-2xl font-semibold text-accent">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            Need help with UAE tax planning?
          </h2>
          <p className="text-muted-foreground mb-5">
            Get a Setup Snapshot that includes tax structure recommendations tailored to your business model, zone choice, and growth plans.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container pb-16">
        <div className="border-t border-border pt-8">
          <div className="max-w-2xl space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground flex items-center gap-2">
              <Info className="h-4 w-4" /> How this section works
            </p>
            <p>
              Tax and compliance guides are compiled from official FTA and Ministry of Finance sources. Tax rules change — always verify current requirements with the FTA or a qualified tax advisor.
            </p>
            <p className="text-xs flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" />
              This content is educational and not tax, legal, or financial advice. Always get qualified professional advice for your specific situation.
            </p>
            <p className="text-xs">Last reviewed: February 2026</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);
};

export default TaxComplianceHub;
