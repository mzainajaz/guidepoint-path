import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const FinalCTA = () => {
  const { t, lp } = useLocale();
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/images/section-mainland.jpg" alt="Dubai business district" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0B1628]/92" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-400/8 blur-[130px] pointer-events-none" />
      </div>
      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            {t.finalCta.title}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
              {t.finalCta.titleHighlight}
            </span>
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-10 text-lg">{t.finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-gray-900 hover:bg-amber-300 text-base px-8 rounded-full font-bold shadow-xl shadow-amber-400/25 h-13 group transition-all"
            >
              <Link to={lp("/tools/cost-estimator")}>
                {t.finalCta.cta1}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 text-base px-8 rounded-full h-13 backdrop-blur-sm font-medium transition-all"
            >
              <Link to={lp("/tools")}>{t.finalCta.cta2}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
