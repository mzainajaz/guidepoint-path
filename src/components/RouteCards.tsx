import { Link } from "react-router-dom";
import { Building2, Scale, Calculator, MessageSquareText, Plane, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const icons = [Building2, Scale, Calculator, MessageSquareText, Plane];
const hrefs = ["/free-zones", "/mainland", "/tools/cost-estimator", "/tools", "/relocation"];

const RouteCards = () => {
  const { t, lp } = useLocale();
  return (
    <section className="container py-24 md:py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Getting started</span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {t.routeCards.title} <span className="gradient-text">{t.routeCards.titleHighlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.routeCards.subtitle}</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {t.routeCards.items.map((route, i) => (
          <motion.div key={route.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
            <Link to={lp(hrefs[i])} className="card-modern group relative flex flex-col h-full p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/8 border border-accent/10 group-hover:bg-accent/15 group-hover:border-accent/25 transition-all">
                  {(() => { const Icon = icons[i]; return <Icon className="h-5 w-5 text-accent" />; })()}
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{route.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{route.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RouteCards;
