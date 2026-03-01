import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

interface BestAnswerBlockProps {
  title: string;
  content: string;
  audience?: string;
  caution?: string;
}

const BestAnswerBlock = ({ title, content, audience, caution }: BestAnswerBlockProps) => {
  const { t } = useLocale();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="relative rounded-2xl p-6 md:p-8 border border-accent/15 bg-accent/[0.03] overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="relative flex items-start gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-accent/8 border border-accent/10 flex-shrink-0">
          <Lightbulb className="h-5 w-5 text-accent" />
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{content}</p>
          {audience && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.common.whoThisIsFor}</span> {audience}
            </p>
          )}
          {caution && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.common.keyCaution}</span> {caution}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BestAnswerBlock;
