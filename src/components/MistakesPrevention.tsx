import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocale } from "@/i18n/context";

const MistakesPrevention = () => {
  const { t } = useLocale();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary dot-pattern opacity-30" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-caution/10 border border-caution/15">
              <AlertTriangle className="h-5 w-5 text-caution" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t.mistakes.title}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground mb-10 text-lg">
            {t.mistakes.subtitle}
          </motion.p>
          <Accordion type="single" collapsible className="space-y-2.5">
            {t.mistakes.items.map((mistake, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <AccordionItem value={`mistake-${i}`} className="border border-border rounded-xl px-5 bg-card shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">{mistake.title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{mistake.content}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default MistakesPrevention;
