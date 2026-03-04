import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const FAQSection = () => {
  const { t } = useLocale();
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="badge-gold mb-4">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
              {t.faq.title}{" "}
              <span className="gradient-text">{t.faq.titleHighlight}</span>
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2.5">
            {t.faq.items.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <AccordionItem value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-white shadow-sm hover:shadow-md hover:border-amber-400/30 transition-all">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 hover:text-[#111D3C]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
