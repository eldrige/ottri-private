import React from "react";
import DashboardSection1 from "./_components/DashboardSection1";
import DashboardSection2 from "./_components/DashboardSection2";
import DashboardSection3 from "./_components/DashboardSection3";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 mx-6">
      <DashboardSection1 />
      <DashboardSection2 />
      <DashboardSection3 />
    </div>
  );
}
