import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const licenceTypes = [
  {
    name: "Commercial Licence",
    suits: "Trading, import/export, general commerce, retail, distribution",
    authority: "DED / DET (emirate-specific)",
    note: "Most common for trading businesses. May require additional activity-specific approvals.",
  },
  {
    name: "Professional Licence",
    suits: "Consultancy, services, freelancing, advisory, technology services",
    authority: "DED / DET (emirate-specific)",
    note: "Typically simpler. Often does not require a physical office beyond flexi-desk in some emirates.",
  },
  {
    name: "Industrial Licence",
    suits: "Manufacturing, production, assembly, processing",
    authority: "DED + Ministry of Industry",
    note: "Requires factory or warehouse premises. Additional environmental and safety approvals may apply.",
  },
  {
    name: "Tourism Licence",
    suits: "Travel agencies, tour operators, hospitality services",
    authority: "DED + DTCM / tourism authority",
    note: "Specific to tourism-related activities. Additional security deposits may be required.",
  },
];

const costLayers = [
  { label: "Trade name reservation", range: "AED 600–1,000", icon: FileText },
  { label: "Initial approval fee", range: "AED 120–200", icon: Clock },
  { label: "Licence issuance (annual)", range: "AED 10,000–50,000+", icon: DollarSign },
  { label: "Activity-specific approvals", range: "Varies by activity", icon: FileText },
  { label: "Chamber of Commerce registration", range: "AED 1,200–3,000", icon: FileText },
  { label: "Memorandum of Association (MOA)", range: "AED 2,000–5,000", icon: FileText },
];

const mistakes = [
  {
    title: "Choosing a licence type before confirming the activity",
    content:
      "The activity determines the licence type, not the other way around. Starting with 'I want a commercial licence' before confirming what you actually plan to do can lead to mismatches, rejected applications, or costly amendments later.",
  },
  {
    title: "Underestimating the number of activities needed",
    content:
      "Each additional activity on a mainland licence may incur extra fees and, in some cases, additional approvals. Plan your activity list carefully — adding activities after issuance is possible but adds cost and time.",
  },
  {
    title: "Assuming all emirates have the same process",
    content:
      "While the general framework is similar, each emirate's Department of Economic Development (DED/DET) has its own fee structure, processing times, and specific requirements. Dubai DED processes differ from Sharjah or Abu Dhabi.",
  },
  {
    title: "Ignoring the renewal timeline",
    content:
      "Mainland licences must be renewed annually. Late renewal attracts penalties (typically AED 200–500 per month). Budget and calendar the renewal date from day one.",
  },
  {
    title: "Not checking if pre-approval is needed",
    content:
      "Certain activities (legal, medical, educational, financial, food-related) require pre-approval from a relevant federal or local authority before the licence can be issued. Missing this step can delay setup by weeks.",
  },
];

const faqs = [
  {
    q: "How long does mainland licensing take?",
    a: "Typically 5–15 working days for straightforward cases. Activities requiring third-party approvals (medical, legal, financial, educational) can take 3–8 weeks depending on the authority.",
  },
  {
    q: "Can I add activities to my licence later?",
    a: "Yes, but each additional activity may require a fee (AED 1,000–3,000 per activity) and potentially a new approval if the activity falls under a regulated category.",
  },
  {
    q: "Do I need a local partner for a mainland company?",
    a: "Since the 2020 Commercial Companies Law amendment, most activities allow 100% foreign ownership on mainland. However, a few specific activities (e.g., certain oil & gas, security services) may still require a local service agent or partner.",
  },
  {
    q: "What is the difference between DED and DET?",
    a: "DED (Department of Economic Development) is used in Dubai and some other emirates. DET (Department of Economy and Tourism) is the rebranded version in Dubai since 2021. Other emirates use their own economic departments with similar functions.",
  },
];

const MainlandLicensing = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="page-offset">
      {/* Hero Image */}
      <div className="relative h-40 md:h-56 overflow-hidden">
        <img src="/images/section-mainland.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="relative container h-full flex items-end pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/mainland" className="hover:text-foreground transition-colors">Mainland</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Licensing Basics</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Mainland licensing basics: types, costs, and what to expect
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Understanding mainland licence types, fee structures, and the approval process is the foundation for a clean setup. Most founders overestimate the complexity of the licence itself — and underestimate the practical steps around it.
        </p>
        <BestAnswerBlock
          title="Best answer"
          content="Your mainland licence type is determined by your business activity, not your preference. The right approach is to confirm your activity first, then identify which licence category applies, what approvals are needed, and what the realistic cost and timeline look like."
          caution="Don't choose a licence type based on what sounds right. Let the activity determine the structure."
        />
      </section>

      {/* Licence Types */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Mainland licence types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {licenceTypes.map((lt) => (
            <div key={lt.name} className="border border-border rounded-lg p-5 bg-card">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{lt.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{lt.suits}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-medium text-foreground">Authority:</span> {lt.authority}
              </div>
              <p className="text-xs text-muted-foreground italic">{lt.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Source: UAE Federal Law No. 32 of 2021 (Commercial Companies Law); individual emirate DED/DET portals.
        </p>
      </section>

      {/* Cost Layers */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Licensing cost layers</h2>
          <p className="text-muted-foreground mb-6">
            Mainland licensing costs are not a single fee. They build up in layers — and the total depends on your activity, emirate, and structure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {costLayers.map((c) => (
              <div key={c.label} className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                <c.icon className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{c.label}</p>
                  <p className="text-sm text-muted-foreground">{c.range}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6 italic">
            Indicative ranges for Dubai DED. Other emirates may differ. Verify current fees with the relevant authority.
          </p>
        </div>
      </section>

      {/* When this applies / doesn't */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              When mainland licensing makes sense
            </h3>
            <ul className="space-y-2">
              {[
                "You need an activity structure not available in most free zones",
                "Your business requires onshore contracting or local market access",
                "You plan to hire staff and need flexible visa allocation",
                "You want to operate from a physical office or retail premises",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-success mt-1">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              When it may not be the right starting point
            </h3>
            <ul className="space-y-2">
              {[
                "Solo digital businesses with no local client-facing needs",
                "Founders optimising for lowest possible first-year cost",
                "Remote-first operators who don't need physical presence",
                "Businesses that can operate cleanly within a free zone framework",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="container pb-16">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-caution" />
          Common licensing mistakes
        </h2>
        <Accordion type="single" collapsible className="space-y-2 max-w-3xl">
          {mistakes.map((m, i) => (
            <AccordionItem key={i} value={`m-${i}`} className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                {m.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">
                {m.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-16">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            Not sure which licence type fits?
          </h2>
          <p className="text-muted-foreground mb-6">
            Get a tailored breakdown based on your activity, emirate, and business structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/tools/cost-estimator">Estimate Total Cost</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default MainlandLicensing;
