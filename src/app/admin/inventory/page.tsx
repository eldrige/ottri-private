"use client";
import AlertLineIcon from "@/components/icons/AlertLineIcon";
import BoxIcon2 from "@/components/icons/BoxIcon2";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import LineGraphIncreaseIcon from "@/components/icons/LineGraphIncreaseIcon";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import { Input } from "@/components/ui/Input";
import { Filter, PlusIcon, SearchIcon } from "lucide-react";
import Select from "@/components/ui/Select";
import OverviewPanel from "./_panels/OverviewPanel";
import QuickRestockPanel from "./_panels/QuickRestockPanel";
import AlertsPanel from "./_panels/AlertsPanel";

export default function InventoryPage() {
  const [activeView, setActiveView] = useState<string>("overview");
  const statsBoxes = [
    {
      title: "Total Items",
      value: "6",
      icon: <BoxIcon2 className="size-6" />,
      statusText: "in inventory"
    },
    {
      title: "Inventory Value",
      value: "$315",
      icon: <DollarIcon2 className="size-6" />,
      statusText: "current stock"
    },
    {
      title: "Low Stock Alerts",
      value: "4",
      icon: <AlertLineIcon className="size-6 text-primary-700" />,
      statusText: "1 critical"
    },
    {
      title: "Monthly Expenses",
      value: "$0",
      valueColor: "text-error",
      icon: <LineGraphIncreaseIcon className="size-6 text-error rotate-90" />,
      statusText: "avg $69"
    }
  ];

  const filterOptions = [
    { label: "All Category", value: "all-category" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" }
  ];

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6 space-y-4">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Inventory</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

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
            <p className={`mt-4 text-subtitle font-medium ${box.valueColor}`}>
              {box.value}
            </p>
            <div className="mt-2 text-sm">
              <p
                className={`text-secondary-700/50 text-sm flex items-center gap-2`}
              >
                <span>{box.statusText}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 lg:p-6 border border-warning bg-warning/7 flex flex-col lg:flex-row lg:items-center gap-x-8 gap-y-2 rounded-lg">
        <AlertLineIcon className="size-6 text-primary-700" />
        <div className="space-y-2 flex-1">
          <p className="font-medium">4 items need restocking</p>
          <p className="text-sm text-secondary-700/50">
            1 critically low • All-Purpose Cleaner, Vacuum Cleaner Bags, Floor
            Detergent and 1 more
          </p>
        </div>
        <Button
          size={"2xs"}
          variant={"secondary-outline"}
          className="border-black/10 bg-white"
        >
          View All
        </Button>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 *:w-full xl:*:w-auto">
        <div className="*:mt-0 mr-auto mb-4 xl:mb-0">
          <PanelViewer
            views={[
              { viewName: "overview", content: "Overview" },
              { viewName: "quick-restock", content: "Quick Restock" },
              { viewName: "alerts", content: "Alert (4)" },
              { viewName: "expense-history", content: "Expense History" }
            ]}
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>
        <div className="relative">
          <Input placeholder="Search Item..." className="pl-10 text-sm py-2" />
          <SearchIcon className="size-4 absolute left-4 -translate-y-1/2 top-1/2 text-surface-500 pointer-events-none" />
        </div>
        <div className="flex items-center text-sm bg-gray-50 rounded-lg pl-4">
          <Filter className="size-4" />
          <Select
            options={filterOptions}
            value={filterOptions[0]}
            placeholder="All Bookings"
            buttonClassName="border-none gap-2 font-medium w-full"
            className="w-full"
            accent="secondary"
          />
        </div>
        <Button
          size={"2xs"}
          variant={"secondary"}
          className="py-3 px-4 flex items-center justify-center gap-1"
        >
          <PlusIcon className="size-4" />
          Add Item
        </Button>
      </div>

      <div>
        {activeView === "overview" && <OverviewPanel />}
        {activeView === "quick-restock" && <QuickRestockPanel />}
        {activeView === "alerts" && <AlertsPanel />}
      </div>
    </main>
  );
}
