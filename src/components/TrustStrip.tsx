import { Shield, User, AlertTriangle, Eye, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: User, title: "Priority Handling", description: "Your request is reviewed by the right advisor first." },
  { icon: Eye, title: "Personalised Snapshot", description: "Tailored view of the best setup route for you." },
  { icon: AlertTriangle, title: "Mistake Prevention", description: "We flag common pitfalls before they cost you." },
  { icon: Shield, title: "Bias Shield", description: "We challenge inflated quotes and weak-fit recommendations." },
  { icon: MessageSquare, title: "Second Opinion", description: "Already have a quote? We can pressure-test it." },
];

const TrustStrip = () => (
  <section className="py-16 md:py-20 border-b border-border">
    <div className="container">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
        {trustItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col gap-3 text-center lg:text-left"
          >
            <div className="flex items-center gap-2.5 justify-center lg:justify-start">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-accent/10">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;