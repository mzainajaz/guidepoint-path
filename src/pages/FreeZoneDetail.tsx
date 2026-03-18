import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { getFreeZoneById, freeZones, type FreeZoneData } from "@/data/freeZones";
import { getZoneActivities } from "@/data/zoneActivities";
import ZoneActivityListComponent from "@/components/ZoneActivityList";
import SEOHead, { breadcrumbSchema, faqSchema, articleSchema } from "@/components/SEOHead";
import { useT } from "@/i18n/context";
import {
  ChevronRight,
  ArrowRight,
  CreditCard,
  Users,
  Building2,
  Clock,
  Landmark,
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Info,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── Sticky TOC ── */
const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "who-it-suits", label: "Who it suits" },
  { id: "activities", label: "Activities" },
  { id: "pricing", label: "Pricing & Packages" },
  { id: "visas", label: "Visas" },
  { id: "office", label: "Office" },
  { id: "banking", label: "Banking & KYC" },
  { id: "process", label: "Process" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "FAQ" },
];

const FreeZoneDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const zone = slug ? getFreeZoneById(slug) : undefined;
  const t = useT();
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [zone]);

  if (!zone) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Free Zone Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find details for this free zone.</p>
          <Button asChild>
            <Link to="/free-zones">Browse all Free Zones</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const comparables = zone.compareWith
    .map((id) => freeZones.find((fz) => fz.id === id))
    .filter(Boolean) as FreeZoneData[];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.seoDetail.freeZoneTitle(zone.name)}
        description={t.seoDetail.freeZoneDesc(zone.name)}
        type="article"
        schema={[
          breadcrumbSchema([
            { name: t.seoDetail.breadcrumbHome, url: "/" },
            { name: t.seoDetail.breadcrumbFreeZones, url: "/free-zones" },
            { name: zone.shortName, url: `/free-zones/${zone.id}` },
          ]),
          faqSchema(zone.faqs),
          articleSchema({
            title: zone.name,
            description: zone.bestAnswer.slice(0, 155),
            url: `/free-zones/${zone.id}`,
            dateModified: zone.lastChecked,
          }),
        ]}
      />
      <Header />
      <main className="page-offset">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/free-zones" className="hover:text-foreground transition-colors">Free Zones</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{zone.shortName}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="container pt-8 pb-6">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-2">
            {zone.name}
          </h1>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-3 mb-8">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Last checked: {zone.lastChecked}
            </span>
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Pricing can change; confirm with the authority
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {zone.sources.length} source{zone.sources.length > 1 ? "s" : ""} verified
            </span>
          </div>

          {/* TLDR */}
          <div className="border border-accent/20 bg-accent/5 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">TL;DR</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{zone.bestAnswer}</p>
          </div>

          <BestAnswerBlock
            title={`Should you choose ${zone.shortName}?`}
            content={zone.bestAnswer}
            audience={zone.idealFor}
            caution="Always verify current pricing, activity suitability, and banking realities before committing."
          />
        </section>

        {/* CTA cluster */}
        <section className="container pb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Request a Verified Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Get Setup Snapshot
            </Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground">
              Speak to an Agent
            </Button>
          </div>
        </section>

        {/* Quick facts strip */}
        <section className="container pb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Target, label: "Best for", value: zone.idealFor.split(",")[0] },
              { icon: CreditCard, label: "Starting from", value: zone.startingCost },
              { icon: Users, label: "Visas", value: zone.visaSummary },
              { icon: Building2, label: "Office", value: zone.officeSummary.split("(")[0].trim() },
              { icon: Clock, label: "Timeline", value: zone.timeline },
              { icon: Landmark, label: "Banking", value: zone.bankingFriendly ? "Smoother KYC" : "Plan extra KYC" },
            ].map((fact) => (
              <div key={fact.label} className="border border-border rounded-lg p-4 bg-card">
                <fact.icon className="h-4 w-4 text-accent mb-2" />
                <p className="text-xs text-muted-foreground mb-0.5">{fact.label}</p>
                <p className="text-sm font-medium text-foreground leading-snug">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main content with sticky TOC */}
        <div className="container pb-20">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <nav className="sticky top-20 space-y-0.5">
                {tocSections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                      activeSection === s.id
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-12">
              {/* Overview */}
              <section id="overview">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{zone.overview}</p>
              </section>

              {/* Who it suits / doesn't */}
              <section id="who-it-suits">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Who it suits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-border rounded-lg p-5 bg-card">
                    <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      This may apply when
                    </h3>
                    <ul className="space-y-2">
                      {zone.whoItSuits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-success mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-border rounded-lg p-5 bg-card">
                    <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      May not be the best fit when
                    </h3>
                    <ul className="space-y-2">
                      {zone.whenItMayNotFit.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-destructive mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Activities */}
              <section id="activities">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Business activities</h2>
                {(() => {
                  const zoneActivities = slug ? getZoneActivities(slug) : undefined;
                  if (zoneActivities) {
                    return <ZoneActivityListComponent data={zoneActivities} />;
                  }
                  return (
                    <>
                      <div className="flex flex-wrap gap-2">
                        {zone.activities.map((a) => (
                          <span key={a} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-md">
                            {a}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Activity availability may vary. Confirm with the authority for your specific activity.
                      </p>
                    </>
                  );
                })()}
              </section>

              {/* Pricing */}
              <section id="pricing">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Pricing & Packages</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {zone.packages.map((pkg) => (
                    <div key={pkg.name} className="border border-border rounded-lg bg-card overflow-hidden">
                      <div className="p-5 border-b border-border bg-secondary/30">
                        <h3 className="font-display text-lg font-semibold text-foreground">{pkg.name}</h3>
                        <p className="text-2xl font-semibold text-accent mt-1">{pkg.price}</p>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Includes</p>
                          <ul className="space-y-1.5">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Not included</p>
                          <ul className="space-y-1.5">
                            {pkg.excludes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <XCircle className="h-3.5 w-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <p>Pricing is indicative. Last checked: {zone.lastChecked}. Always confirm current fees and inclusions directly.</p>
                </div>
                <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                  Request a Verified Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </section>

              {/* Visa details */}
              <section id="visas">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Visa & office considerations</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4 text-accent" /> Visas
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{zone.visaDetails}</p>
                  </div>
                  <div className="space-y-2" id="office">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-accent" /> Office
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{zone.officeDetails}</p>
                  </div>
                </div>
              </section>

              {/* Banking */}
              <section id="banking">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Banking & KYC realities</h2>
                <p className="text-muted-foreground leading-relaxed">{zone.bankingDetails}</p>
              </section>

              {/* Process */}
              <section id="process">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Setup process</h2>
                <ol className="space-y-3">
                  {zone.processSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent/10 text-accent text-xs font-semibold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6">
                  <h3 className="font-medium text-foreground mb-3">Common requirements</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {zone.commonRequirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Common mistakes */}
              <section id="mistakes">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Common mistakes to avoid</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {zone.commonMistakes.map((mistake, i) => (
                    <AccordionItem key={i} value={`mistake-${i}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                        {mistake.split("—")[0].split("–")[0].trim()}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-3">
                        {mistake}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Comparison block */}
              <section id="compare">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Compare {zone.shortName} with alternatives
                </h2>
                {comparables.length > 0 ? (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-secondary/50">
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Criteria</th>
                            <th className="text-left px-4 py-3 font-medium text-accent whitespace-nowrap">{zone.shortName}</th>
                            {comparables.map((c) => (
                              <th key={c.id} className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                                {c.shortName}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: "Starting cost", fn: (fz: FreeZoneData) => fz.startingCost },
                            { label: "Ideal for", fn: (fz: FreeZoneData) => fz.idealFor },
                            { label: "Visas", fn: (fz: FreeZoneData) => fz.visaSummary },
                            { label: "Office", fn: (fz: FreeZoneData) => fz.officeSummary },
                            { label: "Timeline", fn: (fz: FreeZoneData) => fz.timeline },
                            { label: "Banking", fn: (fz: FreeZoneData) => fz.bankingNote },
                            { label: "Remote-first", fn: (fz: FreeZoneData) => fz.remoteFirst ? "Yes" : "No" },
                          ].map((row, i) => (
                            <tr key={row.label} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                              <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{row.label}</td>
                              <td className="px-4 py-3 text-foreground">{row.fn(zone)}</td>
                              {comparables.map((c) => (
                                <td key={c.id} className="px-4 py-3 text-muted-foreground">{row.fn(c)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 border-t border-border text-xs text-muted-foreground">
                      Comparisons based on visible criteria and editorial methodology. Suitability depends on your activity, residency context, and timing.
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No direct comparisons available for this free zone.</p>
                )}
              </section>

              {/* FAQ */}
              <section id="faq">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {[
                    ...zone.faqs,
                    {
                      q: `How much does it cost to set up in ${zone.shortName}?`,
                      a: `Indicative starting cost is ${zone.startingCost}. ${zone.pricingNote}`,
                    },
                    {
                      q: `How long does ${zone.shortName} setup take?`,
                      a: `Licence issuance typically takes ${zone.timeline}. Visa processing adds 5–14 additional days. Banking can take 2–6 weeks depending on the bank and your documentation.`,
                    },
                    {
                      q: `Can I open a bank account with a ${zone.shortName} licence?`,
                      a: zone.bankingDetails,
                    },
                    {
                      q: `Do I need a physical office with ${zone.shortName}?`,
                      a: zone.officeDetails,
                    },
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Source footer */}
              <section className="border-t border-border pt-8">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Sources & methodology</p>
                  <ul className="space-y-1">
                    {zone.sourceUrls.length > 0
                      ? zone.sourceUrls.map((s, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FileText className="h-3.5 w-3.5 shrink-0" />
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                              {s.label}
                            </a>
                            <span className="text-xs text-muted-foreground/60">[{s.ref}]</span>
                          </li>
                        ))
                      : zone.sources.map((s, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FileText className="h-3.5 w-3.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                  </ul>
                  <p><strong>Last checked:</strong> {zone.lastChecked}</p>
                  <p className="text-xs">
                    This page is educational and not legal or tax advice. Fees, requirements, and authority policies can change. Always confirm the latest official requirements and get qualified advice for your specific situation.
                  </p>
                </div>
              </section>

              {/* Final CTA */}
              <section className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Ready to explore {zone.shortName}?
                </h2>
                <p className="text-muted-foreground mb-5">
                  Get a verified quote, personalised setup snapshot, or speak to an advisor who understands this free zone.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Request a Verified Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Get Setup Snapshot
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeZoneDetail;
