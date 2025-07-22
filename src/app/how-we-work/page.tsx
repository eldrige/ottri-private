import React from "react";
import HowWeWorkHero from "./_components/HowWeWorkHero";
import HowWeWorkSection1 from "./_components/HowWeWorkSection1";
import HowWeWorkSection2 from "./_components/HowWeWorkSection2";
import CommonQuestionsSection from "@/components/CommonQuestionsSection";

export default function HowWeWorkPage() {
  return (
    <main>
      <div className="container mx-auto pb-10 px-6">
        <HowWeWorkHero />
        <HowWeWorkSection1 />
        <HowWeWorkSection2 />
        <CommonQuestionsSection />
      </div>
    </main>
  );
}
