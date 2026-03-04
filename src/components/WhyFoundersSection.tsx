import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const checkItems = [
  "Free zone vs mainland routes",
  "One free zone vs another",
  "Setup cost & renewal ranges",
  "Visa and quota implications",
  "Office & desk requirements",
  "Banking & KYC expectations",
  "Activity fit & approvals",
  "Relocation factors",
  "VAT & corporate tax basics",
];

const WhyFoundersSection = () => {
  const { t } = useLocale();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-100 pointer-events-none" />
      {/* Copper ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#C87941]/[0.04] blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="section-label block mb-6">Why us</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-light text-white mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
            >
              {t.whyFounders.title}{" "}
              <em className="not-italic gradient-text">{t.whyFounders.titleHighlight}</em>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5 text-[#b8b8b8] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}
            >
              <p>{t.whyFounders.p1}</p>
              <p>{t.whyFounders.p2}</p>
            </motion.div>
          </div>

          {/* Right: checklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-[#111111] border border-white/[0.07] p-8"
            style={{ borderRadius: "2px" }}
          >
            <p
              className="text-[#909090] text-[10px] font-medium tracking-[0.18em] uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Compare what actually matters
            </p>
            <ul className="space-y-3">
              {checkItems.map((item, i) => (
                <li key={item} className="flex items-center gap-3 group">
                  <div className="w-1 h-1 rounded-full bg-[#C87941] flex-shrink-0" />
                  <span
                    className="text-[#c8c8c8] text-sm group-hover:text-white/80 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyFoundersSection;
