import HeroSection from "./_components/HeroSection";
import LandingSection2 from "./_components/LandingSection2";
import LandingSection3 from "./_components/LandingSection3";
import Newsletter from "./_components/Newsletter";
import LandingSection4 from "./_components/LandingSection4";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col px-2 md:px-36">
        <HeroSection />
        <LandingSection2 />
        <LandingSection3 />
        <LandingSection4 />
      </div>
      <Newsletter />
    </main>
  );
}
