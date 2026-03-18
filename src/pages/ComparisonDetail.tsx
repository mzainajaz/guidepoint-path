import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { getComparisonById } from "@/data/comparisons";
import SEOHead, { breadcrumbSchema, faqSchema, articleSchema } from "@/components/SEOHead";
import { useT } from "@/i18n/context";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Info,
  Scale,
  Shield,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ComparisonDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const comp = slug ? getComparisonById(slug) : undefined;
  const t = useT();

  if (!comp) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Comparison Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find this comparison.</p>
          <Button asChild><Link to="/compare">Browse all comparisons</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.seoDetail.comparisonTitle(comp.title)}
        description={t.seoDetail.comparisonDesc(comp.summaryVerdict.slice(0, 155))}
        type="article"
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare", url: "/compare" },
            { name: comp.title, url: `/compare/${comp.id}` },
          ]),
          faqSchema(comp.faqs),
          articleSchema({
            title: comp.title,
            description: comp.summaryVerdict.slice(0, 155),
            url: `/compare/${comp.id}`,
            dateModified: comp.lastUpdated,
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
            <Link to="/compare" className="hover:text-foreground transition-colors">Compare</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{comp.title}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="container pt-8 pb-6">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-2">
            {comp.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{comp.subtitle}</p>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Last updated: {comp.lastUpdated}
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {comp.sources.length} sources verified
            </span>
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Not legal or tax advice
            </span>
          </div>

          {/* TLDR */}
          <div className="border border-accent/20 bg-accent/5 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">TL;DR</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{comp.summaryVerdict}</p>
          </div>

          <BestAnswerBlock
            title={`${comp.optionAName} or ${comp.optionBName}?`}
            content={comp.summaryVerdict}
            caution="Suitability depends on your activity, residency context, banking needs, and timing."
          />
        </section>

        {/* CTA cluster */}
        <section className="container pb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">Second Opinion Review</Button>
          </div>
        </section>

        {/* Summary verdicts */}
        <section className="container pb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-5 bg-card">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                This comparison is most useful when
              </h3>
              <ul className="space-y-2">
                {comp.suitableWhen.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-success mt-1">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border rounded-lg p-5 bg-card">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                Be cautious if
              </h3>
              <ul className="space-y-2">
                {comp.lessSuitableWhen.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-1">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Criteria table */}
        <section className="container pb-12">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Criteria comparison</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground min-w-[160px]">Criteria</th>
                    <th className="text-left px-4 py-3 font-medium text-accent whitespace-nowrap min-w-[200px]">{comp.optionAName}</th>
                    <th className="text-left px-4 py-3 font-medium text-foreground whitespace-nowrap min-w-[200px]">{comp.optionBName}</th>
                  </tr>
                </thead>
                <tbody>
                  {comp.criteria.map((row, i) => (
                    <tr key={row.label} className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.optionA}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.optionB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pros / Cons side-by-side */}
        <section className="container pb-12">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Pros & cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Option A */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">{comp.optionAName}</h3>
              <div className="border border-border rounded-lg p-5 bg-card space-y-4">
                <div>
                  <p className="text-xs font-medium text-success uppercase tracking-wider mb-2">Advantages</p>
                  <ul className="space-y-1.5">
                    {comp.prosA.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-destructive uppercase tracking-wider mb-2">Disadvantages</p>
                  <ul className="space-y-1.5">
                    {comp.consA.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-3.5 w-3.5 text-destructive/60 mt-0.5 shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Option B */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">{comp.optionBName}</h3>
              <div className="border border-border rounded-lg p-5 bg-card space-y-4">
                <div>
                  <p className="text-xs font-medium text-success uppercase tracking-wider mb-2">Advantages</p>
                  <ul className="space-y-1.5">
                    {comp.prosB.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-destructive uppercase tracking-wider mb-2">Disadvantages</p>
                  <ul className="space-y-1.5">
                    {comp.consB.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-3.5 w-3.5 text-destructive/60 mt-0.5 shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost drivers */}
        <section className="container pb-12">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Cost drivers</h2>
          <p className="text-muted-foreground leading-relaxed">{comp.costDrivers}</p>
        </section>

        {/* Banking realities */}
        <section className="container pb-12">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Banking & KYC realities</h2>
          <p className="text-muted-foreground leading-relaxed">{comp.bankingRealities}</p>
        </section>

        {/* Common mistakes */}
        <section className="container pb-12">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Common mistakes & assumptions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {comp.commonMistakes.map((mistake, i) => (
              <AccordionItem key={i} value={`mistake-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-caution shrink-0" />
                    {mistake.split("—")[0].split("–")[0].trim()}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  {mistake}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* FAQ */}
        <section className="container pb-12">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {comp.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Methodology disclosure */}
        <section className="container pb-12">
          <div className="border border-border rounded-lg bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-semibold text-foreground">Methodology & transparency</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{comp.methodology}</p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sources</p>
              <ul className="space-y-1">
                {comp.sources.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-3.5 w-3.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground pt-2 border-t border-border">
              <span><strong>Last updated:</strong> {comp.lastUpdated}</span>
              <span>Comparisons are editorial assessments, not legal advice</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container pb-16">
          <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-10 text-center max-w-2xl mx-auto">
            <Scale className="h-8 w-8 text-accent mx-auto mb-4" />
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Need help deciding?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get a personalised setup snapshot based on your activity, budget, and visa needs — or request a second opinion on advice you've already received.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">Second Opinion Review</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComparisonDetail;
