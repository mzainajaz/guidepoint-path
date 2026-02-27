import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How much does it cost to set up a business in the UAE?",
    a: "Costs vary significantly depending on whether you choose a free zone or mainland route, and which specific jurisdiction. Typical starting costs range from AED 10,000 to AED 50,000+ for the first year, excluding visas, office, and banking. Use our cost estimator for a tailored indicative breakdown.",
  },
  {
    q: "Can I set up a UAE company remotely?",
    a: "Many free zones now support remote or digital incorporation. However, banking, visa, and Emirates ID processes typically require at least one visit. Plan for 1–2 trips in most cases.",
  },
  {
    q: "What is the difference between a free zone and mainland company?",
    a: "Free zone companies offer 100% foreign ownership and simplified setup, but are generally restricted to trading within their zone or internationally. Mainland companies can trade freely within the UAE but involve more compliance steps.",
  },
  {
    q: "Do I need a local sponsor or partner?",
    a: "Since the 2020 Commercial Companies Law reforms, most business activities allow 100% foreign ownership on the mainland. However, certain regulated activities may still require a local service agent. Free zones have always allowed 100% ownership.",
  },
  {
    q: "How long does the setup process take?",
    a: "Free zone setups can complete in 3–10 business days for the licence. Mainland setups typically take 2–4 weeks. Banking can add 2–8 weeks depending on the bank and your profile. Visa processing adds another 1–3 weeks.",
  },
  {
    q: "Is the UAE really tax-free?",
    a: "The UAE introduced a 9% corporate tax on profits exceeding AED 375,000 (effective June 2023). Free zone companies may qualify for a 0% rate on qualifying income. VAT at 5% applies to most goods and services. It's not tax-free — but it remains very tax-efficient compared to most jurisdictions.",
  },
];

const FAQSection = () => (
  <section className="container py-20">
    <div className="max-w-3xl mx-auto">
      <h2 className="font-display text-3xl font-semibold text-foreground mb-8 text-center">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-border rounded-lg px-5"
          >
            <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
