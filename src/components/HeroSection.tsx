import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-dubai.webp";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Dubai business district skyline at golden hour"
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-primary/80" />
    </div>

    <div className="container relative z-10 py-24 md:py-32 lg:py-40">
      <div className="max-w-2xl space-y-6">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.1] text-balance animate-fade-in-up">
          The clearest path to setting up your business in the UAE
        </h1>
        <p
          className="text-lg md:text-xl text-primary-foreground/75 leading-relaxed max-w-xl animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Compare free zones, understand costs, avoid common mistakes — and get structured guidance before you commit.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-6">
            Get Setup Snapshot
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 text-base px-6"
          >
            Speak to an Agent
          </Button>
        </div>
        <a
          href="#compare"
          className="inline-block text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors underline underline-offset-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Or compare setup routes →
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
