/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
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
import { useCreateServiceAreaMutation } from "../../_services/mutations";
import CreateSAModal from "./CreateSAModal";

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

interface Feature {
  id?: number;
  type: string;
  properties: {
    id: string | number;
    kind: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  name?: string;
}

function MapEditorFull({ serviceAreas }: { serviceAreas: ServiceArea[] }) {
  const { mutateAsync: createSA } = useCreateServiceAreaMutation();
  const [createModal, setCreateModal] = useState<Feature | undefined>(
    undefined
  );
  const [drawingMode, setDrawingMode] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize features from service areas
  const initialFeatures = useMemo(
    () =>
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
      }),
    [serviceAreas]
  );

  const [features, setFeatures] = useState<Feature[]>(initialFeatures);

  // Simplified history tracking - just a stack of previous states
  const [history, setHistory] = useState<any[][]>([initialFeatures]);

  useEffect(() => {
    setFeatures(initialFeatures);
    setHistory([initialFeatures]);
  }, [initialFeatures]);

  console.log(history);
  const handleButtonClick = (mode: any) => setDrawingMode(mode);

  const handleShapeChange = (payload: Feature) => {
    // payload: {id, properties: { kind, geometry }}
    const idx = features.findIndex((f) => f.id === payload.properties.id);
    let newFeatures;

    if (idx === -1) {
      newFeatures = [...features, payload];
      console.log(payload);
      // createSA({newServiceArea: {location: payload.geometry}})
      if (!payload.name) {
        setCreateModal(payload);
        return;
      }
    } else {
      const copy = features.slice();
      copy[idx] = { ...features[idx], ...payload };
      newFeatures = copy;
    }

    // Update features and history together to avoid duplicate history entries
    setFeatures(newFeatures);
    setHistory((prevHistory) => [...prevHistory, newFeatures]);

    // you can persist or inspect here
    console.log("shape change:", payload);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      // Make sure we have something to undo
      // Remove the last state from history
      setHistory((prev) => {
        const newHistory = prev.slice(0, -1);
        // Set the features to the previous state
        setFeatures(newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  };

  const handleClearAll = () => {
    const emptyFeatures: any[] = [];
    setFeatures(emptyFeatures);

    // Add clear action to history
    setHistory((prev) => [...prev, emptyFeatures]);
  };

  // Can undo if we have more than one state in history
  const canUndo = history.length > 1;

  const saveFeatures = async () => {
    setIsSaving(true);
    const toCreate = features.filter(
      (i) => !initialFeatures.some((j) => i.id === j.id)
    );
    // const toDelete = initialFeatures.filter(i => !features.some(j => i.id === j.id));
    await Promise.all(
      toCreate.map((feat) =>
        createSA({
          newServiceArea: {
            location: feat.geometry,
            name: feat.name!,
            nickName: feat.name!,
            popular: false
          }
        })
      )
    );

    setIsSaving(false);
  };

  return (
    <div className="w-full h-screen flex flex-col p-4">
      {createModal && (
        <CreateSAModal
          onSave={async ({ zoneName }) => {
            handleShapeChange({ ...createModal, name: zoneName });
          }}
          feature={createModal}
          open={!!createModal}
          onClose={() => setCreateModal(undefined)}
        />
      )}
      <div className="z-10 bg-surface-50 p-4 rounded-lg flex gap-2 items-center overflow-y-hidden">
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
          className="ml-auto py-2 px-4 bg-white border border-black/10 rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed"
          onClick={handleUndo}
          disabled={!canUndo}
        >
          <UndoIcon className="stroke-1 size-5" />
          Undo
        </button>
        <button
          className="py-2 px-4 bg-error text-white rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-error/80 transition-colors disabled:opacity-50 disabled:hover:bg-error disabled:cursor-not-allowed"
          onClick={handleClearAll}
          disabled={features.length === 0}
        >
          <TrashIcon className="stroke-1 size-5" />
          Clear
        </button>
        <button
          className="py-2 px-4 bg-secondary-700 min-w-fit text-white rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed"
          onClick={saveFeatures}
          disabled={features.length === 0 || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
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
