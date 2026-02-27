import { CheckCircle } from "lucide-react";

const items = [
  "Free zone vs mainland routes",
  "One free zone vs another free zone",
  "Setup cost ranges and renewal considerations",
  "Visa and quota implications",
  "Office and desk requirements",
  "Banking and KYC expectations",
  "Activity fit and approval complexity",
  "Founder relocation factors",
  "VAT and corporate tax basics",
];

const CompareListSection = () => (
  <section className="bg-secondary py-20">
    <div className="container">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">
          Compare what actually matters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CompareListSection;
