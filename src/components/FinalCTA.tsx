import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const FinalCTA = () => {
  const { t, lp } = useLocale();
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-primary" />
      <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
            {t.finalCta.title}{" "}<span className="gradient-text">{t.finalCta.titleHighlight}</span>
          </h2>
          <p className="text-primary-foreground/50 max-w-lg mx-auto mb-10 text-lg">{t.finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 rounded-full font-semibold shadow-xl shadow-accent/25 h-12">
              <Link to={lp("/tools/cost-estimator")}>{t.finalCta.cta1}<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/5 text-base px-8 rounded-full h-12">
              <Link to={lp("/tools")}>{t.finalCta.cta2}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
