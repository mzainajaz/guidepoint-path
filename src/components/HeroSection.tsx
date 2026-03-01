import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";
import heroBg from "@/assets/hero-dubai.webp";

const HeroSection = () => {
  const { t, lp } = useLocale();

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Dubai business district skyline" className="w-full h-full object-cover scale-105" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/97 via-primary/90 to-[hsl(200_50%_10%/0.80)]" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
      </div>

      {/* Animated accent blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-pulse-glow" />
      <div className="absolute -bottom-48 -left-24 w-[400px] h-[400px] rounded-full bg-[hsl(190_95%_39%/0.06)] blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-3xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.08] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-accent tracking-wide uppercase">{t.hero.badge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-primary-foreground leading-[1.08] tracking-tight">
            {t.hero.titlePart1}{" "}<span className="gradient-text">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/55 leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 rounded-full font-semibold shadow-xl shadow-accent/25 h-13 relative overflow-hidden group">
              <Link to={lp("/tools/cost-estimator")}>
                <span className="relative z-10 flex items-center">{t.hero.cta1}<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-[hsl(190_95%_39%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border border-accent/25 bg-accent/[0.08] text-accent hover:bg-accent/15 hover:border-accent/40 text-base px-8 rounded-full h-13 backdrop-blur-sm font-medium transition-all">
              <Link to={lp("/tools")}>{t.hero.cta2}</Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-10 md:gap-14 pt-6">
            {t.hero.stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && <div className="absolute -left-5 md:-left-7 top-1 bottom-1 w-px bg-primary-foreground/10" />}
                <div className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/35 mt-1.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <ChevronDown className="h-5 w-5 text-primary-foreground/20 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
