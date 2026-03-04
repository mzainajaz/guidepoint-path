import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const FinalCTA = () => {
  const { t, lp } = useLocale();
  return (
    <section className="relative overflow-hidden py-28 md:py-40 bg-[#0a0a0a]">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/section-mainland.jpg"
          alt="Dubai business district"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#C87941]/[0.05] blur-[140px] pointer-events-none" />
      </div>

      {/* Thin horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[700px] mx-auto"
        >
          <span className="section-label block mb-8">Ready to begin</span>
          <h2
            className="font-display font-light text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            {t.finalCta.title}{" "}
            <em className="not-italic gradient-text">{t.finalCta.titleHighlight}</em>
          </h2>
          <p
            className="text-[#a0a0a0] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: "1.75" }}
          >
            {t.finalCta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={lp("/tools/cost-estimator")}
              className="btn-primary"
            >
              {t.finalCta.cta1} <ArrowRight size={14} />
            </Link>
            <Link
              to={lp("/tools")}
              className="btn-secondary"
            >
              {t.finalCta.cta2}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
