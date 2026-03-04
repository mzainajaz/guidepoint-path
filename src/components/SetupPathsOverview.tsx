import { Building, Landmark, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const icons = [Building, Landmark, Users];
const pathHrefs = ["/free-zones", "/mainland", "/compare"];

const SetupPathsOverview = () => {
  const { t, lp } = useLocale();
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="badge-gold mb-4">Setup routes</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 mt-4">
            {t.setupPaths.title}{" "}
            <span className="gradient-text">{t.setupPaths.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.setupPaths.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.setupPaths.paths.map((path, i) => (
            <motion.div key={path.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={lp(pathHrefs[i])} className="group flex flex-col h-full p-7 bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-[#111D3C]/20 transition-all duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#111D3C] mb-6 group-hover:bg-[#1a2d52] transition-all">
                  {(() => { const Icon = icons[i]; return <Icon className="h-6 w-6 text-amber-400" />; })()}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{path.label}</h3>
                <p className="text-sm text-muted-foreground mb-5">{path.tagline}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {path.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />{point}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#111D3C] group-hover:gap-2.5 transition-all">
                  {t.common.learnMore} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SetupPathsOverview;
