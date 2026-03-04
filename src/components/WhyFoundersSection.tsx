import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";
import { CheckCircle2 } from "lucide-react";

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#111D3C]">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
      {/* Gold ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-6">
                Why us
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
            >
              {t.whyFounders.title}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                {t.whyFounders.titleHighlight}
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5 text-white/75 leading-relaxed text-lg"
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
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">Compare what actually matters</p>
            <ul className="space-y-3">
              {checkItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
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
