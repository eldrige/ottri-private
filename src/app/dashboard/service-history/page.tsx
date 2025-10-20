"use client";
import React from "react";
import ServiceHistorySection1 from "./_components/ServiceHistorySection1";
import ServiceHistorySection2 from "./_components/ServiceHistorySection2";
import ServiceHistorySection3 from "./_components/ServiceHistorySection3";

export default function ServiceHistoryPage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ServiceHistorySection1 />
      <ServiceHistorySection2 />
      <ServiceHistorySection3 />
    </div>
  );
}
