import React from "react";
import ServicesDetailsHero from "./_components/ServicesDetailsHero";
import { servicesData } from "@/lib/sampleData";
import ServicesDetailsSection1 from "./_components/ServicesDetailsSection1";
import ServicesDetailsSection2 from "./_components/ServicesDetailsSection2";
import ServicesDetailsSection3 from "./_components/ServicesDetailsSection3";
import ServicesDetailsSection4 from "./_components/ServicesDetailsSection4";
import ServicesDetailsSection5 from "./_components/ServicesDetailsSection5";

async function ServicesDetailsPage({
  params
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const service = servicesData.findLast(
    (service) => service.id === Number(serviceId)
  );
  if (!service) {
    return <></>;
  }
  return (
    <main>
      <div className="container mx-auto px-6">
        <ServicesDetailsHero
          coverImage={service.coverImage}
          name={service.name}
          priceFrom={service.priceFrom}
          duration={service.duration}
        />
        <ServicesDetailsSection1 includedServices={service.services} />
        <ServicesDetailsSection2 pricingDetails={service.pricingDetails} />
        <ServicesDetailsSection3 process={service.process} />
      </div>
      <ServicesDetailsSection4 />
      <div className="container mx-auto px-6">
        <ServicesDetailsSection5 />
      </div>
    </main>
  );
}

export default ServicesDetailsPage;
