import React from "react";
import MapEditorFull from "../_components/MapEditorFull";
import { ServiceArea } from "@/app/admin/types";
import { useWindowSize } from "@/hooks/useWindowSize";
import { MonitorIcon } from "lucide-react";

export default function MapEditorPanel({
  serviceAreas
}: {
  serviceAreas: ServiceArea[];
}) {
  const isMobile = useWindowSize().width < 768;

  return (
    <div className="mt-4 rounded-lg md:p-4 md:border border-black/10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Interactive Zone Editor</h3>
          {isMobile && (
            <p className="px-4 py-2 text-xs bg-surface-50 rounded-4xl">
              View only
            </p>
          )}
        </div>
        <p className="flex items-center justify-center gap-2 px-3 py-1 text-sm border rounded-lg text-primary-700 md:text-secondary-700/70 border-black/10">
          {isMobile ? (
            <>
              <MonitorIcon className="size-4" /> Desktop Required
            </>
          ) : (
            "Ready to create zones"
          )}
        </p>
      </div>
      <p className="mt-4 text-xs md:mt-2 text-secondary-700/70">
        {isMobile
          ? "View existing zones. Drawing mode requires desktop or tablet device."
          : "Select a drawing tool and click & drag on the map to create service zones"}
      </p>
      <div className="mt-4">
        <MapEditorFull serviceAreas={serviceAreas} />
      </div>
    </div>
  );
}
