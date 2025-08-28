import React from "react";
import ServicesDetailsHero from "./_components/ServicesDetailsHero";
import ServicesDetailsSection1 from "./_components/ServicesDetailsSection1";
import ServicesDetailsSection2 from "./_components/ServicesDetailsSection2";
import { getUniqueService } from "@/lib/api/services";

async function ServicesDetailsPage({
  params
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const service = await getUniqueService(serviceId);
  const minPrice = Math.min(
    ...service.pricingDetails.map((detail) => detail.minPrice)
  );
  const maxPrice = Math.min(
    ...service.pricingDetails.map((detail) => detail.maxPrice)
  );

  const durationsArray = service.pricingDetails.map(
    (detail) => detail.duration
  );

  const durationStart = Math.min(
    ...durationsArray.map((elem) => Number(elem.split("-")[0]))
  );

  const durationEnd = Math.max(
    ...durationsArray.map((elem) => Number(elem.split("-")[1].split(" ")[0]))
  );
  const duration = `${durationStart}-${durationEnd}`;
  const serviceAddOn = service.serviceAddOn.map((elem) => elem.name);
  if (!service) {
    return <></>;
  }
  return (
    <>
      <ServicesDetailsHero
        description={service.description}
        coverImage={service.coverImage}
        name={service.name}
        priceFrom={`${minPrice}-${maxPrice}`}
        duration={duration}
      />
      <ServicesDetailsSection1 includedServices={serviceAddOn} />
      <ServicesDetailsSection2 pricingDetails={service.pricingDetails} />
    </>
  );
}

export default ServicesDetailsPage;
