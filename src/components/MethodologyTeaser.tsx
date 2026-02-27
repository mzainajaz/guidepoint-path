import { BookOpen, CheckCircle } from "lucide-react";

const MethodologyTeaser = () => (
  <section className="container py-20">
    <div className="max-w-3xl mx-auto text-center">
      <BookOpen className="h-8 w-8 text-accent mx-auto mb-4" />
      <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
        How we compare options
      </h2>
      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
        We compare setup routes using practical decision factors founders actually care about: business activity fit, visa needs, banking realities, office expectations, flexibility, speed, and total cost visibility. A lower headline fee does not always mean a better route.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        {[
          "Criteria-driven comparisons with visible weighting",
          "Official sources cited wherever available",
          "Last-checked dates on all pricing and data",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MethodologyTeaser;
