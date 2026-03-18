import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";
import { useRef, useEffect, useState } from "react";

const AnimatedCounter = ({ value, delay = 0 }: { value: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");
    if (isNaN(numeric)) { setDisplayed(value); return; }

    const timeout = setTimeout(() => {
      const duration = 1800;
      const steps = 40;
      const stepTime = duration / steps;
      let current = 0;

      const interval = setInterval(() => {
        current++;
        const progress = current / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(eased * numeric);
        setDisplayed(val + suffix);
        if (current >= steps) clearInterval(interval);
      }, stepTime);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return <span ref={ref}>{displayed}</span>;
};

const charVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.035,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const AnimatedHeadline = ({ text, gradient = false }: { text: string; gradient?: boolean }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split("").map((char, ci) => {
            const globalIndex = words.slice(0, wi).join(" ").length + ci + wi;
            return (
              <motion.span
                key={ci}
                custom={globalIndex}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: "inline-block",
                  ...(gradient
                    ? {
                        background: "linear-gradient(135deg, #C87941, #E8A85A)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : { color: "#ffffff" }),
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
};

const HeroSection = () => {
  const { t, lp } = useLocale();

  return (
    <section
      className="relative overflow-hidden bg-[#0a0a0a]"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Video background */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.9) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 50%, rgba(10,10,10,0.4) 100%)" }} />
      </motion.div>

      {/* Floating accent shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, #C87941, transparent 70%)", filter: "blur(80px)", zIndex: 1 }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, #E8A85A, transparent 70%)", filter: "blur(60px)", zIndex: 1 }}
      />

      {/* Content */}
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

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px mb-8"
            style={{ background: "linear-gradient(90deg, transparent, #C87941, transparent)", transformOrigin: "center" }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{ delay: 0.6, duration: 1.2 }}
            >
              ●
            </motion.span>
            UAE Business Setup Guide
          </motion.div>

          {/* Headline — per-character kinetic animation */}
          <h1
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 6.5vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              perspective: "600px",
            }}
          >
            <AnimatedHeadline text={t.hero.titlePart1} />{" "}
            <AnimatedHeadline text={t.hero.titleHighlight} gradient />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
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
                }}
              >
                {t.hero.cta1} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
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
                }}
              >
                {t.hero.cta2}
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats with counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap", justifyContent: "center" }}
          >
            {t.hero.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#ffffff" }}>
                  <AnimatedCounter value={stat.value} delay={2300 + i * 150} />
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.8 + i * 0.15, duration: 0.5 }}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888888", marginTop: "4px" }}
                >
                  {stat.label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "32px", gap: "8px" }}
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.2)", transformOrigin: "top" }}
        />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
