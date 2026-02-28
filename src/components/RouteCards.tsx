import { Link } from "react-router-dom";
import { Building2, Scale, Calculator, MessageSquareText, Plane, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const icons = [Building2, Scale, Calculator, MessageSquareText, Plane];
const hrefs = ["/free-zones", "/mainland", "/tools/cost-estimator", "/tools", "/relocation"];
const gradients = [
  "from-emerald-500/10 to-teal-500/10",
  "from-blue-500/10 to-indigo-500/10",
  "from-amber-500/10 to-orange-500/10",
  "from-purple-500/10 to-pink-500/10",
  "from-sky-500/10 to-cyan-500/10",
];

const RouteCards = () => {
  const { t, lp } = useLocale();
  return (
    <section className="container py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {t.routeCards.title} <span className="gradient-text">{t.routeCards.titleHighlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.routeCards.subtitle}</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {t.routeCards.items.map((route, i) => (
          <motion.div key={route.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
            <Link to={lp(hrefs[i])} className={`group relative flex flex-col h-full rounded-2xl border border-border p-6 md:p-7 bg-gradient-to-br ${gradients[i]} hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  {(() => { const Icon = icons[i]; return <Icon className="h-5 w-5 text-accent" />; })()}
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
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
