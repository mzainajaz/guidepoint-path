import { BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const MethodologyTeaser = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 mx-auto mb-5">
            <BookOpen className="h-6 w-6 text-accent" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How we <span className="gradient-text">compare</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
            We compare setup routes using practical factors: business activity fit, visa needs, banking realities,
            office expectations, flexibility, speed, and total cost visibility.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            "Criteria-driven with visible weighting",
            "Official sources cited",
            "Last-checked dates on all data",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 px-5 py-4 rounded-xl border border-border bg-card text-left"
            >
              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
              <p className="text-sm font-medium text-foreground">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MethodologyTeaser;