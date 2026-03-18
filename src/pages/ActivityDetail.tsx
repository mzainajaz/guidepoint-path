import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { getActivityById, businessActivities, type BusinessActivity } from "@/data/businessActivities";
import { freeZones } from "@/data/freeZones";
import SEOHead, { breadcrumbSchema, faqSchema, articleSchema } from "@/components/SEOHead";
import { useT } from "@/i18n/context";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Briefcase,
  Megaphone,
  ShoppingCart,
  Code,
  Cloud,
  Package,
  User,
  Landmark,
  Film,
  Home,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ElementType> = {
  Briefcase, Megaphone, ShoppingCart, Code, Cloud, Package, User, Landmark, Film, Home,
};

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "who-its-for", label: "Who it's for" },
  { id: "activities", label: "Typical activities" },
  { id: "zone-fit", label: "Free zone fit" },
  { id: "mainland", label: "Mainland" },
  { id: "visas-banking", label: "Visas & banking" },
  { id: "costs", label: "Cost drivers" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "faq", label: "FAQ" },
];

const ActivityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const activity = slug ? getActivityById(slug) : undefined;
  const [activeSection, setActiveSection] = useState("overview");
  const t = useT();

  useEffect(() => {
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
  }, [activity]);

  if (!activity) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Activity Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find details for this activity.</p>
          <Button asChild><Link to="/activities">Browse all Activities</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[activity.icon] || Briefcase;
  const relatedActivities = activity.relatedActivities
    .map((id) => businessActivities.find((a) => a.id === id))
    .filter(Boolean) as BusinessActivity[];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={activity.meta.title}
        description={activity.meta.description}
        type="article"
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Business Activities", url: "/activities" },
            { name: activity.shortName, url: `/activities/${activity.id}` },
          ]),
          faqSchema(activity.faqs),
          articleSchema({
            title: activity.meta.title,
            description: activity.meta.description,
            url: `/activities/${activity.id}`,
            dateModified: activity.lastChecked,
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
            <Link to="/activities" className="hover:text-foreground transition-colors">Activities</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{activity.shortName}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="container pt-8 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-accent" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              {activity.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-3 mb-8">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Last checked: {activity.lastChecked}
            </span>
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Activity availability varies by zone
            </span>
          </div>

          <BestAnswerBlock
            title={`${activity.shortName} in the UAE`}
            content={activity.bestAnswer}
            audience={activity.idealFor}
            caution="Always verify activity availability, pricing, and requirements with the specific free zone or authority before proceeding."
          />
        </section>

        {/* CTAs */}
        <section className="container pb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">Request a Verified Quote</Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground">Speak to an Agent</Button>
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
              {/* Overview */}
              <section id="overview">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{activity.overview}</p>
              </section>

              {/* Who it's for */}
              <section id="who-its-for">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Who it's for</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-border rounded-lg p-5 bg-card">
                    <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Best for
                    </h3>
                    <ul className="space-y-2">
                      {activity.bestFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-success mt-1">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-border rounded-lg p-5 bg-card">
                    <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" /> Be cautious if
                    </h3>
                    <ul className="space-y-2">
                      {activity.cautiousIf.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-destructive mt-1">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Typical activities */}
              <section id="activities">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Typical activity descriptions</h2>
                <div className="flex flex-wrap gap-2">
                  {activity.typicalActivities.map((a) => (
                    <span key={a} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-md">{a}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Activity names may vary by zone. Always confirm the exact wording with the licensing authority.
                </p>
              </section>

              {/* Free zone fit */}
              <section id="zone-fit">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Free zone fit</h2>
                <div className="space-y-3">
                  {activity.freeZoneFit.map((fz) => {
                    const zoneData = freeZones.find((z) => z.id === fz.zoneId);
                    return (
                      <div key={fz.zoneId} className="border border-border rounded-lg p-4 bg-card flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{fz.zoneName}</h3>
                          <p className="text-sm text-muted-foreground">{fz.fitNote}</p>
                          {zoneData && (
                            <p className="text-xs text-muted-foreground mt-1">Starting from {zoneData.startingCost} · {zoneData.timeline}</p>
                          )}
                        </div>
                        {zoneData && (
                          <Button size="sm" variant="outline" className="text-xs shrink-0" asChild>
                            <Link to={`/free-zones/${fz.zoneId}`}>View zone <ArrowRight className="ml-1 h-3 w-3" /></Link>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Mainland */}
              <section id="mainland">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Mainland relevance</h2>
                <p className="text-muted-foreground leading-relaxed">{activity.mainlandRelevance}</p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link to="/mainland">Learn about mainland setup <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </section>

              {/* Visas & banking */}
              <section id="visas-banking">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Visa & banking notes</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">Visas</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activity.visaNotes}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">Banking & KYC</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activity.bankingNotes}</p>
                  </div>
                </div>
              </section>

              {/* Cost drivers */}
              <section id="costs">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Key cost drivers</h2>
                <ul className="space-y-2">
                  {activity.costDrivers.map((driver, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1 font-bold">→</span>{driver}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Common mistakes */}
              <section id="mistakes">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Common mistakes to avoid</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {activity.commonMistakes.map((mistake, i) => (
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
                  {activity.faqs.map((faq, i) => (
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

              {/* Related activities */}
              {relatedActivities.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Related activities</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {relatedActivities.map((rel) => {
                      const RelIcon = iconMap[rel.icon] || Briefcase;
                      return (
                        <Link
                          key={rel.id}
                          to={`/activities/${rel.id}`}
                          className="border border-border rounded-lg p-4 bg-card hover:border-accent/40 transition-all flex items-center gap-3"
                        >
                          <RelIcon className="h-5 w-5 text-accent shrink-0" />
                          <div>
                            <p className="font-medium text-foreground text-sm">{rel.shortName}</p>
                            <p className="text-xs text-muted-foreground">{rel.idealFor.split(",")[0]}</p>
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
                  <p className="font-medium text-foreground">Disclaimer</p>
                  <p>
                    This page is educational and not legal or tax advice. Fees, requirements, and authority policies can change. Always confirm the latest official requirements and get qualified advice for your specific situation.
                  </p>
                  <p><strong>Last checked:</strong> {activity.lastChecked}</p>
                </div>
              </section>

              {/* Final CTA */}
              <section className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Ready to set up your {activity.shortName.toLowerCase()} business?
                </h2>
                <p className="text-muted-foreground mb-5">
                  Get a personalised Setup Snapshot or request a verified quote matched to your activity, timeline, and visa needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">Request a Verified Quote</Button>
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

export default ActivityDetail;
