import React from "react";
import Newsletter from "../_components/Newsletter";
import ServicesSection1 from "./_components/ServicesSection1";
import ServicesSection2 from "./_components/ServicesSection2";
import ServicesSection3 from "./_components/ServicesSection3";

export const dynamic = "force-dynamic";

export default function ServicePage() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <ServicesSection1 />
        <ServicesSection2 />
        <ServicesSection3 />
      </div>
      <Newsletter />
    </main>
  );
}
