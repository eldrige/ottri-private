"use client";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import ServiceZonesPanel from "./_panels/ServiceZonesPanel";
import MapEditorPanel from "./_panels/MapEditorPanel";
import { useServiceAreasQuery } from "../_services/queries";
import Loading from "../loading";
import RestrictedPanel from "./_panels/RestrictedPanel";
import ZoneSettingsPanel from "./_panels/ZoneSettingsPanel";

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

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-end gap-4 lg:gap-6">
        <div className="flex flex-col w-full lg:w-auto lg:flex-row gap-4 lg:gap-8">
          <Button
            size={"2xs"}
            variant={"secondary"}
            className="w-full flex gap-2 items-center text-base justify-center"
            onClick={() => setActiveView("map-editor")}
          >
            <PlusIcon className="size-5" /> Create Zone
          </Button>
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
