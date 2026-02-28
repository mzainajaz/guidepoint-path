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
  Calendar,
  Shield,
  FileWarning,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const annualObligations = [
  {
    item: "Trade licence renewal",
    timing: "Annually (before expiry date)",
    penalty: "AED 200–500/month late fee",
    authority: "DED / DET",
    icon: Calendar,
  },
  {
    item: "Ejari renewal",
    timing: "When tenancy contract renews",
    penalty: "Blocks licence renewal & visa processing",
    authority: "Dubai Land Department",
    icon: Calendar,
  },
  {
    item: "Corporate tax registration & filing",
    timing: "Within 9 months of financial year end",
    penalty: "AED 10,000+ for late registration",
    authority: "Federal Tax Authority (FTA)",
    icon: Shield,
  },
  {
    item: "VAT return filing (if registered)",
    timing: "Quarterly (most businesses)",
    penalty: "AED 1,000 first offence; AED 2,000 repeat",
    authority: "Federal Tax Authority (FTA)",
    icon: Shield,
  },
  {
    item: "Economic Substance (ESR) notification",
    timing: "Within 6 months of financial year end",
    penalty: "AED 20,000 for failure to notify",
    authority: "Ministry of Finance",
    icon: FileWarning,
  },
  {
    item: "UBO (Ultimate Beneficial Owner) register",
    timing: "Initial filing + ongoing updates",
    penalty: "AED 100,000+ for non-compliance",
    authority: "Ministry of Economy / Registrar",
    icon: Shield,
  },
  {
    item: "AML compliance (if applicable)",
    timing: "Ongoing + annual review",
    penalty: "Significant fines; potential licence suspension",
    authority: "Relevant supervisory authority",
    icon: FileWarning,
  },
  {
    item: "Annual audit (if required)",
    timing: "Within 3–6 months of year end",
    penalty: "May block licence renewal",
    authority: "DED / FTA (for tax purposes)",
    icon: Calendar,
  },
];

const complianceCalendar = [
  { month: "Month 1–3", tasks: "Corporate tax registration (if not done), confirm VAT status, set up accounting system, appoint auditor if required" },
  { month: "Month 3–6", tasks: "First VAT return (if registered), ESR notification (if applicable), UBO filing, review employment contracts for WPS compliance" },
  { month: "Month 6–9", tasks: "Mid-year bookkeeping review, prepare for corporate tax filing, renew any expiring visas" },
  { month: "Month 9–12", tasks: "Corporate tax return filing, annual audit preparation, licence renewal planning, Ejari renewal if due" },
];

const mistakes = [
  {
    title: "Treating compliance as a once-a-year task",
    content: "UAE compliance is not just annual licence renewal. VAT returns are quarterly, ESR notifications have specific deadlines, UBO registers must be kept current, and corporate tax filing has its own timeline. Build a compliance calendar from day one.",
  },
  {
    title: "Not registering for corporate tax on time",
    content: "Since June 2023, all UAE businesses must register for corporate tax, even if taxable income is below the AED 375,000 threshold. Late registration penalties start at AED 10,000. Register proactively — don't wait for an FTA notice.",
  },
  {
    title: "Assuming 'no tax' means no filing obligation",
    content: "Even if your business qualifies for 0% tax (e.g., below the threshold), you may still need to file a return. The obligation to register and file is separate from the obligation to pay tax.",
  },
  {
    title: "Ignoring Economic Substance Requirements",
    content: "If your mainland company performs a 'Relevant Activity' (banking, insurance, shipping, holding company, IP, etc.), you must demonstrate adequate substance in the UAE. Penalties for non-compliance start at AED 20,000 and escalate to AED 400,000.",
  },
  {
    title: "Not setting up proper bookkeeping from the start",
    content: "The FTA expects businesses to maintain financial records for at least 7 years. Scrambling to reconstruct records at year-end or audit time is expensive and risky. Use cloud accounting software from day one.",
  },
  {
    title: "Missing the WPS (Wage Protection System) requirement",
    content: "All UAE employers must pay salaries through the WPS — a centralised system monitored by MOHRE. Non-compliance can result in fines, licence suspension, and visa bans.",
  },
];

