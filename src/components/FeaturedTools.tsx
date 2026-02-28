import { Calculator, Search, FileCheck, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const icons = [Calculator, Search, FileCheck, BarChart3];
const toolHrefs = ["/tools/cost-estimator", "/tools/zone-picker", "/tools/vat-helper", "/tools"];

const FeaturedTools = () => {
  const { t, lp } = useLocale();
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.featuredTools.title} <span className="gradient-text">{t.featuredTools.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.featuredTools.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {t.featuredTools.tools.map((tool, i) => (
            <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={lp(toolHrefs[i])} className="group flex flex-col h-full border border-border rounded-2xl p-7 bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors mb-5">
                  {(() => { const Icon = icons[i]; return <Icon className="h-5 w-5 text-accent" />; })()}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{tool.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                  {tool.cta} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
