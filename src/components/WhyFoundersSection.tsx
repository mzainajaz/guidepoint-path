import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const WhyFoundersSection = () => {
  const { t } = useLocale();
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.whyFounders.title}{" "}<span className="gradient-text">{t.whyFounders.titleHighlight}</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>{t.whyFounders.p1}</p>
            <p>{t.whyFounders.p2}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyFoundersSection;
