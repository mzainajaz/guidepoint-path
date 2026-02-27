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
import WhyFoundersSection from "@/components/WhyFoundersSection";
import CompareListSection from "@/components/CompareListSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />

    <main>
      <HeroSection />
      <TrustStrip />

      {/* Best Answer */}
      <section className="container py-16">
        <BestAnswerBlock
          title="Best answer"
          content="The best UAE setup route is rarely the one with the loudest ad or the lowest headline package. It is the one that matches your activity, banking expectations, visa needs, office model, and long-term plans. IncorporateUAE helps you compare those trade-offs clearly before you commit."
          audience="First-time founders, relocating entrepreneurs, e-commerce sellers, consultants, and service businesses exploring UAE incorporation."
          caution="The cheapest option is rarely the best fit. Always verify activity coverage, banking realities, and renewal costs before signing."
        />
      </section>

      <RouteCards />
      <WhyFoundersSection />
      <CompareListSection />
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
