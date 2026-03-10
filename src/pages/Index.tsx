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
import CustomerReels from "@/components/CustomerReels";
import ReviewsSection from "@/components/ReviewsSection";
import BlogPreview from "@/components/BlogPreview";
import GuidesPreview from "@/components/GuidesPreview";
import HowToPreview from "@/components/HowToPreview";
import { useLocale } from "@/i18n/context";
import SEOHead, { websiteSchema, orgSchema } from "@/components/SEOHead";

const Index = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="IncorporateUAE — UAE Business Setup Advisory"
        description="Compare UAE free zones, mainland options, and business setup routes. Get transparent cost estimates, expert guidance, and a personalised setup snapshot."
        schema={[websiteSchema(), orgSchema()]}
      />
      <Header />
      <main>
        {/* Hero fills the full viewport including behind the fixed header */}
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
        <CustomerReels />
        <ReviewsSection />
        <GuidesPreview />
        <BlogPreview />
        <MethodologyTeaser />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
