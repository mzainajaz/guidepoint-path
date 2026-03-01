import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/i18n/context";

const CountryCards = () => {
  const { t, lp } = useLocale();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Relocation</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.countryCards.title} <span className="gradient-text">{t.countryCards.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.countryCards.subtitle}</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4">
          {t.countryCards.countries.map((country, i) => (
            <motion.div key={country.code} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={lp(`/relocation/${country.code}`)} className="card-modern group flex items-center gap-4 px-6 py-4 min-w-[200px]">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">{country.name}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent transition-colors ml-auto" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryCards;
