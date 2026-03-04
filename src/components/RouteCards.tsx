import { Link } from "react-router-dom";
import { Building2, Scale, Calculator, MessageSquareText, Plane, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

const icons = [Building2, Scale, Calculator, MessageSquareText, Plane];
const hrefs = ["/free-zones", "/mainland", "/tools/cost-estimator", "/tools", "/relocation"];

const RouteCards = () => {
  const { t, lp } = useLocale();
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-4">Getting started</span>
          <h2
            className="font-display font-light text-white mb-4 mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            {t.routeCards.title}{" "}
            <em className="not-italic gradient-text">{t.routeCards.titleHighlight}</em>
          </h2>
          <p
            className="text-[#a0a0a0] max-w-xl mx-auto text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.routeCards.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {t.routeCards.items.map((route, i) => (
            <motion.div
              key={route.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={lp(hrefs[i])}
                className="group relative flex flex-col h-full p-6 md:p-7 bg-[#111111] border border-white/[0.07] hover:border-[#C87941]/25 hover:bg-[#141414] transition-all duration-300"
                style={{ borderRadius: "2px" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center h-11 w-11 border border-white/[0.08] bg-white/[0.03] group-hover:border-[#C87941]/30 group-hover:bg-[#C87941]/[0.06] transition-all"
                    style={{ borderRadius: "2px" }}
                  >
                    {(() => {
                      const Icon = icons[i];
                      return <Icon className="h-4.5 w-4.5 text-[#C87941]" strokeWidth={1.5} size={18} />;
                    })()}
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-white/20 group-hover:text-[#c8c8c8] transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="font-display font-light text-white text-xl mb-2 group-hover:text-white transition-colors"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {route.title}
                </h3>
                <p
                  className="text-[13px] text-[#a0a0a0] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {route.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RouteCards;
