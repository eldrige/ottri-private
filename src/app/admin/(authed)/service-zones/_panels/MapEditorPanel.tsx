import React from "react";
import MapEditorFull from "../_components/MapEditorFull";
import { ServiceArea } from "@/app/admin/types";

export default function MapEditorPanel({
  serviceAreas
}: {
  serviceAreas: ServiceArea[];
}) {
  return (
    <div className="border border-black/10 rounded-lg p-4 mt-4">
      <div className="flex gap-4 items-center justify-between">
        <h3 className="font-medium">Interactive Zone Editor</h3>
        <p className="text-sm text-secondary-700/70 py-1 px-3 border border-black/10 rounded-lg">
          Ready to create zones
        </p>
      </div>
      <p className="mt-2 text-xs text-secondary-700/70">
        Select a drawing tool and click & drag on the map to create service
        zones
      </p>
      <div className="mt-4">
        <MapEditorFull serviceAreas={serviceAreas} />
      </div>
    </div>
  );
}
