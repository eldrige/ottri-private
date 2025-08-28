import { PricingDetail } from "@/lib/types";
import { Service } from "../../_utils/types";
import React from "react";

export default function ServicesDetailsSection2({
  pricingDetails
}: Pick<Service, "pricingDetails">) {
  return (
    <section className="py-24 pb-36 gap-16 flex flex-col">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Pricing Details
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Transparent pricing based on your home size
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-32 gap-4">
        {pricingDetails.map((elem, _index) => (
          <PricingDetailCard
            key={_index}
            timeRange={elem.timeRange}
            priceRange={elem.priceRange}
            size={elem.size}
          />
        ))}
      </div>
    </section>
  );
}

function PricingDetailCard({ priceRange, size, timeRange }: PricingDetail) {
  return (
    <div className="border border-black/10 text-center rounded-lg flex flex-col justify-between p-4 items-center gap-8">
      <p className="text-surface-500 text-base">{size}</p>
      <span className="text-primary-700 text-2xl font-medium">
        ${priceRange}
      </span>
      <p className="text-surface-500 text-base">{timeRange} hours</p>
    </div>
  );
}
