import { Building, Landmark, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const icons = [Building, Landmark, Users];
const pathHrefs = ["/free-zones", "/mainland", "/compare"];

const SetupPathsOverview = () => {
  const { t, lp } = useLocale();
  return (
    <section className="py-24 md:py-32 bg-[#0f0f0f] relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-4">Setup routes</span>
          <h2
            className="font-display font-light text-white mb-4 mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            {t.setupPaths.title}{" "}
            <em className="not-italic gradient-text">{t.setupPaths.titleHighlight}</em>
          </h2>
          <p
            className="text-white/40 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.setupPaths.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.setupPaths.paths.map((path, i) => (
            <motion.div
              key={path.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={lp(pathHrefs[i])}
                className="group flex flex-col h-full p-7 bg-[#111111] border border-white/[0.07] hover:border-[#C87941]/25 hover:bg-[#141414] transition-all duration-300"
                style={{ borderRadius: "2px" }}
              >
                <div
                  className="flex items-center justify-center h-11 w-11 border border-white/[0.08] bg-white/[0.03] mb-6 group-hover:border-[#C87941]/30 group-hover:bg-[#C87941]/[0.06] transition-all"
                  style={{ borderRadius: "2px" }}
                >
                  {(() => {
                    const Icon = icons[i];
                    return <Icon className="h-5 w-5 text-[#C87941]" strokeWidth={1.5} />;
                  })()}
                </div>
                <h3
                  className="font-display font-light text-white text-2xl mb-1"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {path.label}
                </h3>
                <p
                  className="text-[13px] text-white/40 mb-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {path.tagline}
                </p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {path.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[13px] text-white/45"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div className="mt-1.5 h-1 w-1 rounded-full bg-[#C87941] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div
                  className="flex items-center gap-1.5 text-[12px] font-medium text-white/40 group-hover:text-white/70 group-hover:gap-2.5 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {t.common.learnMore} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
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
