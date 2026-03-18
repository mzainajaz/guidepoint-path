import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  MapPin,
  FileCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const officeTypes = [
  {
    name: "Flexi Desk / Hot Desk",
    cost: "AED 5,000–15,000/year",
    ejari: "Sometimes (emirate-dependent)",
    suits: "Professional licence holders with minimal physical presence needs",
    caveat: "Not all flexi desks qualify for Ejari registration. Verify before signing.",
  },
  {
    name: "Serviced Office",
    cost: "AED 20,000–60,000/year",
    ejari: "Yes (usually included)",
    suits: "Small teams needing a professional address, meeting rooms, and basic infrastructure",
    caveat: "Lock-in periods vary. Some providers charge separately for Ejari registration.",
  },
  {
    name: "Dedicated Office / Shell & Core",
    cost: "AED 40,000–200,000+/year",
    ejari: "Yes (tenant responsibility)",
    suits: "Growing teams, client-facing businesses, regulated activities requiring physical premises",
    caveat: "Fit-out costs, DEWA deposits, and municipality fees add to the headline rent.",
  },
  {
    name: "Warehouse / Industrial",
    cost: "AED 50,000–300,000+/year",
    ejari: "Yes",
    suits: "Manufacturing, storage, logistics, and distribution businesses",
    caveat: "Requires specific zoning approval. Environmental and safety compliance may apply.",
  },
];

const ejariSteps = [
  { step: "1", title: "Secure tenancy agreement", desc: "Sign a tenancy contract with the landlord or business centre. Ensure the contract format is Ejari-compatible." },
  { step: "2", title: "Gather required documents", desc: "Trade licence (or initial approval), passport copies, Emirates ID, tenancy contract, title deed or landlord authorisation." },
  { step: "3", title: "Register on Ejari portal", desc: "Submit through the Ejari online portal or visit an approved typing centre. Fee: AED 155–220 (Dubai)." },
  { step: "4", title: "Receive Ejari certificate", desc: "Certificate issued same day or within 1–2 working days. This is required for licence issuance or renewal." },
];

const mistakes = [
  {
    title: "Signing a lease before confirming Ejari eligibility",
    content: "Not all commercial spaces qualify for Ejari registration. Virtual offices, co-working memberships, and some flexi desks may not be eligible. Always confirm with the provider and the relevant authority before committing.",
  },
  {
    title: "Underestimating total occupancy costs",
    content: "The headline rent is rarely the full picture. Factor in DEWA (utility) deposits (AED 2,000–6,000), municipality fees (typically 5% of annual rent), Ejari registration fees, fit-out costs, and chiller charges where applicable.",
  },
  {
    title: "Choosing location based on prestige rather than fit",
    content: "A DIFC or Downtown address sounds impressive but may not be necessary — or cost-effective — for your business model. Match the office to your operational needs, not your aspirations.",
  },
  {
    title: "Missing the Ejari renewal window",
    content: "Ejari registration must be renewed when the tenancy contract is renewed. Lapsed Ejari can block licence renewal, visa processing, and other government services.",
  },
  {
    title: "Not checking subletting and sharing restrictions",
    content: "Sharing office space or subletting without landlord and authority approval can invalidate Ejari registration and create compliance issues.",
  },
];

const faqs = [
  {
    q: "Is Ejari mandatory for mainland companies?",
    a: "Yes, in Dubai. Ejari (which means 'my rent' in Arabic) is the official tenancy registration system. A valid Ejari certificate is required for licence issuance, renewal, and visa processing. Other emirates have equivalent systems (e.g., Tawtheeq in Abu Dhabi).",
  },
  {
    q: "Can I use a virtual office for a mainland licence?",
    a: "Generally no. Most mainland licences require a physical office with a valid tenancy contract registered through Ejari. Some professional licence categories in certain emirates may accept flexi-desk arrangements, but this is not universal.",
  },
  {
    q: "What happens if my Ejari expires?",
    a: "An expired Ejari can block licence renewal, new visa applications, and amendments to your company. Penalties may apply. Renew Ejari promptly when your tenancy contract is renewed.",
  },
  {
    q: "How much does Ejari registration cost?",
    a: "The standard Ejari registration fee in Dubai is AED 155–220 through the online portal or typing centre. This is a one-time fee per tenancy contract period.",
  },
];

const MainlandEjari = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="page-offset">
      {/* Hero Image */}
      <div className="relative h-40 md:h-56 overflow-hidden">
        <img src="/images/section-mainland.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        <div className="relative container h-full flex items-end pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/mainland" className="hover:text-foreground transition-colors">Mainland</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Office & Ejari</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Office requirements and Ejari registration for mainland companies
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          For mainland companies, office space is not optional — it is a licensing requirement. Understanding what qualifies, what Ejari involves, and what the real costs look like can prevent expensive mistakes.
        </p>
        <BestAnswerBlock
          title="Best answer"
          content="Every mainland company in Dubai needs a registered office address with a valid Ejari certificate. The type of office you need depends on your licence category, activity, and visa requirements. Don't sign a lease until you've confirmed it qualifies for Ejari and meets your licensing authority's requirements."
          caution="A cheap office that doesn't qualify for Ejari is not a saving — it's a setup blocker."
        />
      </section>

      {/* Office Types */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Office types and what they cost</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {officeTypes.map((ot) => (
            <div key={ot.name} className="border border-border rounded-lg p-5 bg-card">
              <div className="flex items-start gap-3 mb-3">
                <Building2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{ot.name}</h3>
                  <p className="text-sm font-medium text-accent">{ot.cost}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{ot.suits}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-medium text-foreground">Ejari eligible:</span> {ot.ejari}
              </div>
              <p className="text-xs text-muted-foreground italic">{ot.caveat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ejari Process */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-accent" />
            Ejari registration process
          </h2>
          <p className="text-muted-foreground mb-8">
            Ejari is Dubai's official tenancy contract registration system. Here's the step-by-step process:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ejariSteps.map((s) => (
              <div key={s.step} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    {s.step}
                  </span>
                  <h3 className="font-medium text-foreground text-sm">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Source: Dubai Land Department Ejari portal; RERA (Real Estate Regulatory Agency).
          </p>
        </div>
      </section>

      {/* When this applies / doesn't */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              When physical office + Ejari matters most
            </h3>
            <ul className="space-y-2">
              {[
                "Commercial licence holders — almost always required",
                "Businesses applying for 3+ employee visas",
                "Client-facing operations needing a professional address",
                "Regulated activities requiring inspectable premises",
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
              When you might avoid this complexity
            </h3>
            <ul className="space-y-2">
              {[
                "Solo consultants who could operate from a free zone flexi-desk",
                "Remote-first digital businesses with no local client needs",
                "Early-stage founders testing the market before committing",
                "Businesses where a free zone virtual office satisfies requirements",
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
          Common office & Ejari mistakes
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
            Need help choosing the right office setup?
          </h2>
          <p className="text-muted-foreground mb-6">
            Get a tailored recommendation based on your licence type, team size, and budget.
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

export default MainlandEjari;
