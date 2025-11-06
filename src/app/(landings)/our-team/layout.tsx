import React from "react";
import OurTeamSection3 from "./_components/OurTeamSection3";

export default function OurTeamLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <div className="container mx-auto px-6">
        <OurTeamSection3 />
      </div>
    </main>
  );
}
