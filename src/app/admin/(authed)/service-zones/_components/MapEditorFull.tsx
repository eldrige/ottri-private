/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import InteractiveMap from "./InteractiveMap";
import {
  CircleIcon,
  HandIcon,
  SquareIcon,
  TriangleIcon,
  UndoIcon
} from "lucide-react";
import TrashIcon from "@/components/icons/TrashIcon";
import { ServiceArea } from "@/app/admin/types";

const tools = [
  {
    value: null,
    label: (
      <>
        <HandIcon className="size-4" /> Select
      </>
    )
  },
  {
    value: "rectangle",
    label: (
      <>
        <SquareIcon className="size-4" /> Rectangle
      </>
    )
  },
  {
    value: "circle",
    label: (
      <>
        <CircleIcon className="size-4" /> Circle
      </>
    )
  },
  {
    value: "polygon",
    label: (
      <>
        <TriangleIcon className="size-4" /> Polygon
      </>
    )
  }
];

// Helper function to determine shape kind from service area data
const determineShapeKind = (serviceArea: ServiceArea) => {
  if (!serviceArea.location || !serviceArea.location.coordinates)
    return "polygon";

  // If no explicit type, try to infer from coordinates
  // Circles typically have many points forming a near-perfect circle (we use 60+ points as heuristic)
  if (serviceArea.location.coordinates?.[0]?.length >= 60) {
    return "circle";
  }

  // Rectangles have exactly 5 points (last point same as first to close the shape)
  if (serviceArea.location.coordinates?.[0]?.length === 5) {
    return "rectangle";
  }

  return "polygon";
};

function MapEditorFull({ serviceAreas }: { serviceAreas: ServiceArea[] }) {
  const [drawingMode, setDrawingMode] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [features, setFeatures] = useState<any[]>(
    serviceAreas.map((s) => {
      const kind = determineShapeKind(s);
      return {
        id: s.id,
        type: "Feature",
        properties: {
          id: s.id,
          kind: kind
        },
        geometry: s.location
      };
    })
  ); // {id, kind, geometry}

  const handleButtonClick = (mode: any) => setDrawingMode(mode);

  const handleShapeChange = (payload: any) => {
    // payload: {id, properties: { kind, geometry }}
    setFeatures((prev) => {
      const idx = prev.findIndex((f) => f.id === payload.properties.id);
      if (idx === -1) {
        return [...prev, payload];
      }
      const copy = prev.slice();
      copy[idx] = { ...prev[idx], ...payload };
      return copy;
    });
    // you can persist or inspect here
    console.log("shape change:", payload);
  };

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <div className="z-10 bg-surface-50 p-4 rounded-lg flex gap-2 items-center">
        <span className="mr-4 text-sm">Drawing Tools:</span>
        {tools.map((tool) => {
          const selected = drawingMode === tool.value;
          return (
            <button
              key={String(tool.value)}
              onClick={() => isReady && handleButtonClick(tool.value)}
              className={[
                "px-4 py-2 rounded-lg border flex items-center gap-1 text-xs",
                selected
                  ? "bg-secondary-700 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              ].join(" ")}
            >
              {tool.label}
            </button>
          );
        })}
        <button
          className="ml-auto py-2 px-4 bg-white border border-black/10 rounded-lg text-xs flex items-center justify-center gap-1 disabled:opacity-50 hover:disabled:cursor-auto"
          disabled
        >
          <UndoIcon className="stroke-1 size-5" />
          Undo
        </button>
        <button
          className="py-2 px-4 bg-error text-white rounded-lg text-xs flex items-center justify-center gap-1 disabled:opacity-50 hover:disabled:cursor-auto"
          disabled
        >
          <TrashIcon className="stroke-1 size-5" />
          Clear
        </button>
      </div>

      <InteractiveMap
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        drawingMode={drawingMode}
        onReady={() => setIsReady(true)}
        onChange={handleShapeChange}
        onDrawingModeChange={(mode: any) => setDrawingMode(mode)}
        mapContainerClassName="h-full w-full mt-4 rounded-lg overflow-hidden"
        center={{ lat: 38.231917, lng: -85.757639 }}
        features={features} // If this state starts with polygons, they render immediately
      />
    </div>
  );
}

export default MapEditorFull;
