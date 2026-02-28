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
import { useLocale } from "@/i18n/context";

const Index = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <section className="container py-16">
          <BestAnswerBlock
            title={t.homeBestAnswer.title}
            content={t.homeBestAnswer.content}
            audience={t.homeBestAnswer.audience}
            caution={t.homeBestAnswer.caution}
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
};

export default Index;
