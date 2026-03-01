import { BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const MethodologyTeaser = () => {
  const { t } = useLocale();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary dot-pattern opacity-30" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/8 border border-accent/10 mx-auto mb-5">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.methodology.title} <span className="gradient-text">{t.methodology.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">{t.methodology.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.methodology.items.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-modern flex items-center gap-3 px-5 py-4 text-left !rounded-xl">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <p className="text-sm font-medium text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologyTeaser;
