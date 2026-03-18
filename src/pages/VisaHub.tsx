import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, Handshake, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { useLocalePath, useT } from "@/i18n/context";
import { visaGuides } from "@/data/visaGuides";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  users: Users,
  handshake: Handshake,
  heart: Heart,
};

const VisaHub = () => {
  const lp = useLocalePath();
  const t = useT();

  return (
    <>
      <SEOHead
        title={t.seo.visas.title}
        description={t.seo.visas.description}
        schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Visa Guide", url: "/visas" }])]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/section-visas.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          </div>
          <div className="container py-20 md:py-28 text-center relative z-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Visa Guide
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl mx-auto">
              UAE visa types for founders
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Understand which visa you need, what it costs, and how long it takes — for yourself, your team, and your family.
            </p>
          </div>
        </section>

        {/* Quick facts */}
        <section className="border-b border-border">
          <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              {[
                { stat: "4 types", label: "Visa categories" },
                { stat: "7–20 days", label: "Processing time" },
                { stat: "From AED 3,000", label: "Per visa" },
                { stat: "2–3 years", label: "Standard validity" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-display text-2xl font-bold text-foreground">{s.stat}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa cards */}
        <section className="container py-16">
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {visaGuides.map((visa) => {
              const Icon = iconMap[visa.icon] || Briefcase;
              return (
                <Link
                  key={visa.id}
                  to={lp(`/visas/${visa.id}`)}
                  className="group border border-border rounded-xl p-6 bg-card hover:border-accent/50 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-foreground">{visa.title}</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">{visa.subtitle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <span className="block text-xs text-muted-foreground">Cost</span>
                      <span className="text-xs font-medium text-foreground">{visa.typicalCost}</span>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <span className="block text-xs text-muted-foreground">Time</span>
                      <span className="text-xs font-medium text-foreground">{visa.processingTime}</span>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <span className="block text-xs text-muted-foreground">Valid</span>
                      <span className="text-xs font-medium text-foreground">{visa.validity}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all mt-auto">
                    Read full guide <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="container pb-20">
          <div className="max-w-3xl mx-auto border border-border rounded-xl p-8 bg-card text-center">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Not sure which visa you need?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Your visa type depends on your role, company structure, and residency goals.
              Get personalised guidance from an advisor.
            </p>
            <Link
              to={lp("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Talk to an advisor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VisaHub;