const faqs = [
  {
    q: "Do all mainland companies need an audit?",
    a: "Not all, but many do. Companies registered for VAT, those above certain revenue thresholds, and companies in regulated sectors typically require an annual audit by a UAE-licensed auditor. Even if not strictly required, maintaining audited financials is considered best practice for banking, investor relations, and tax compliance.",
  },
  {
    q: "What is the corporate tax filing deadline?",
    a: "Corporate tax returns must be filed within 9 months of the end of the financial year. For a company with a January–December financial year, the deadline is September 30 of the following year. Late filing attracts penalties.",
  },
  {
    q: "Do I need to register for VAT if I'm below the threshold?",
    a: "Mandatory registration applies if taxable supplies exceed AED 375,000 in the past 12 months or are expected to in the next 30 days. Voluntary registration is available above AED 187,500. Below both thresholds, registration is not required but may be beneficial for input tax recovery.",
  },
  {
    q: "What happens if I miss a compliance deadline?",
    a: "Penalties vary by obligation: VAT late filing starts at AED 1,000 (first) and AED 2,000 (repeat). Corporate tax late registration is AED 10,000+. Licence renewal late fees are AED 200–500/month. ESR non-notification is AED 20,000. These penalties compound — address any lapse immediately.",
  },
];

const MainlandCompliance = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      {/* Breadcrumb */}
      <div className="container pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/mainland" className="hover:text-foreground transition-colors">Mainland</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Compliance Basics</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Mainland compliance: what you owe, when, and what happens if you miss it
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Setting up a mainland company is step one. Staying compliant is the ongoing obligation most founders underestimate. This page covers every recurring obligation, deadline, and penalty you need to know about.
        </p>
        <BestAnswerBlock
          title="Best answer"
          content="Mainland compliance is not one annual renewal. It is a rolling set of obligations across licensing, tax, employment, and corporate governance — each with its own deadline, authority, and penalty structure. Build a compliance calendar before you set up, not after."
          caution="The cost of non-compliance almost always exceeds the cost of doing it right the first time."
        />
      </section>

      {/* Annual Obligations Table */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Annual compliance obligations</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-medium text-foreground py-3 pr-4">Obligation</th>
                <th className="text-left text-sm font-medium text-foreground py-3 pr-4">Timing</th>
                <th className="text-left text-sm font-medium text-foreground py-3 pr-4">Penalty for non-compliance</th>
                <th className="text-left text-sm font-medium text-foreground py-3">Authority</th>
              </tr>
            </thead>
            <tbody>
              {annualObligations.map((o, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <o.icon className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{o.item}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-muted-foreground">{o.timing}</td>
                  <td className="py-3 pr-4 text-sm text-muted-foreground">{o.penalty}</td>
                  <td className="py-3 text-sm text-muted-foreground">{o.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Sources: Federal Tax Authority (FTA); UAE Cabinet Decision No. 57 of 2020 (ESR); Federal Decree-Law No. 47 of 2022 (Corporate Tax); MOHRE (WPS).
        </p>
      </section>

      {/* Compliance Calendar */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">First-year compliance calendar</h2>
          <p className="text-muted-foreground mb-8">
            A practical quarter-by-quarter view of what needs to happen after your mainland company is set up:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceCalendar.map((q) => (
              <div key={q.month} className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-display text-sm font-semibold text-accent mb-2">{q.month}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{q.tasks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When this applies / doesn't */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              This applies to you if
            </h3>
            <ul className="space-y-2">
              {[
                "You hold an active mainland trade licence in any emirate",
                "You have employees registered under your company",
                "Your taxable supplies exceed (or approach) AED 375,000",
                "Your company performs a Relevant Activity under ESR",
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
              May not fully apply if
            </h3>
            <ul className="space-y-2">
              {[
                "You operate exclusively through a free zone entity (different compliance framework)",
                "You have no employees and no VAT obligation (but corporate tax registration likely still applies)",
                "Your company is dormant (but reporting obligations may still exist)",
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
          Common compliance mistakes
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
            Stay ahead of compliance deadlines
          </h2>
          <p className="text-muted-foreground mb-6">
            Get a personalised compliance checklist based on your mainland setup, activity, and team size.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/taxes">Tax & Compliance Hub</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default MainlandCompliance;
