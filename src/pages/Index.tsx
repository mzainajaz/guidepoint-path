import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import RouteCards from "@/components/RouteCards";
import SetupPathsOverview from "@/components/SetupPathsOverview";
import FeaturedTools from "@/components/FeaturedTools";
import CountryCards from "@/components/CountryCards";
import MistakesPrevention from "@/components/MistakesPrevention";
import MethodologyTeaser from "@/components/MethodologyTeaser";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />

    <main>
      <HeroSection />
      <TrustStrip />

      {/* Best Answer */}
      <section className="container py-16">
        <BestAnswerBlock
          title="What most founders need to know before choosing a UAE setup path"
          content="The right setup route depends on your business activity, visa needs, banking requirements, and whether you need to trade within the UAE mainland. Most founders benefit from comparing at least two free zones and understanding the mainland alternative before committing."
          audience="First-time founders, relocating entrepreneurs, e-commerce sellers, consultants, and service businesses exploring UAE incorporation."
          caution="The cheapest option is rarely the best fit. Always verify activity coverage, banking realities, and renewal costs before signing."
        />
      </section>

      <RouteCards />
      <SetupPathsOverview />
      <FeaturedTools />
      <MistakesPrevention />
      <CountryCards />
      <MethodologyTeaser />
      <FAQSection />
      <FinalCTA />
    </main>

    <Footer />
  </div>
);

export default Index;
