import { Link } from "react-router-dom";
import { useT } from "@/i18n/context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowRight,
  Landmark,
  Home,
  GraduationCap,
  Users,
  Clock,
  CreditCard,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Shield,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const countries = [
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    headline: "For UK founders relocating to the UAE",
    description:
      "Understand tax residency changes, HMRC obligations, banking transitions, and the best UAE setup routes for UK entrepreneurs and consultants.",
    highlights: [
      "Tax residency split-year treatment",
      "HMRC notification obligations",
      "UK banking retention strategies",
      "Best free zones for UK founders",
    ],
  },
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    headline: "For US founders exploring UAE setup",
    description:
      "Navigate FATCA implications, US tax filing obligations, LLC vs free zone structures, and banking realities for American entrepreneurs.",
    highlights: [
      "FATCA and worldwide taxation",
      "LLC vs UAE free zone entity",
      "US banking alongside UAE accounts",
      "Social Security and Medicare implications",
    ],
  },
  {
    code: "india",
    name: "India",
    flag: "🇮🇳",
    headline: "For Indian entrepreneurs moving to the UAE",
    description:
      "Explore setup routes popular with Indian founders, banking and KYC realities, FEMA compliance, and family relocation considerations.",
    highlights: [
      "FEMA and RBI compliance",
      "NRI tax residency rules",
      "Popular free zones for Indian founders",
      "Family visa and schooling options",
    ],
  },
  {
    code: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    headline: "For Egyptian founders setting up in the UAE",
    description:
      "Understand visa pathways, banking onboarding realities, cost-effective setup routes, and community resources for Egyptian entrepreneurs.",
    highlights: [
      "Visa pathways and sponsorship",
      "Banking KYC for Egyptian nationals",
      "Cost-effective free zone options",
      "Arabic-speaking support resources",
    ],
  },
  {
    code: "europe",
    name: "Europe",
    flag: "🇪🇺",
    headline: "For European founders relocating to the UAE",
    description:
      "Navigate EU exit considerations, tax treaty implications, healthcare transitions, and finding the right UAE setup for European entrepreneurs.",
    highlights: [
      "EU tax treaty implications",
      "Healthcare and social security transitions",
      "European banking retention",
      "Best free zones for EU founders",
    ],
  },
];

const pillars = [
  {
    icon: Landmark,
    title: "Banking & Finance",
    description:
      "Opening a UAE corporate bank account, personal banking, remittance realities, and KYC preparation. What to expect and how to prepare.",
    topics: [
      "Corporate bank account opening",
      "Personal banking setup",
      "KYC documentation preparation",
      "Multi-currency accounts",
      "Remittance and transfers",
      "Digital banking alternatives",
    ],
  },
  {
    icon: Home,
    title: "Housing & Accommodation",
    description:
      "Finding accommodation, understanding Ejari, rental contracts, security deposits, and neighbourhoods suited to different budgets and lifestyles.",
    topics: [
      "Rental market overview",
      "Ejari registration",
      "Security deposits and DEWA",
      "Neighbourhood guides by budget",
      "Short-term vs long-term leases",
      "Furnished vs unfurnished options",
    ],
  },
  {
    icon: GraduationCap,
    title: "Schooling & Education",
    description:
      "Navigating the school landscape — curricula, fees, admissions timelines, and how to choose the right fit for your children.",
    topics: [
      "Curriculum options (British, American, IB, Indian)",
      "Fee ranges and payment schedules",
      "Admissions timeline and process",
      "Nursery and early years",
      "University and higher education",
      "Tutoring and supplementary education",
    ],
  },
  {
    icon: Users,
    title: "Dependent Visas & Family",
    description:
      "Sponsoring family members, dependent visa requirements, domestic worker visas, and family-related compliance considerations.",
    topics: [
      "Spouse and children visa sponsorship",
      "Parent visa options",
      "Domestic worker visas",
      "Salary thresholds for family sponsorship",
      "Health insurance requirements",
      "Emirates ID for dependents",
    ],
  },
  {
    icon: Clock,
    title: "Timeline & Planning",
    description:
      "Realistic timelines for setup, relocation, and settlement. What to do before, during, and after arrival in the UAE.",
    topics: [
      "Pre-arrival checklist",
      "First 30 days roadmap",
      "90-day settlement plan",
      "Document apostille and attestation",
      "Driving licence conversion",
      "Utility connections and services",
    ],
  },
  {
    icon: CreditCard,
    title: "Cost Drivers & Budgeting",
    description:
      "Realistic cost expectations for relocation — from setup fees and housing deposits to schooling, healthcare, and daily living costs.",
    topics: [
      "Setup cost breakdown",
      "Housing deposit and agency fees",
      "Schooling fees and registration",
      "Health insurance costs",
      "Monthly living cost estimates",
      "Hidden costs to anticipate",
    ],
  },
];

