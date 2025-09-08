import React from "react";
import { getServiceAddOns } from "../_utils/queries";

export default async function ServicesSection3() {
  const popularServices = await getServiceAddOns();
  return (
    <section className="py-24 pb-36 gap-16 flex flex-col">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Popular Add-On Services
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Enhance any cleaning service with these optional extras
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularServices.map((popularService) => (
          <PopularServiceCard
            key={popularService.id}
            title={popularService.name}
            price={popularService.price}
            subtitle={popularService.description}
          />
        ))}
      </div>
    </section>
  );
}
type PopularServiceCardProps = {
  title: string;
  price: number;
  subtitle: string;
};
function PopularServiceCard({
  title,
  price,
  subtitle
}: PopularServiceCardProps) {
  return (
    <div className="border border-black/10 text-center rounded-lg flex flex-col justify-between p-4 items-center gap-8">
      <p className="text-surface-500 text-base">{title}</p>
      <span className="text-primary-700 text-2xl font-medium">+${price}</span>
      <p className="text-surface-500 text-base">{subtitle}</p>
    </div>
  );
}
