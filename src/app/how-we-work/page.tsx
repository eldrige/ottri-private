import React from "react";
import HowWeWorkHero from "./_components/HowWeWorkHero";
import HowWeWorkSection1 from "./_components/HowWeWorkSection1";
import HowWeWorkSection2 from "./_components/HowWeWorkSection2";

export default function HowWeWorkPage() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <HowWeWorkHero />
        <HowWeWorkSection1 />
        <HowWeWorkSection2 />
      </div>
    </main>
  );
}
