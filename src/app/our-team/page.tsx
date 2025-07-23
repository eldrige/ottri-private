import React from "react";
import OurTeamHero from "./_components/OurTeamHero";
import OurTeamSection1 from "./_components/OurTeamSection1";

export default function OurTeamPage() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <OurTeamHero />
        <OurTeamSection1 />
      </div>
    </main>
  );
}
