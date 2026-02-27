import { Shield, User, AlertTriangle, Eye, MessageSquare } from "lucide-react";

const trustItems = [
  {
    icon: User,
    title: "Priority Handling",
    description: "Your request is reviewed by the right advisor first — not dropped into a generic queue.",
  },
  {
    icon: Eye,
    title: "Personalised Snapshot",
    description: "Get a tailored view of whether a direct free zone route or CSP-led route may fit better.",
  },
  {
    icon: AlertTriangle,
    title: "Mistake Prevention",
    description: "We flag common setup pitfalls early so you can avoid delays, rework, and unnecessary costs.",
  },
  {
    icon: Shield,
    title: "Advisor Bias Shield",
    description: "Our review framework challenges inflated quotes, weak-fit recommendations, and missing trade-offs.",
  },
  {
    icon: MessageSquare,
    title: "Second-Opinion Ready",
    description: "Already received advice or a quote? We can pressure-test it before you commit.",
  },
];

const TrustStrip = () => (
  <section className="bg-secondary py-16">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {trustItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <item.icon className="h-5 w-5 text-accent flex-shrink-0" />
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
