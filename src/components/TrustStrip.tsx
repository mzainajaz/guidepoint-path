import { Shield, User, AlertTriangle, Eye, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const icons = [User, Eye, AlertTriangle, Shield, MessageSquare];

const TrustStrip = () => {
  const { t } = useLocale();
  return (
    <section className="py-14 md:py-16 border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="container relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {t.trustStrip.items.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex flex-col gap-3 text-center lg:text-left">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-accent/8 border border-accent/10">
                  {(() => { const Icon = icons[i]; return <Icon className="h-4 w-4 text-accent" />; })()}
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
