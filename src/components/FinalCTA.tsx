import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => (
  <section className="relative overflow-hidden py-24 md:py-32">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-primary" />
    <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

    <div className="container relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
          Get a personalised{" "}
          <span className="gradient-text">Setup Snapshot</span>
        </h2>
        <p className="text-primary-foreground/50 max-w-lg mx-auto mb-10 text-lg">
          Answer a few questions and get a structured view of what fits based on your activity, timeline, visa needs, and budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 rounded-full font-semibold shadow-xl shadow-accent/25 h-12"
          >
            Get Setup Snapshot
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/5 text-base px-8 rounded-full h-12"
          >
            Speak to an Agent
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;