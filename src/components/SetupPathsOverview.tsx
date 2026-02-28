import { Building, Landmark, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    href: "/free-zones",
    accent: "bg-emerald-500/10 text-emerald-600",
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
    href: "/mainland",
    accent: "bg-blue-500/10 text-blue-600",
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
    href: "/compare",
    accent: "bg-purple-500/10 text-purple-600",
  },
];

const SetupPathsOverview = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Three main <span className="gradient-text">setup routes</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Every UAE business setup falls into one of these paths. Understanding the trade-offs early saves time and money.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {paths.map((path, i) => (
          <motion.div
            key={path.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={path.href}
              className="group flex flex-col h-full bg-card border border-border rounded-2xl p-7 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${path.accent} mb-5`}>
                <path.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">{path.label}</h3>
              <p className="text-sm text-muted-foreground mb-5">{path.tagline}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {path.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SetupPathsOverview;