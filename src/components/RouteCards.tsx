import {
  Building2,
  Scale,
  Calculator,
  MessageSquareText,
  Plane,
  Rocket,
} from "lucide-react";

const routes = [
  {
    icon: Building2,
    title: "Compare Free Zones",
    description: "Browse and filter 40+ free zones by cost, activity, visa, and banking suitability.",
    href: "#free-zones",
  },
  {
    icon: Scale,
    title: "Explore Business Activities",
    description: "Find the right activity licence and understand which jurisdictions support it.",
    href: "#activities",
  },
  {
    icon: Calculator,
    title: "Estimate Total Costs",
    description: "Get an indicative setup cost breakdown based on your activity, visa, and office needs.",
    href: "#cost-estimator",
  },
  {
    icon: MessageSquareText,
    title: "Get a Second Opinion",
    description: "Already have a quote or advice? We'll pressure-test it before you commit.",
    href: "#second-opinion",
  },
  {
    icon: Plane,
    title: "Relocation Planning",
    description: "Banking, housing, schooling, visas — plan your move alongside your company setup.",
    href: "#relocation",
  },
  {
    icon: Rocket,
    title: "Startup Founders",
    description: "Why UAE for startups, founder resources, playbooks, and ecosystem overview.",
    href: "#startups",
  },
];

const RouteCards = () => (
  <section className="container py-20">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
        Where do you want to start?
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Choose a path based on what matters most to you right now.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {routes.map((route) => (
        <a
          key={route.title}
          href={route.href}
          className="group border border-border rounded-lg p-6 hover:border-accent/40 hover:shadow-md transition-all bg-card"
        >
          <route.icon className="h-6 w-6 text-accent mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            {route.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{route.description}</p>
        </a>
      ))}
    </div>
  </section>
);

export default RouteCards;
