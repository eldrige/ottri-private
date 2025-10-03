"use client";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { Filter, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import ServiceZonesPanel from "./_panels/ServiceZonesPanel";
import MapEditorPanel from "./_panels/MapEditorPanel";
import { useServiceAreasQuery } from "../_services/queries";
import Loading from "../loading";
import RestrictedPanel from "./_panels/RestrictedPanel";
import ZoneSettingsPanel from "./_panels/ZoneSettingsPanel";

const filterOptions = [
  { label: "All Zones", value: "all-zones" },
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "INPROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" }
];

export default function ServiceZonesPage() {
  const [activeView, setActiveView] = useState<string>("service-zones");

  const { data: serviceAreas } = useServiceAreasQuery();

  if (!serviceAreas) return <Loading />;

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Service Zones</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
        <div className="flex items-center text-sm bg-gray-50 rounded-lg pl-4">
          <Filter className="size-4" />
          <Select
            options={filterOptions}
            value={filterOptions[0]}
            placeholder="All Zones"
            buttonClassName="border-none gap-2 font-medium"
            accent="secondary"
          />
        </div>
        <div className="flex flex-col w-full lg:w-auto lg:flex-row gap-4 lg:gap-8">
          <Link className="w-full" href={"#"}>
            <Button
              size={"2xs"}
              variant={"secondary"}
              className="w-full flex gap-2 items-center text-base justify-center"
            >
              <PlusIcon className="size-5" /> Create Zone
            </Button>
          </Link>
        </div>
      </div>
      <div className="*:mt-4">
        <PanelViewer
          views={[
            {
              viewName: "service-zones",
              content: "Service Zones"
            },
            {
              viewName: "map-editor",
              content: "Map Editor"
            },
            {
              viewName: "restricted-log",
              content: "Restricted Log"
            },
            {
              viewName: "zone-settings",
              content: "Zone Settings"
            }
          ]}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>
      {activeView === "service-zones" && (
        <ServiceZonesPanel serviceAreas={serviceAreas} />
      )}
      {activeView === "map-editor" && (
        <MapEditorPanel serviceAreas={serviceAreas} />
      )}
      {activeView === "restricted-log" && <RestrictedPanel />}
      {activeView === "zone-settings" && <ZoneSettingsPanel />}
    </main>
  );
}
