import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const WhyFoundersSection = () => {
  const { t } = useLocale();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 dot-pattern opacity-[0.02]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-5">Why us</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-8">
            {t.whyFounders.title}{" "}<span className="gradient-text">{t.whyFounders.titleHighlight}</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-5 text-primary-foreground/55 leading-relaxed text-lg">
            <p>{t.whyFounders.p1}</p>
            <p>{t.whyFounders.p2}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyFoundersSection;
