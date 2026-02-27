import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section className="bg-primary py-20">
    <div className="container text-center">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
        Get a personalised Setup Snapshot
      </h2>
      <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
        Answer a few questions and get a more structured view of what may fit based on your activity, timeline, visa needs, budget range, and banking expectations.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
          Get Setup Snapshot
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8"
        >
          Speak to an Agent
        </Button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
