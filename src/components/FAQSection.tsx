import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const FAQSection = () => {
  const { t } = useLocale();
  return (
    <section className="py-24 md:py-32 bg-[#0f0f0f]">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-label block mb-4">FAQ</span>
            <h2
              className="font-display font-light text-white mt-2"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
            >
              {t.faq.title}{" "}
              <em className="not-italic gradient-text">{t.faq.titleHighlight}</em>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-0">
            {t.faq.items.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="border-b border-white/[0.06] last:border-b-0"
                >
                  <AccordionTrigger
                    className="text-left font-display font-light text-white hover:no-underline py-5 hover:text-white/80 text-lg"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-[#a0a0a0] pb-5 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                  >
                    {faq.a}
                  </AccordionContent>
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
