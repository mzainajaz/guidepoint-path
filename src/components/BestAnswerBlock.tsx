import { Lightbulb } from "lucide-react";

interface BestAnswerBlockProps {
  title: string;
  content: string;
  audience?: string;
  caution?: string;
}

const BestAnswerBlock = ({ title, content, audience, caution }: BestAnswerBlockProps) => (
  <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
        {audience && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Who this is for:</span> {audience}
          </p>
        )}
        {caution && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Key caution:</span> {caution}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default BestAnswerBlock;
