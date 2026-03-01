import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { businessActivities } from "@/data/businessActivities";
import {
  ChevronRight,
  ArrowRight,
  Briefcase,
  Megaphone,
  ShoppingCart,
  Code,
  Cloud,
  Package,
  User,
  Landmark,
  Film,
  Home,
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Megaphone,
  ShoppingCart,
  Code,
  Cloud,
  Package,
  User,
  Landmark,
  Film,
  Home,
};

const ActivitiesIndex = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="UAE Business Activities — Find the Right Licence"
      description="Browse UAE business activities to find the right licence type, free zone, and setup route. Each guide covers costs, timelines, and common mistakes."
      schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Business Activities", url: "/activities" }])]}
    />
    <Header />
    <main>
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Business Activities</span>
        </nav>
      </div>

      {/* Header */}
      <section className="container py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          UAE Business Activities: find the right licence for what you actually do
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Your business activity determines your licence type, which zones you can use, what approvals you need, and how banks assess your application. Getting it right from the start avoids costly changes later.
        </p>

        <BestAnswerBlock
          title="How to use this library"
          content="Start with the activity that best matches your business model. Each page explains which free zones support it, what the realistic cost and timeline look like, and the common mistakes founders make when licensing this activity. If your business spans multiple activities, start with your primary revenue driver."
          audience="Founders choosing a business activity for their UAE licence application."
          caution="Activity availability varies by zone and can change. Always confirm with the authority before proceeding."
        />
      </section>

      {/* Activity cards grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businessActivities.map((activity) => {
            const Icon = iconMap[activity.icon] || Briefcase;
            return (
              <article
                key={activity.id}
                className="border border-border rounded-lg bg-card hover:border-accent/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="p-6 flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                      {activity.shortName}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.idealFor}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activity.freeZoneFit.slice(0, 3).map((fz) => (
                      <span key={fz.zoneId} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                        {fz.zoneName}
                      </span>
                    ))}
                    {activity.freeZoneFit.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{activity.freeZoneFit.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link to={`/activities/${activity.id}`}>
                      View guide <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            Not sure which activity fits?
          </h2>
          <p className="text-muted-foreground mb-5">
            Get a Setup Snapshot and we'll help match your business model to the right activity, zone, and licence type.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Setup Snapshot <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container pb-16">
        <div className="border-t border-border pt-8">
          <div className="max-w-2xl space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">How this library works</p>
            <p>
              Activity guides are compiled from official authority sources and verified periodically. Activity availability, pricing, and requirements can vary by zone and change over time.
            </p>
            <p className="text-xs">
              This page is educational and not legal or tax advice. Always confirm the latest official requirements and get qualified advice for your specific situation.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ActivitiesIndex;
