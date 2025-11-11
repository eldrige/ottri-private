import HeroSection from "./_components/HeroSection";
import LandingSection2 from "./_components/LandingSection2";
import LandingSection3 from "./_components/LandingSection3";
import LandingSection4 from "./_components/LandingSection4";
import LandingSection5 from "./_components/LandingSection5";
import LandingSection6 from "./_components/LandingSection6";
import LandingSection7 from "./_components/LandingSection7";
import LandingSection8 from "./_components/LandingSection8";
import CommonQuestionsSection from "./_components/CommonQuestionsSection";
import Newsletter from "./_components/Newsletter";
import LandingPartners from "./_components/LandingPartners";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <HeroSection />
        <LandingSection2 />
        <LandingSection3 />
        <LandingSection4 />
      </div>
      <LandingPartners />
      <div className="container mx-auto px-6">
        <LandingSection5 />
        <LandingSection6 />
        <LandingSection7 />
        <LandingSection8 />
        <CommonQuestionsSection />
      </div>
      <Newsletter />
    </main>
  );
}
