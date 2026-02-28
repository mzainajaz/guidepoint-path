import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mistakes = [
  {
    title: "Comparing only the headline package number",
    content: "The headline figure rarely tells the full story. Review office requirements, immigration steps, renewals, approvals, and practical setup support costs.",
  },
  {
    title: "Choosing a free zone based on cost alone",
    content: "A lower headline package can still become more expensive if activity fit, visa needs, renewals, or practical operating requirements are not considered properly.",
  },
  {
    title: "Not checking banking and KYC realities",
    content: "Some free zones have weaker banking relationships. Opening a business account can take weeks — or fail entirely — if your jurisdiction or activity raises compliance flags.",
  },
  {
    title: "Ignoring renewal costs and friction",
    content: "Some routes look acceptable in year one but become less attractive at renewal if office, visa, or admin needs grow. Budget for the full lifecycle, not just setup.",
  },
  {
    title: "Choosing a route before pressure-testing the activity",
    content: "The right route depends heavily on the actual activity being licensed, not just the founder's generic business description.",
  },
  {
    title: "Trusting a single advisor without comparison",
    content: "Advisors often recommend routes they are most commercially aligned with. Always compare at least two independent assessments before committing.",
  },
];

const MistakesPrevention = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-caution/10">
            <AlertTriangle className="h-5 w-5 text-caution" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Common mistakes
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8 text-lg"
        >
          These pitfalls cost founders thousands and months. Understand them early.
        </motion.p>
        <Accordion type="single" collapsible className="space-y-2">
          {mistakes.map((mistake, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem
                value={`mistake-${i}`}
                className="border border-border rounded-xl px-5 bg-card"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                  {mistake.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {mistake.content}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default MistakesPrevention;