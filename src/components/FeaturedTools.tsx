import { Calculator, Search, FileCheck, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const icons = [Calculator, Search, FileCheck, BarChart3];
const toolHrefs = ["/tools/cost-estimator", "/tools/zone-picker", "/tools/vat-helper", "/tools"];

const FeaturedTools = () => {
  const { t, lp } = useLocale();
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-4">Interactive</span>
          <h2
            className="font-display font-light text-white mb-4 mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            {t.featuredTools.title}{" "}
            <em className="not-italic gradient-text">{t.featuredTools.titleHighlight}</em>
          </h2>
          <p
            className="text-[#a0a0a0] max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.featuredTools.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {t.featuredTools.tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={lp(toolHrefs[i])}
                className="group flex flex-col h-full p-7 bg-[#111111] border border-white/[0.07] hover:border-[#C87941]/25 hover:bg-[#141414] transition-all duration-300"
                style={{ borderRadius: "2px" }}
              >
                <div
                  className="flex items-center justify-center h-11 w-11 border border-white/[0.08] bg-white/[0.03] mb-5 group-hover:border-[#C87941]/30 group-hover:bg-[#C87941]/[0.06] transition-all"
                  style={{ borderRadius: "2px" }}
                >
                  {(() => {
                    const Icon = icons[i];
                    return <Icon className="h-5 w-5 text-[#C87941]" strokeWidth={1.5} />;
                  })()}
                </div>
                <h3
                  className="font-display font-light text-white text-xl mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {tool.title}
                </h3>
                <p
                  className="text-[13px] text-[#a0a0a0] leading-relaxed mb-5 flex-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {tool.description}
                </p>
                <div
                  className="flex items-center gap-1.5 text-[12px] font-medium text-[#a0a0a0] group-hover:text-[#d0d0d0] group-hover:gap-2.5 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {tool.cta} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
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
