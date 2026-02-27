import { Building, Landmark, Users } from "lucide-react";

const paths = [
  {
    icon: Building,
    label: "Free Zone",
    tagline: "100% ownership, tax-efficient, specific activities",
    points: [
      "Full foreign ownership",
      "Simplified setup process",
      "Ideal for service, consulting, tech, e-commerce",
      "Limited mainland trading without distribution licence",
    ],
  },
  {
    icon: Landmark,
    label: "Mainland",
    tagline: "Trade freely across the UAE with full market access",
    points: [
      "Access to government contracts",
      "No restrictions on trading within the UAE",
      "Requires office / Ejari",
      "More compliance and licensing steps",
    ],
  },
  {
    icon: Users,
    label: "CSP / Managed Route",
    tagline: "Guided setup with a Corporate Service Provider",
    points: [
      "End-to-end setup management",
      "Good for founders unfamiliar with the process",
      "Higher setup cost but lower effort",
      "Important to verify value vs DIY route",
    ],
  },
];

const SetupPathsOverview = () => (
  <section className="bg-secondary py-20">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Three main setup routes
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Every UAE business setup falls into one of these paths. Understanding the trade-offs early saves time and money.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((path) => (
          <div key={path.label} className="bg-card border border-border rounded-lg p-6">
            <path.icon className="h-7 w-7 text-accent mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-1">{path.label}</h3>
            <p className="text-sm text-muted-foreground mb-4">{path.tagline}</p>
            <ul className="space-y-2">
              {path.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SetupPathsOverview;
