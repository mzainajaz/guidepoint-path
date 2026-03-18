import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Globe2,
  Users,
  CreditCard,
  Calculator,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema, faqSchema } from "@/components/SEOHead";
import { useLocalePath } from "@/i18n/context";

const decisionCards = [
  {
    icon: Globe2,
    question: "Can foreigners start a business in UAE?",
    answer:
      "Yes — 100 % foreign ownership is allowed in most free zones and, since 2021, across mainland categories too. No local partner or sponsor is required for the vast majority of activities.",
    details: [
      "Free zones have allowed full ownership since inception",
      "Mainland opened to 100 % ownership for 1,000+ activities in 2021",
      "Some regulated sectors still require a local service agent (not equity partner)",
    ],
    cta: { label: "See free zone vs mainland", href: "/compare/freezone-vs-mainland" },
  },
  {
    icon: Building2,
    question: "Free zone or mainland — which is right for me?",
    answer:
      "Free zones offer speed, simplicity, and zero corporate tax on qualifying income. Mainland gives you unrestricted access to the local UAE market and government contracts.",
    details: [
      "Free zone: best for remote services, e-commerce, consulting, holding structures",
      "Mainland: best for retail, F&B, contracting, trading with local clients",
      "You can hold both — many founders start free zone and add mainland later",
    ],
    cta: { label: "Compare side by side", href: "/compare/freezone-vs-mainland" },
  },
  {
    icon: Calculator,
    question: "What does it actually cost to set up?",
    answer:
      "A basic free zone licence starts from AED 5,750/year. With visas, office, and banking, most founders spend AED 15,000–35,000 in year one.",
    details: [
      "Licence fee: AED 5,750–25,000 depending on zone and activity",
      "Visa per person: ~AED 3,500–5,000 (medical + Emirates ID + stamping)",
      "Office/flexi-desk: AED 0–25,000/year",
      "Bank account opening: AED 0–1,500",
    ],
    cta: { label: "Estimate your costs", href: "/tools/cost-estimator" },
  },
  {
    icon: Users,
    question: "How do visas work?",
    answer:
      "Your trade licence determines your visa quota. Each visa lets one person live and work in the UAE. The investor visa (the one tied to company ownership) is the most common for founders.",
    details: [
      "Investor visa: tied to share ownership — valid 2–3 years",
      "Employee visa: sponsored by your company for staff",
      "Family visa: sponsor spouse and children once you hold a residence visa",
      "Golden visa: 10-year option for qualifying investors and entrepreneurs",
    ],
    cta: { label: "Explore visa options", href: "/guides" },
  },
  {
    icon: CreditCard,
    question: "How hard is it to open a bank account?",
    answer:
      "Banking is the most underestimated step. UAE banks apply strict KYC — your nationality, industry, and transaction countries all affect approval odds and timelines.",
    details: [
      "Typical timeline: 2–6 weeks after licence issuance",
      "Most rejections come from incomplete documentation, not the business itself",
      "Some free zones have banking partnerships that simplify the process",
      "Digital banks (e.g. Wio, Mashreq Neo) offer faster onboarding for low-risk profiles",
    ],
    cta: { label: "Find banking-friendly zones", href: "/tools/zone-picker" },
  },
  {
    icon: Shield,
    question: "What about taxes and compliance?",
    answer:
      "The UAE introduced 9 % corporate tax in June 2023 and has a 5 % VAT. Free zone companies can qualify for 0 % corporate tax if they meet substance requirements.",
    details: [
      "Corporate tax: 9 % on taxable income above AED 375,000",
      "Free zone qualifying income: 0 % rate if substance and conditions are met",
      "VAT: mandatory registration at AED 375,000 turnover; voluntary at AED 187,500",
      "Annual compliance: UBO filing, ESR notification, AML registration",
    ],
    cta: { label: "Understand your obligations", href: "/taxes" },
  },
];