const faqs = [
  {
    q: "Do I need to move to the UAE to set up a company?",
    a: "Not necessarily. Many free zones allow remote setup and management. However, if you need a UAE residence visa or want to open certain bank accounts, at least one visit is usually required. Some founders set up the company first and relocate later.",
  },
  {
    q: "How long does the full relocation process take?",
    a: "Company setup can take 3–14 days depending on the free zone. Visa processing adds 5–14 days. Finding housing, school enrolment, and banking setup can take 4–8 weeks total. Plan for at least 2–3 months from decision to full settlement.",
  },
  {
    q: "Can I keep my home-country bank accounts?",
    a: "In most cases, yes — but it depends on your home country's rules and your new tax residency status. Some banks may restrict services for non-residents. It's worth checking with your bank before relocating.",
  },
  {
    q: "What about healthcare in the UAE?",
    a: "Health insurance is mandatory for all UAE residents. Employers and sponsors must provide coverage. Plans range from basic (AED 3,000–5,000/year) to comprehensive international coverage (AED 15,000–30,000+/year).",
  },
  {
    q: "Do I need to pay taxes in the UAE?",
    a: "The UAE has no personal income tax. Corporate tax (9%) applies to business profits above AED 375,000. VAT at 5% applies to most goods and services. Your home-country tax obligations depend on your residency status and nationality (US citizens are taxed worldwide).",
  },
];

const RelocationHub = () => {
  const t = useT();
  return (
  <div className="min-h-screen bg-background">
    <SEOHead
      title={t.seo.relocation.title}
      description={t.seo.relocation.description}
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Relocation", url: "/relocation" }])]}
    />
    <Header />
    <main className="page-offset">
      {/* Hero Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src="/images/section-relocation-hub.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="relative container h-full flex items-end pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Relocation</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          UAE Relocation Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Plan your move alongside your company setup. Country-specific guidance, relocation checklists, banking preparation, and realistic cost expectations.
        </p>
        <BestAnswerBlock
          title="What to know before relocating to the UAE"
          content="Relocation planning should happen alongside company setup — not after. Banking, housing, schooling, and visa timelines all interconnect. Starting early on documentation and KYC preparation saves weeks."
          audience="Founders, entrepreneurs, and professionals relocating to the UAE with or without family."
          caution="Tax residency rules vary by country. Always get country-specific tax advice before changing your residency status."
        />
      </section>

      {/* Country entry cards */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3 text-center">
            Relocating from…
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            Select your country for tailored guidance on tax obligations, banking, setup routes, and common pitfalls.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {countries.map((country) => (
              <article
                key={country.code}
                className="border border-border rounded-lg bg-card hover:border-accent/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="p-6 flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {country.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {country.description}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {country.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border p-4">
                  <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link to={`/relocation/${country.code}`}>
                      Explore {country.name} guide
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Relocation pillars */}
      <section className="container py-20">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3 text-center">
          Relocation pillars
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          The key areas every relocating founder needs to plan for — whether moving solo or with family.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-border rounded-lg bg-card p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                  <pillar.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{pillar.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              <ul className="space-y-1.5">
                {pillar.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-secondary py-16">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3 text-center">
            Common relocation mistakes
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
            Avoid the pitfalls that delay setup, increase costs, and create unnecessary stress.
          </p>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                title: "Not checking tax residency rules before moving",
                content:
                  "Your home country may still consider you tax-resident even after relocating. The UK has a Statutory Residence Test, the US taxes worldwide income, and India has specific NRI thresholds. Get specialist advice before you move.",
              },
              {
                title: "Delaying bank account preparation",
                content:
                  "UAE banking KYC can take 2–6 weeks. Start preparing documents — business plan, source of funds, client contracts — before you arrive. Don't wait until after your licence is issued.",
              },
              {
                title: "Underestimating housing deposits",
                content:
                  "UAE landlords typically require 1–4 cheques upfront plus a security deposit (5% of annual rent) and agency fees (5%). Budget for 3–6 months of rent upfront.",
              },
              {
                title: "Missing school admissions deadlines",
                content:
                  "Popular schools fill up months in advance. Start researching and applying before your move, especially for September intake. Some schools have waiting lists of 6–12 months.",
              },
              {
                title: "Assuming everything can be done remotely",
                content:
                  "While company setup can often start remotely, visa processing, Emirates ID, medical tests, and bank account opening typically require physical presence in the UAE.",
              },
              {
                title: "Not planning for health insurance gaps",
                content:
                  "Health insurance is mandatory in the UAE. Ensure you have coverage from day one — there can be gaps between leaving your home-country system and your UAE policy activating.",
              },
            ].map((mistake, i) => (
              <AccordionItem key={i} value={`mistake-${i}`} className="border border-border rounded-lg px-4 bg-card">
                <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-caution shrink-0" />
                    {mistake.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  {mistake.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Qualification CTA */}
      <section className="container py-16">
        <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-10 text-center max-w-2xl mx-auto">
          <Shield className="h-8 w-8 text-accent mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            Get a personalised relocation plan
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Tell us your situation — country, family size, timeline, and budget — and we'll create a tailored setup and relocation plan with realistic timelines and cost expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get a Relocation Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Speak to an Agent
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-16 max-w-3xl">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
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
      <section className="container pb-16">
        <div className="border-t border-border pt-8 max-w-2xl">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">About this hub</p>
            <p>
              Relocation guidance is compiled from official government sources, community feedback, and editorial research. Individual circumstances vary — always verify specifics with qualified advisors.
            </p>
            <p className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              <strong>Last updated:</strong> February 2026
            </p>
            <p className="text-xs">
              This page is educational and does not replace legal, tax, or immigration advice.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default RelocationHub;
