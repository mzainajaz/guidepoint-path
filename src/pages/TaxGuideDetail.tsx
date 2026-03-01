import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { getTaxGuideById, taxGuides, type TaxGuide } from "@/data/taxCompliance";
import SEOHead, { breadcrumbSchema, faqSchema, articleSchema } from "@/components/SEOHead";
import {
  ChevronRight,
  ArrowRight,
  Receipt,
  Building2,
  AlertTriangle,
  Info,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ElementType> = {
  Receipt,
  Building2,
};

const TaxGuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getTaxGuideById(slug) : undefined;
  const [activeSection, setActiveSection] = useState("thresholds");

  const tocSections = guide
    ? [
        { id: "thresholds", label: "Key numbers" },
        ...guide.sections.map((s) => ({ id: s.id, label: s.title.length > 35 ? s.title.slice(0, 35) + "…" : s.title })),
        { id: "mistakes", label: "Common mistakes" },
        { id: "faq", label: "FAQ" },
        { id: "sources", label: "Sources" },
      ]
    : [];

  useEffect(() => {
    if (!guide) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [guide]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find this tax guide.</p>
          <Button asChild><Link to="/taxes">Browse Taxes & Compliance</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[guide.icon] || Receipt;
  const relatedGuides = guide.relatedGuides
    .map((id) => taxGuides.find((g) => g.id === id))
    .filter(Boolean) as TaxGuide[];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={guide.meta.title}
        description={guide.meta.description}
        type="article"
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Taxes & Compliance", url: "/taxes" },
            { name: guide.shortName, url: `/taxes/${guide.slug}` },
          ]),
          faqSchema(guide.faqs),
          articleSchema({
            title: guide.meta.title,
            description: guide.meta.description,
            url: `/taxes/${guide.slug}`,
            dateModified: guide.lastChecked,
          }),
        ]}
      />
      <Header />
      <main>
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/taxes" className="hover:text-foreground transition-colors">Taxes & Compliance</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{guide.shortName}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="container pt-8 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-accent" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              {guide.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-3 mb-8">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Last checked: {guide.lastChecked}
            </span>
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Tax rules change; always verify with the FTA
            </span>
            <span className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              {guide.sourceUrls.length} official sources cited
            </span>
          </div>

          <BestAnswerBlock
            title={`${guide.shortName}: the short version`}
            content={guide.bestAnswer}
            audience={guide.audience}
            caution="This is educational guidance, not tax advice. Consult a qualified tax advisor for your specific situation."
          />
        </section>

        {/* CTAs */}
        <section className="container pb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">Speak to a Tax Advisor</Button>
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
              {/* Key thresholds */}
              <section id="thresholds">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Key numbers</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {guide.keyThresholds.map((t) => (
                    <div key={t.label} className="border border-border rounded-lg p-4 bg-card">
                      <p className="text-2xl font-semibold text-accent">{t.value}</p>
                      <p className="text-sm font-medium text-foreground mt-1">{t.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dynamic sections */}
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                  {section.bullets && (
                    <ul className="space-y-2">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Common mistakes */}
              <section id="mistakes">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Common mistakes to avoid</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {guide.commonMistakes.map((mistake, i) => (
                    <AccordionItem key={i} value={`mistake-${i}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                        {mistake.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-3">
                        {mistake.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* FAQ */}
              <section id="faq">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {guide.faqs.map((faq, i) => (
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

              {/* Sources */}
              <section id="sources">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Sources & methodology</h2>
                <div className="border border-border rounded-lg bg-card p-5 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This guide is compiled from official UAE government sources and verified periodically. All citations reference the source documents below.
                  </p>
                  <ul className="space-y-2">
                    {guide.sourceUrls.map((src) => (
                      <li key={src.ref} className="flex items-start gap-2 text-sm">
                        <span className="font-mono text-xs text-accent font-semibold mt-0.5 shrink-0">[{src.ref}]</span>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-accent transition-colors underline underline-offset-2"
                        >
                          {src.label}
                          <ExternalLink className="inline h-3 w-3 ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    <strong>Last checked:</strong> {guide.lastChecked} · <strong>Methodology:</strong> Content is cross-referenced against official FTA and MoF publications. We do not provide tax advice.
                  </p>
                </div>
              </section>

              {/* Related guides */}
              {relatedGuides.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Related guides</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {relatedGuides.map((rel) => {
                      const RelIcon = iconMap[rel.icon] || Receipt;
                      return (
                        <Link
                          key={rel.id}
                          to={`/taxes/${rel.slug}`}
                          className="border border-border rounded-lg p-4 bg-card hover:border-accent/40 transition-all flex items-center gap-3"
                        >
                          <RelIcon className="h-5 w-5 text-accent shrink-0" />
                          <div>
                            <p className="font-medium text-foreground text-sm">{rel.shortName}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{rel.meta.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Disclaimer */}
              <section className="border-t border-border pt-8">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Disclaimer
                  </p>
                  <p>
                    This page is educational and not tax, legal, or financial advice. Tax rules change — always verify current requirements with the FTA or a qualified tax advisor for your specific situation.
                  </p>
                  <p><strong>Last checked:</strong> {guide.lastChecked} · <strong>Sources:</strong> {guide.sourceUrls.length} official references cited</p>
                </div>
              </section>

              {/* Final CTA */}
              <section className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Need tax planning support?
                </h2>
                <p className="text-muted-foreground mb-5">
                  Get a Setup Snapshot that includes tax structure recommendations matched to your business model, free zone choice, and growth plans.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">Speak to a Tax Advisor</Button>
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

export default TaxGuideDetail;
