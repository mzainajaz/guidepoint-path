import { Shield, User, AlertTriangle, Eye, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const icons = [User, Eye, AlertTriangle, Shield, MessageSquare];

const TrustStrip = () => {
  const { t } = useLocale();
  return (
    <section className="py-10 md:py-14 border-y border-border/60 bg-gradient-to-b from-secondary/40 to-background relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-0">
          {t.trustStrip.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="group flex flex-col items-center lg:items-start gap-3 px-2 md:px-4 relative"
              >
                {/* Divider line between items on desktop */}
                {i > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-border/50" />
                )}

                {/* Icon + title row */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full border border-accent/20 bg-accent/5 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors duration-300">
                    <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                  </div>
                  <h3 className="text-[13px] font-semibold tracking-tight text-foreground font-display">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-muted-foreground text-center lg:text-left max-w-[220px]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
