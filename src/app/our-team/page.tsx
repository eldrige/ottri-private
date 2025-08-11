import React from "react";
import OurTeamHero from "./_components/OurTeamHero";
import OurTeamSection1 from "./_components/OurTeamSection1";
import OurTeamSection3 from "./_components/OurTeamSection3";
import OurTeamSection2 from "./_components/OurTeamSection2";

export default function OurTeamPage() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <OurTeamHero />
        <OurTeamSection1 />
      </div>
      <OurTeamSection2 />
      <div className="container mx-auto px-6">
        <OurTeamSection3 />
      </div>
    </main>
  );
}
