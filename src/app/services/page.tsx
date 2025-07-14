import React from "react";
import Newsletter from "../_components/Newsletter";
import ServicesSection1 from "./_components/ServicesSection1";
import ServicesSection2 from "./_components/ServicesSection2";

export default function ServicePage() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <ServicesSection1 />
        <ServicesSection2 />
      </div>
      <Newsletter />
    </main>
  );
}
