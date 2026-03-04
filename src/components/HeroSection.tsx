import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const HeroSection = () => {
  const { t, lp } = useLocale();

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col">
      {/* ── Background: Dubai image + navy overlay ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-dubai.jpg"
          alt="Dubai skyline at golden hour"
          className="w-full h-full object-cover object-center"
        />
        {/* Deep navy gradient — guarantees text legibility at all viewports */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628]/88 via-[#0B1628]/72 to-[#0B1628]/92" />
        {/* Warm gold ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full bg-amber-400/8 blur-[130px] pointer-events-none" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center container py-32 md:py-40">
        <div className="max-w-2xl space-y-7">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 backdrop-blur-md"
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-semibold text-amber-300 tracking-[0.12em] uppercase">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold text-white leading-[1.06] tracking-[-0.02em]"
          >
            {t.hero.titlePart1}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 pt-1"
          >
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-gray-900 hover:bg-amber-300 text-sm px-7 rounded-full font-bold h-12 shadow-lg shadow-amber-400/25 transition-all duration-200 group"
            >
              <Link to={lp("/tools/cost-estimator")}>
                {t.hero.cta1}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white/25 bg-white/[0.08] text-white hover:bg-white/[0.15] hover:border-white/40 text-sm px-7 rounded-full h-12 backdrop-blur-sm font-medium transition-all duration-200"
            >
              <Link to={lp("/tools")}>{t.hero.cta2}</Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="flex gap-8 md:gap-12 pt-5 border-t border-white/10"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-amber-400 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-white/45 mt-1 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 flex flex-col items-center pb-8 gap-1.5"
      >
        <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase font-medium">Scroll</span>
        <ChevronDown className="h-4 w-4 text-white/30 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
