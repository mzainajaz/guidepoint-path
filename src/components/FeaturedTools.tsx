import { Calculator, Search, FileCheck, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const icons = [Calculator, Search, FileCheck, BarChart3];
const toolHrefs = ["/tools/cost-estimator", "/tools/zone-picker", "/tools/vat-helper", "/tools"];

const FeaturedTools = () => {
  const { t, lp } = useLocale();
  return (
    <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="badge-gold mb-4">Interactive</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 mt-4">
            {t.featuredTools.title}{" "}
            <span className="gradient-text">{t.featuredTools.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.featuredTools.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {t.featuredTools.tools.map((tool, i) => (
            <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={lp(toolHrefs[i])} className="group flex flex-col h-full p-7 bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-amber-400/40 transition-all duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-50 border border-amber-200 group-hover:bg-amber-100 group-hover:border-amber-300 transition-all mb-5">
                  {(() => { const Icon = icons[i]; return <Icon className="h-5 w-5 text-amber-600" />; })()}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{tool.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#111D3C] group-hover:gap-2.5 transition-all">
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
