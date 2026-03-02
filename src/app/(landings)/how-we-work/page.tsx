import React from "react";
import HowWeWorkHero from "./_components/HowWeWorkHero";
import HowWeWorkSection1 from "./_components/HowWeWorkSection1";
import HowWeWorkSection2 from "./_components/HowWeWorkSection2";
import CommonQuestionsSection from "@/app/(landings)/_components/CommonQuestionsSection";
import HowWeWorkSection4 from "./_components/HowWeWorkSection4";

export default function HowWeWorkPage() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <HowWeWorkHero />
        <HowWeWorkSection1 />
        <HowWeWorkSection2 />
        <CommonQuestionsSection />
      </div>
      <HowWeWorkSection4 />
    </main>
  );
}
