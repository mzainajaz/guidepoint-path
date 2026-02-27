import { Link } from "react-router-dom";
import {
  Building2,
  Scale,
  Calculator,
  MessageSquareText,
  Plane,
} from "lucide-react";

const routes = [
  {
    icon: Building2,
    title: "Compare Free Zones",
    description: "Browse UAE free zones by business type, cost sensitivity, office needs, timeline, and visa requirements.",
    href: "/free-zones",
  },
  {
    icon: Scale,
    title: "Understand Mainland",
    description: "Learn when mainland setup may make more sense, what it usually involves, and where founders often get confused.",
    href: "/mainland",
  },
  {
    icon: Calculator,
    title: "Estimate Your Total Cost",
    description: "Use calculators to understand likely setup, visa, renewal, and related cost drivers before you move forward.",
    href: "#cost-estimator",
  },
  {
    icon: MessageSquareText,
    title: "Get a Second Opinion",
    description: "Already received a recommendation or quote? Get it reviewed for fit, hidden costs, and missing trade-offs.",
    href: "#second-opinion",
  },
  {
    icon: Plane,
    title: "Plan a Move to the UAE",
    description: "Explore relocation playbooks for founders moving from the UK, US, India, Egypt, or Europe.",
    href: "/relocation",
  },
];

const RouteCards = () => (
  <section className="container py-20">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
        Start with the route that matches your situation
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Different founders arrive with different priorities. Instead of forcing everyone through the same funnel, start with the path that matches your real situation.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {routes.map((route) => {
        const isInternal = route.href.startsWith("/");
        const Component = isInternal ? Link : "a";
        const linkProps = isInternal ? { to: route.href } : { href: route.href };
        return (
          <Component
            key={route.title}
            {...(linkProps as any)}
            className="group border border-border rounded-lg p-6 hover:border-accent/40 hover:shadow-md transition-all bg-card"
          >
            <route.icon className="h-6 w-6 text-accent mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
              {route.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{route.description}</p>
          </Component>
        );
      })}
    </div>
  </section>
);

export default RouteCards;
