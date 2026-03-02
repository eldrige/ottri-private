"use client";
import React, { useEffect } from "react";
import DashboardSection1 from "./_components/DashboardSection1";
import DashboardSection2 from "./_components/DashboardSection2";
import DashboardSection3 from "./_components/DashboardSection3";
import DashboardSection4 from "./_components/DashboardSection4";
import axios from "axios";

export default function DashboardPage() {
  useEffect(() => {
    axios
      .get("/api/analytics")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <DashboardSection1 />
      <DashboardSection2 />
      <DashboardSection3 />
      <DashboardSection4 />
    </div>
  );
}
