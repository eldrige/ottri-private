import CustomCheckIcon from "@/components/icons/CustomCheckIcon";
import React from "react";

export default function ServicesDetailsSection1({
  includedServices,
}: {
  includedServices: string[];
}) {
  return (
    <section className="py-24 pb-36 gap-16 flex flex-col">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          {"What's Included"}
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Comprehensive cleaning checklist for one-time deep clean
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {includedServices.map((includedService, _index) => (
          <PopularServiceCard key={_index} content={includedService} />
        ))}
      </div>
    </section>
  );
}
function PopularServiceCard({ content }: { content: string }) {
  return (
    <div className="border border-black/15 text-center rounded-lg flex  justify-start gap-2 p-4 items-center">
      <CustomCheckIcon />
      <p className="text-surface-500 text-base">{content}</p>
    </div>
  );
}
