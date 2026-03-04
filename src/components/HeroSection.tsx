import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";
import { useRef, useEffect } from "react";

const HeroSection = () => {
  const { t, lp } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/videos/dubai-hero-poster.jpg"
        >
          <source src="/videos/dubai-hero.mp4" type="video/mp4" />
          <source src="/videos/dubai-alt.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer gradient overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-32 md:py-40">
        <div className="max-w-2xl space-y-7">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-white/80 tracking-[0.12em] uppercase">
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
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                {t.hero.titleHighlight}
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base md:text-lg text-white/65 leading-relaxed max-w-lg font-light"
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
              className="bg-emerald-400 text-black hover:bg-emerald-300 text-sm px-7 rounded-full font-semibold h-12 shadow-lg shadow-emerald-500/20 transition-all duration-200 group"
            >
              <Link to={lp("/tools/cost-estimator")}>
                {t.hero.cta1}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.12] hover:border-white/30 text-sm px-7 rounded-full h-12 backdrop-blur-sm font-medium transition-all duration-200"
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
            {t.hero.stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-white/40 mt-1 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-white/25 tracking-[0.15em] uppercase font-medium">Scroll</span>
        <ChevronDown className="h-4 w-4 text-white/25 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
