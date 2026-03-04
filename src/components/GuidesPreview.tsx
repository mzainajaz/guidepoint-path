import { Link } from "react-router-dom";
import { guideParts, guideChapters } from "@/data/setupGuides";
import { ArrowRight, BookOpen, Building2, Plane, Receipt, MapPin, Rocket, Layers, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Building2, Plane, Receipt, MapPin, Rocket, Layers, Landmark,
};

const GuidesPreview = () => (
  <section className="py-20 bg-secondary/30">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary/80 mb-2 block">
            <BookOpen className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
            Reference Library
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            UAE Setup Guides
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">
            {guideChapters.length} chapters across {guideParts.length} parts — from formation tracks to tax compliance.
          </p>
        </div>
        <Link
          to="/guides"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all guides <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {guideParts.slice(0, 4).map((part, i) => {
          const Icon = iconMap[part.icon] || Building2;
          const count = guideChapters.filter(c => c.partId === part.id).length;
          return (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to="/guides"
                className="block h-full bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  Part {part.number}: {part.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {part.description}
                </p>
                <span className="text-xs text-muted-foreground">{count} chapters</span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Link
        to="/guides"
        className="sm:hidden inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6"
      >
        View all guides <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default GuidesPreview;
