import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const HeroSection = () => {
  const { t, lp } = useLocale();

  return (
    <section
      className="relative overflow-hidden bg-[#0a0a0a]"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Video background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.55 }}
          poster="/images/hero-dubai.jpg"
        >
          <source src="/videos/dubai-hero.mp4" type="video/mp4" />
          <source src="/videos/dubai-alt.mp4" type="video/mp4" />
          <img src="/images/hero-dubai.jpg" alt="Dubai skyline" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </video>
        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.9) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 50%, rgba(10,10,10,0.4) 100%)" }} />
      </div>

      {/* Content — fixed top padding for header, then centered */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
          paddingBottom: "40px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "800px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 16px",
              background: "rgba(200,121,65,0.15)",
              border: "1px solid rgba(200,121,65,0.35)",
              borderRadius: "9999px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#D4924F",
              marginBottom: "32px",
            }}
          >
            UAE Business Setup Guide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 6.5vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "24px",
            }}
          >
            {t.hero.titlePart1}{" "}
            <span style={{ background: "linear-gradient(135deg, #C87941, #E8A85A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.0625rem",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#c8c8c8",
              maxWidth: "520px",
              marginBottom: "40px",
            }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}
          >
            <Link
              to={lp("/tools/cost-estimator")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "#ffffff",
                color: "#0a0a0a",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {t.hero.cta1} <ArrowRight size={14} />
            </Link>
            <Link
              to={lp("/tools")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "transparent",
                color: "#e0e0e0",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {t.hero.cta2}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap", justifyContent: "center" }}
          >
            {t.hero.stats.map((stat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#ffffff" }}>
                  {stat.value}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888888", marginTop: "4px" }}>
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
        style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "32px", gap: "8px" }}
      >
        <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.2)" }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
