import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocale } from "@/i18n/context";

const MistakesPrevention = () => {
  const { t } = useLocale();
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-caution/10">
              <AlertTriangle className="h-5 w-5 text-caution" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t.mistakes.title}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground mb-8 text-lg">
            {t.mistakes.subtitle}
          </motion.p>
          <Accordion type="single" collapsible className="space-y-2">
            {t.mistakes.items.map((mistake, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <AccordionItem value={`mistake-${i}`} className="border border-border rounded-xl px-5 bg-card">
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
