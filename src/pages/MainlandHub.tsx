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
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MainlandHub = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="UAE Mainland Setup — DED Licensing, Ejari & Compliance"
      description="Complete guide to UAE mainland company setup. Covers DED licensing, Ejari requirements, local sponsor structures, and compliance obligations."
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Mainland", url: "/mainland" }])]}
    />
    <Header />
    <main>
      <div className="container pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Mainland</span>
        </nav>
      </div>

      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Mainland company setup in the UAE: who it suits, what it involves, and when it may make sense
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Mainland company setup in the UAE is often described in broad, oversimplified terms. In reality, it can be the right option for some founders and the wrong option for others. The best way to understand mainland is to ask what type of business you are building, how you expect to operate, and what constraints matter most.
        </p>
        <BestAnswerBlock
          title="Best answer"
          content="Mainland setup in the UAE may suit businesses that want broader operational flexibility, certain types of market access, or specific structures that are not as clean inside some free zone models. But it can also involve different practical requirements around licensing, office arrangements, approvals, compliance, and ongoing admin. For many founders, the decision only becomes clear after comparing mainland against a shortlist of realistic free zone alternatives."
          caution="A more complex route is not always a better route. Many businesses are better served by a simpler structure early on."
        />
      </section>

      {/* Quick Links to Subpages */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Explore mainland topics</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Licensing Basics", desc: "Licence types, fees, approval processes, and common mistakes", href: "/mainland/licensing" },
            { title: "Office & Ejari", desc: "Office requirements, Ejari registration, costs, and what qualifies", href: "/mainland/office-ejari" },
            { title: "Compliance Basics", desc: "Annual obligations, deadlines, penalties, and a first-year calendar", href: "/mainland/compliance" },
          ].map((card) => (
            <Link key={card.href} to={card.href} className="border border-border rounded-lg p-5 bg-card hover:border-accent/40 transition-colors group">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What mainland means */}
      <section className="container pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">What mainland setup usually means</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A mainland company is typically established under the relevant local licensing framework rather than inside a dedicated free zone ecosystem. For some businesses, that can open up practical advantages. For others, it can add complexity they do not actually need.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">Mainland is often considered by:</p>
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Businesses expecting a broader onshore operating footprint",
            "Founders who may need certain activity structures",
            "Teams planning physical presence or office expansion",
            "Businesses with specific commercial or contracting needs",
            "Operators who need a setup route not neatly served by a free zone package",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Who it suits / doesn't */}
      <section className="container pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Who mainland may suit
            </h3>
            <ul className="space-y-2">
              {[
                "Trading and operational businesses with broader UAE activity needs",
                "Businesses expecting local office presence from early stage",
                "Firms that want structure options beyond low-cost starter packages",
                "Operators who expect more complex staffing or commercial arrangements over time",
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
              When mainland may not be the cleanest route
            </h3>
            <ul className="space-y-2">
              {[
                "Solo founders, lean digital businesses, and remote-first operators often end up overbuilding too early",
                "If your goal is speed, capital efficiency, or a simpler entry route",
                "A well-chosen free zone may still be the better starting point",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cost drivers */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Common mainland cost drivers</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Mainland costs are rarely just one number. Founders should think in layers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Licence-related costs",
              "Activity-related approvals where applicable",
              "Office or tenancy-linked requirements",
              "Visa-related costs",
              "Establishment and immigration steps",
              "Renewal and compliance obligations",
            ].map((item) => (
              <div key={item} className="bg-card border border-border rounded-lg p-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6 italic">
            The important question is not only "What is the starting cost?" but also "What does the full first-year and renewal picture look like?"
          </p>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="container py-16">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-caution" />
          Common mistakes founders make with mainland setup
        </h2>
        <Accordion type="single" collapsible className="space-y-2 max-w-3xl">
          {[
            { title: "Comparing only the headline licence number", content: "The headline figure rarely tells the full story. Founders should review office-related requirements, immigration steps, renewals, approvals, and practical setup support costs." },
            { title: "Assuming mainland is automatically better for every serious business", content: "A more complex route is not always a better route. Many businesses are better served by a simpler structure early on." },
            { title: "Choosing a route before pressure-testing the activity", content: "The right route depends heavily on the actual activity being licensed, not just the founder's generic business description." },
            { title: "Ignoring renewal friction", content: "Some routes look acceptable in year one but become less attractive at renewal if office, visa, or admin needs grow." },
          ].map((mistake, i) => (
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

      {/* CTA */}
      <section className="container pb-16">
        <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            Compare mainland against realistic alternatives
          </h2>
          <p className="text-muted-foreground mb-6">
            Before choosing mainland, compare it against the free zones most likely to fit your activity, team structure, and operating model.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/compare/mainland-vs-free-zone">Compare mainland vs free zone</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default MainlandHub;
