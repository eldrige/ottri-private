"use client";
import React from "react";
import DashboardSection1 from "./_components/DashboardSection1";
import DashboardSection2 from "./_components/DashboardSection2";
import DashboardSection3 from "./_components/DashboardSection3";
import DashboardSection4 from "./_components/DashboardSection4";

export default function DashboardPage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <DashboardSection1 />
      <DashboardSection2 />
      <DashboardSection3 />
      <DashboardSection4 />
    </div>
  );
}
