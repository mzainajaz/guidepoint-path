import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const HeroSection = () => {
  const { t, lp } = useLocale();

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-35"
          poster="/images/hero-dubai.jpg"
        >
          <source src="/videos/dubai-hero.mp4" type="video/mp4" />
          <source src="/videos/dubai-alt.mp4" type="video/mp4" />
          <img
            src="/images/hero-dubai.jpg"
            alt="Dubai skyline"
            className="w-full h-full object-cover object-center"
          />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />
        {/* Ambient copper glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#C87941]/[0.05] blur-[140px] pointer-events-none" />
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-[860px] mx-auto flex flex-col items-center">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-pill mb-8"
          >
            UAE Business Setup Guide
          </motion.div>

          {/* Editorial headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-light text-white mb-6"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: "1.0",
              letterSpacing: "-0.03em",
            }}
          >
            {t.hero.titlePart1}{" "}
            <em className="not-italic" style={{ color: "#C87941" }}>
              {t.hero.titleHighlight}
            </em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-base lg:text-lg font-light leading-relaxed mb-10 max-w-[500px]"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em" }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to={lp("/tools/cost-estimator")}
              className="btn-primary"
            >
              {t.hero.cta1} <ArrowRight size={14} />
            </Link>
            <Link
              to={lp("/tools")}
              className="btn-secondary"
            >
              {t.hero.cta2}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-16 flex items-center gap-10 sm:gap-16"
          >
            {t.hero.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="font-display font-light text-white"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-white/30 text-[10px] font-medium tracking-[0.14em] uppercase mt-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 flex flex-col items-center pb-8 gap-2"
      >
        <div className="w-px h-10 bg-white/20" />
        <span
          className="text-white/25 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
