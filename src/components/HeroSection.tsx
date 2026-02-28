import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";
import heroBg from "@/assets/hero-dubai.webp";

const HeroSection = () => {
  const { t, lp } = useLocale();

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Dubai business district skyline" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />
      </div>
      <div className="hero-glow -top-48 -right-48 animate-pulse-glow" />
      <div className="hero-glow -bottom-32 -left-32 animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="max-w-3xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-primary-foreground/70 tracking-wide uppercase">{t.hero.badge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-primary-foreground leading-[1.08] tracking-tight">
            {t.hero.titlePart1}{" "}<span className="gradient-text">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 rounded-full font-semibold shadow-xl shadow-accent/25 h-12">
              <Link to={lp("/tools/cost-estimator")}>{t.hero.cta1}<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/5 text-base px-8 rounded-full h-12 backdrop-blur-sm">
              <Link to={lp("/tools")}>{t.hero.cta2}</Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-8 md:gap-12 pt-4">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
