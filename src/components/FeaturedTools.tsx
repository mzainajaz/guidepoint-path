import { Calculator, Search, FileCheck, BarChart3 } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Total Setup Cost Estimator",
    description: "Get an indicative cost breakdown for your specific setup — activity, visas, office, and banking included.",
    cta: "Estimate costs",
  },
  {
    icon: Search,
    title: "Free Zone Picker",
    description: "Answer a few questions and get matched with the free zones most likely to suit your needs.",
    cta: "Find your zone",
  },
  {
    icon: FileCheck,
    title: "VAT Decision Helper",
    description: "Understand whether you need to register for VAT and what the key thresholds and timelines are.",
    cta: "Check VAT status",
  },
  {
    icon: BarChart3,
    title: "Renewal Cost Forecaster",
    description: "See what your year-two and year-three costs are likely to look like beyond setup.",
    cta: "Forecast renewals",
  },
];

const FeaturedTools = () => (
  <section className="container py-20">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
        Tools that help you decide
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Interactive calculators and matchers, built on structured data and transparent methodology.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {tools.map((tool) => (
        <div
          key={tool.title}
          className="border border-border rounded-lg p-6 bg-card hover:border-accent/40 hover:shadow-md transition-all group cursor-pointer"
        >
          <tool.icon className="h-6 w-6 text-accent mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            {tool.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
          <span className="text-sm font-medium text-accent group-hover:underline">
            {tool.cta} →
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedTools;
