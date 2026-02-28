import { motion } from "framer-motion";

const WhyFoundersSection = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
        >
          Built for founders who want{" "}
          <span className="gradient-text">clarity</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-5 text-muted-foreground leading-relaxed text-lg"
        >
          <p>
            Most business setup websites push a lead form quickly, hiding the real trade-offs.
            IncorporateUAE is designed differently.
          </p>
          <p>
            We help you understand what route fits, what changes costs, where banking or visa friction
            can appear, and when a cheaper setup becomes expensive later.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyFoundersSection;