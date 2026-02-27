import { AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mistakes = [
  {
    title: "Choosing a free zone based on cost alone",
    content:
      "The cheapest option often lacks the activity coverage, banking support, or visa capacity you need. Evaluate the full picture before committing.",
  },
  {
    title: "Not checking banking and KYC realities",
    content:
      "Some free zones have weaker banking relationships. Opening a business account can take weeks — or fail entirely — if your jurisdiction or activity raises compliance flags.",
  },
  {
    title: "Ignoring renewal costs",
    content:
      "Year-one setup pricing often excludes visa renewals, licence renewals, office renewals, and compliance obligations. Budget for the full lifecycle.",
  },
  {
    title: "Skipping the activity-licence match",
    content:
      "Not all business activities are available in every jurisdiction. Mismatching your activity to the wrong free zone can require re-setup.",
  },
  {
    title: "Trusting a single advisor without comparison",
    content:
      "Advisors often recommend routes they're most commercially aligned with. Always compare at least two independent assessments.",
  },
];

const MistakesPrevention = () => (
  <section className="container py-20">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="h-6 w-6 text-caution" />
        <h2 className="font-display text-3xl font-semibold text-foreground">
          Common founder mistakes
        </h2>
      </div>
      <p className="text-muted-foreground mb-8">
        These are the pitfalls we see most often. Understanding them early can save you thousands and months.
      </p>
      <Accordion type="single" collapsible className="space-y-2">
        {mistakes.map((mistake, i) => (
          <AccordionItem
            key={i}
            value={`mistake-${i}`}
            className="border border-border rounded-lg px-5"
          >
            <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
              {mistake.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {mistake.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default MistakesPrevention;
