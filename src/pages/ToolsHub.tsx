import { Calculator, Search, FileCheck, MapPin, Target, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";

const tools = [
  {
    icon: Calculator,
    title: "Total Setup Cost Estimator",
    description:
      "Get an indicative cost breakdown for your specific setup — activity, visas, office, and banking included.",
    href: "/tools/cost-estimator",
    badge: "Popular",
  },
  {
    icon: Search,
    title: "Free Zone Picker",
    description:
      "Answer a few questions and get matched with the free zones most likely to suit your needs.",
    href: "/tools/zone-picker",
    badge: "Interactive",
  },
  {
    icon: FileCheck,
    title: "VAT Decision Helper",
    description:
      "Understand whether you need to register for VAT and what the key thresholds and timelines are.",
    href: "/tools/vat-helper",
    badge: "Compliance",
  },
  {
    icon: MapPin,
    title: "Relocation Cost Calculator",
    description:
      "Estimate monthly living costs and first-year relocation budget — housing, schooling, lifestyle included.",
    href: "/tools/relocation-calculator",
    badge: "New",
  },
  {
    icon: Target,
    title: "Founder Readiness Score",
    description:
      "Take a 2-minute assessment to gauge how prepared you are for UAE company formation.",
    href: "/tools/founder-readiness",
    badge: "New",
  },
  {
    icon: Shield,
    title: "Bank Account Readiness",
    description:
      "Assess how your nationality, industry, and documentation affect UAE banking approval odds.",
    href: "/tools/bank-readiness",
    badge: "New",
  },
];

const ToolsHub = () => (
  <>
    <SEOHead
      title="UAE Business Setup Tools — Cost Estimator, Zone Picker, VAT & Banking"
      description="Interactive tools for UAE business setup. Estimate costs, match free zones, check VAT obligations, assess banking readiness, and gauge founder preparedness."
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }])]}
    />
    <Header />
    <main className="page-offset min-h-screen bg-background">
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/section-tools-hero.jpg" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
        </div>
        <div className="container py-20 md:py-28 text-center relative z-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            Interactive Tools
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl mx-auto">
            Tools that help you decide
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Interactive calculators and matchers built on structured data and transparent methodology.
          </p>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              to={tool.href}
              className="group relative border border-border rounded-xl p-8 bg-card hover:border-accent/50 hover:shadow-lg transition-all flex flex-col"
            >
              <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                {tool.badge}
              </span>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <tool.icon className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                {tool.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                {tool.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                Launch tool <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Methodology note */}
      <section className="container pb-20">
        <div className="max-w-3xl mx-auto border border-border rounded-xl p-8 bg-card text-center">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            How these tools work
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All estimates are based on published authority pricing, verified against official sources as of February 2026. 
            These tools give you directional guidance — they are not quotes. Always confirm final pricing with the relevant authority or a licensed service agent before committing.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ToolsHub;
