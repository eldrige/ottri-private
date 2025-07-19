import CustomCheckIcon from "@/components/icons/CustomCheckIcon";
import React from "react";

export default function ServicesDetailsSection1() {
  const popularServices: PopularService[] = [
    { content: "All rooms thoroughly cleaned and organized" },
    { content: "Inside appliances (oven, fridge, microwave, dishwasher)" },
    { content: "Baseboards, window sills, and door frames" },
    { content: "Light fixtures and ceiling fans dusted" },
    { content: "Cabinet fronts and handles sanitized" },
    { content: "Bathroom deep scrub with grout cleaning" },
    { content: "Dust all surfaces and furniture" },
    { content: "Empty all trash and replace liners" },
    { content: "Make beds and tidy rooms" },
  ];
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
        {popularServices.map((popularService, _index) => (
          <PopularServiceCard key={_index} content={popularService.content} />
        ))}
      </div>
    </section>
  );
}
type PopularService = {
  content: string;
};
function PopularServiceCard({ content }: PopularService) {
  return (
    <div className="border border-black/10 text-center rounded-lg flex  justify-start gap-2 p-4 items-center">
      <CustomCheckIcon />
      <p className="text-surface-500 text-base">{content}</p>
    </div>
  );
}