const commonMistakes = [
  {
    mistake: "Choosing the cheapest zone without checking banking compatibility",
    fix: "Cross-reference zone choice with banking success rates for your nationality and industry.",
  },
  {
    mistake: "Underestimating total first-year cost",
    fix: "Budget for licence + visas + office + bank account + PRO services — not just the headline licence fee.",
  },
  {
    mistake: "Starting mainland without understanding Ejari requirements",
    fix: "Mainland requires a physical office lease (Ejari-registered). Factor in AED 15,000–50,000/yr for office space.",
  },
  {
    mistake: "Ignoring substance requirements for free zone tax benefits",
    fix: "0 % corporate tax requires adequate substance — employees, office, decision-making in the UAE.",
  },
];

const faqItems = [
  {
    question: "How long does it take to set up a company in UAE?",
    answer: "Free zone setup typically takes 3–7 business days. Mainland takes 5–15 business days depending on the activity and approvals required.",
  },
  {
    question: "Do I need to live in the UAE to own a company there?",
    answer: "No. You can own a UAE company remotely. However, you'll need to visit for visa stamping and bank account opening in most cases.",
  },
  {
    question: "Can I have multiple business activities on one licence?",
    answer: "Yes — most free zones allow 2–5 activities on a single licence. Mainland licences can also cover multiple related activities.",
  },
  {
    question: "What's the difference between a trade licence and a visa?",
    answer: "The trade licence is your company's permission to operate. A visa is an individual's permission to reside and work in the UAE. Your licence determines how many visas you can sponsor.",
  },
];

const StartHere = () => {
  const lp = useLocalePath();

  return (
    <>
      <SEOHead
        title="Start Here — UAE Business Setup for Founders"
        description="Everything you need to know before setting up a company in the UAE. Ownership rules, costs, visa requirements, banking, and taxes — explained clearly."
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Start Here", url: "/start-here" },
          ]),
          faqSchema(faqItems.map(f => ({ q: f.question, a: f.answer }))),
        ]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        {/* Hero */}
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/section-start-here.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          </div>
          <div className="container py-20 md:py-28 max-w-3xl relative z-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Founder Decision Hub
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start here
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Setting up in the UAE is straightforward — but only if you understand the five decisions
              that determine your cost, timeline, and banking odds. We break them down below.
            </p>
          </div>
        </section>

        {/* Quick facts strip */}
        <section className="border-b border-border">
          <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              {[
                { stat: "100 %", label: "Foreign ownership" },
                { stat: "3–7 days", label: "Free zone setup" },
                { stat: "From AED 5,750", label: "Annual licence" },
                { stat: "0 % possible", label: "Corporate tax" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-display text-2xl font-bold text-foreground">{s.stat}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decision cards */}
        <section className="container py-16 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-10 text-center">
            The six questions every founder asks
          </h2>
          <div className="space-y-6">
            {decisionCards.map((card, i) => (
              <article
                key={i}
                className="border border-border rounded-xl bg-card overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <card.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                      {card.question}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {card.answer}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {card.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={lp(card.cta.href)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
                  >
                    {card.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        <section className="border-t border-border bg-secondary/20">
          <div className="container py-16 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Common mistakes to avoid
            </h2>
            <div className="space-y-4">
              {commonMistakes.map((m, i) => (
                <div key={i} className="border border-border rounded-lg p-5 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{m.mistake}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">{m.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="border-t border-border">
          <div className="container py-16 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Ready to go deeper?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Estimate your setup cost", href: "/tools/cost-estimator", icon: Calculator },
                { label: "Find the right free zone", href: "/tools/zone-picker", icon: Building2 },
                { label: "Compare free zone vs mainland", href: "/compare/freezone-vs-mainland", icon: Globe2 },
                { label: "Talk to an advisor", href: "/contact", icon: Users },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={lp(link.href)}
                  className="flex items-center gap-3 border border-border rounded-lg p-4 bg-card hover:border-accent/40 transition-all group"
                >
                  <link.icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground flex-1">{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-secondary/20">
          <div className="container py-16 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <details key={i} className="border border-border rounded-lg bg-card group">
                  <summary className="px-5 py-4 text-sm font-medium text-foreground cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="container pb-16 pt-8">
          <div className="max-w-3xl mx-auto border border-border rounded-xl p-6 bg-card text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This page is for educational purposes only
              and does not constitute legal or tax advice. Regulations and pricing change — always confirm current
              information with the relevant authority or a licensed advisor.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StartHere;
