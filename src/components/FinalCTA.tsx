import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const FinalCTA = () => {
  const { t, lp } = useLocale();
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 dot-pattern opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.05] blur-[120px] animate-pulse-glow" />
      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
            {t.finalCta.title}{" "}<span className="gradient-text">{t.finalCta.titleHighlight}</span>
          </h2>
          <p className="text-primary-foreground/45 max-w-lg mx-auto mb-10 text-lg">{t.finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 rounded-full font-semibold shadow-xl shadow-accent/25 h-13 relative overflow-hidden group">
              <Link to={lp("/tools/cost-estimator")}>
                <span className="relative z-10 flex items-center">{t.finalCta.cta1}<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-[hsl(190_95%_39%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border border-accent/25 bg-accent/[0.08] text-accent hover:bg-accent/15 hover:border-accent/40 text-base px-8 rounded-full h-13 backdrop-blur-sm font-medium transition-all">
              <Link to={lp("/tools")}>{t.finalCta.cta2}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
