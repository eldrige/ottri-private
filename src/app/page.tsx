import HeroSection from "./_components/HeroSection";
import LandingSection2 from "./_components/LandingSection2";
import LandingSection3 from "./_components/LandingSection3";
import Newsletter from "./_components/Newsletter";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <HeroSection />
        <LandingSection2 />
        <LandingSection3 />
      </div>
      <Newsletter />
    </main>
  );
}
