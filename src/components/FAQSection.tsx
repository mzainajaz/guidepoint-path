import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is the best free zone in the UAE?",
    a: "There is no single best free zone for every business. The right choice depends on your activity, budget, visa needs, banking expectations, office requirements, and long-term operating plan.",
  },
  {
    q: "Is mainland better than free zone in the UAE?",
    a: "Not always. Mainland may be better for some business models, but many founders are better served by a simpler free zone route early on. The better option depends on fit, not status.",
  },
  {
    q: "How much does it cost to set up a company in the UAE?",
    a: "There is no one-size-fits-all number. Costs depend on jurisdiction, activity, visas, office requirements, support services, and renewal structure. Use our cost estimator for a tailored indicative breakdown.",
  },
  {
    q: "Can I choose a setup route based only on the cheapest package?",
    a: "That is usually risky. A lower headline package can still become more expensive if activity fit, visa needs, renewals, or practical operating requirements are not considered properly.",
  },
  {
    q: "Should I get a second opinion on a setup quote?",
    a: "Yes, especially if the quote feels unclear, too broad, overly sales-led, or missing detail around real first-year cost, renewals, approvals, and business fit.",
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
