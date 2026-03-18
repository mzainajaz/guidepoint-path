import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ChevronRight, Clock, CreditCard, CalendarDays } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema, faqSchema } from "@/components/SEOHead";
import { useLocalePath } from "@/i18n/context";
import { visaGuides } from "@/data/visaGuides";

const VisaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalePath();
  const visa = visaGuides.find((v) => v.id === slug);

  if (!visa) return <Navigate to="/visas" replace />;

  return (
    <>
      <SEOHead
        title={visa.metaTitle}
        description={visa.metaDescription}
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Visa Guide", url: "/visas" },
            { name: visa.title, url: `/visas/${visa.id}` },
          ]),
          faqSchema(visa.faqs),
        ]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <Link to={lp("/visas")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Visa Guide
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{visa.title}</h1>
          <p className="text-muted-foreground text-lg mb-8">{visa.subtitle}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: CreditCard, label: "Typical cost", value: visa.typicalCost },
              { icon: Clock, label: "Processing", value: visa.processingTime },
              { icon: CalendarDays, label: "Validity", value: visa.validity },
            ].map((s) => (
              <div key={s.label} className="border border-border rounded-lg p-4 bg-card text-center">
                <s.icon className="h-4 w-4 text-accent mx-auto mb-1" />
                <span className="block text-xs text-muted-foreground">{s.label}</span>
                <span className="block text-sm font-semibold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{visa.overview}</p>
          </section>

          {/* Who is this for */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Who this is for</h2>
            <ul className="space-y-2">
              {visa.whoIsFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Requirements</h2>
            <div className="border border-border rounded-lg bg-card p-5">
              <ul className="space-y-2">
                {visa.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Step by step */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Process — step by step</h2>
            <div className="space-y-4">
              {visa.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent shrink-0">
                      {i + 1}
                    </div>
                    {i < visa.steps.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cautions */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Key cautions</h2>
            <div className="space-y-3">
              {visa.cautions.map((c) => (
                <div key={c} className="flex items-start gap-2 text-sm text-muted-foreground border border-border rounded-lg p-4 bg-card">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  {c}
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              {visa.faqs.map((faq, i) => (
                <details key={i} className="border border-border rounded-lg bg-card group">
                  <summary className="px-5 py-4 text-sm font-medium text-foreground cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Related</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {visa.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  to={lp(link.href)}
                  className="flex items-center gap-2 border border-border rounded-lg p-3 bg-card hover:border-accent/40 transition-all text-sm text-foreground group"
                >
                  <span className="flex-1">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <div className="border border-border rounded-xl p-6 bg-secondary/30 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This guide is educational only. Visa requirements and fees are subject to change.
              Always verify current information with the relevant authority or a licensed immigration advisor.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VisaDetail;
