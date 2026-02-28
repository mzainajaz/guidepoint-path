import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const countries = [
  { name: "United Kingdom", code: "uk", flag: "🇬🇧" },
  { name: "United States", code: "us", flag: "🇺🇸" },
  { name: "India", code: "india", flag: "🇮🇳" },
  { name: "Egypt", code: "egypt", flag: "🇪🇬" },
  { name: "Europe", code: "europe", flag: "🇪🇺" },
];

const CountryCards = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Moving to the UAE <span className="gradient-text">from…</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Country-specific guides covering setup routes, banking, relocation, and common pitfalls.
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-4">
        {countries.map((country, i) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={`/relocation/${country.code}`}
              className="group flex items-center gap-4 bg-card border border-border rounded-2xl px-7 py-5 hover:border-accent/30 hover:shadow-lg transition-all duration-300 min-w-[200px]"
            >
              <span className="text-3xl">{country.flag}</span>
              <span className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                {country.name}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CountryCards;