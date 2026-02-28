import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const CompareListSection = () => {
  const { t } = useLocale();
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t.compareList.title} <span className="gradient-text">{t.compareList.titleHighlight}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {t.compareList.items.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 px-5 py-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareListSection;
