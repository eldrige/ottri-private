"use client";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { AlertCircleIcon, CalendarIcon, DownloadIcon } from "lucide-react";
import React, { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import LineGraphIncreaseIcon from "@/components/icons/LineGraphIncreaseIcon";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import RevenueOverviewPanel from "./_panels/RevenueOverviewPanel";

const filterOptions = [
  { label: "All Bookings", value: "all-bookings" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" }
];
const timeRangeOptions = [
  { label: "Last 7 days", value: "last-7-days" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" }
];

export default function FinancialsPage() {
  const [activeView, setActiveView] = useState<string>("revenue-overview");

  const statsBoxes = [
    {
      title: "Total Revenue",
      value: "$6,584",
      icon: <DollarIcon2 className="size-6" />,
      statusText: "+12.5%",
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor: "text-success"
    },
    {
      title: "Booking Revenue",
      value: "$5,800",
      icon: <CalendarIcon className="size-6" />,
      statusText: "+12.5%",
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor: "text-success"
    },
    {
      title: "Tips & Extras",
      value: "$610",
      icon: <DollarIcon2 className="size-6" />,
      statusText: "$425 tips + $185 fees",
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor: "text-success"
    },
    {
      title: "Overdue Payments",
      value: "$2,000",
      icon: <AlertCircleIcon className="size-6" />,
      statusText: "On track",
      statusIcon: <CheckBrokenIcon className="size-3.5" />,
      statusColor: "text-success"
    }
  ];

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Financial</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-4 mt-6 lg:mt-8">
        <div className="flex gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 gap-y-2 flex-1 lg:flex-auto">
            <p className="font-medium">Services:</p>
            <Select
              options={filterOptions}
              value={filterOptions[0]}
              placeholder="All Bookings"
              buttonClassName="border-none gap-2 font-medium"
              accent="secondary"
              className="text-sm"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 gap-y-2 flex-1 lg:flex-auto">
            <p className="font-medium">Time Range:</p>
            <Select
              options={timeRangeOptions}
              value={timeRangeOptions[0]}
              placeholder="All Bookings"
              buttonClassName="border-none gap-2 font-medium"
              accent="secondary"
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex *:flex-1 lg:*:flex-auto gap-4 lg:gap-8 lg:ml-auto">
          <Button
            size={"2xs"}
            variant={"secondary-outline"}
            className="flex gap-2 items-center justify-center border-black/10"
          >
            <DownloadIcon className="size-5" /> Export as CSV
          </Button>
          <Button
            size={"2xs"}
            variant={"secondary-outline"}
            className="flex gap-2 items-center justify-center border-black/10"
          >
            <DownloadIcon className="size-5" /> Export as PDF
          </Button>
        </div>
      </div>

      <div className="mt-8 flex gap-4 flex-col lg:flex-row">
        {statsBoxes.map((box, index) => (
          <div
            key={index}
            className="p-6 flex-1 border border-black/10 rounded-lg shadow-custom-light"
          >
            <div className="flex justify-between items-center text-sm">
              <span>{box.title}</span>
              {box.icon}
            </div>
            <p className="mt-4 text-subtitle font-medium">{box.value}</p>
            <div className="mt-2 text-sm">
              <p
                className={`${box.statusColor} text-sm flex items-center gap-2`}
              >
                {!!box.statusIcon && box.statusIcon}
                <span>{box.statusText}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <PanelViewer
          views={[
            { viewName: "revenue-overview", content: "Revenue Overview" },
            { viewName: "service-performance", content: "Service Performance" },
            { viewName: "invoice-management", content: "Invoice Management" },
            { viewName: "refunds", content: "Refunds" }
          ]}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>

      <div className="mt-8 w-full">
        {activeView === "revenue-overview" ? <RevenueOverviewPanel /> : ""}
      </div>
    </main>
  );
}
