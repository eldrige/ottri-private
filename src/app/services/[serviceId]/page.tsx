import React from "react";
import ServicesDetailsHero from "./_components/ServicesDetailsHero";
import { servicesData } from "@/lib/sampleData";

async function ServicesDetailsPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const service = servicesData[Number(serviceId)];
  return (
    <main>
      <div className="container mx-auto px-6">
        <ServicesDetailsHero
          coverSrc={service.coverSrc}
          title={service.title}
          priceFrom={service.priceFrom}
          duration={service.duration}
        />
      </div>
      {/* <Newsletter /> */}
    </main>
  );
}

export default ServicesDetailsPage;
