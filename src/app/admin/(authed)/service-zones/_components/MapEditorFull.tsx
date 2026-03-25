/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import InteractiveMap from "./InteractiveMap";
import {
  CircleIcon,
  HandIcon,
  SmartphoneIcon,
  SquareIcon,
  TriangleIcon,
  UndoIcon,
  XIcon
} from "lucide-react";
import TrashIcon from "@/components/icons/TrashIcon";
import { ServiceArea } from "@/app/admin/types";
import {
  useCreateServiceAreaMutation,
  useDeleteServiceAreaMutation,
  useUpdateServiceAreaMutation
} from "../../_services/mutations";
import CreateSAModal from "./CreateSAModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";

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

  const coords = serviceArea.location.coordinates?.[0];
  if (!coords || coords.length < 3) return "polygon";

  const first = coords[0];
  const last = coords[coords.length - 1];
  const isClosed =
    first.length === last.length &&
    first.every((val: number, idx: number) => val === last[idx]);

  // Rectangle: exactly 5 points, closed shape
  if (coords.length === 5 && isClosed) {
    return "rectangle";
  }

  // Circle: many points (heuristic: 60+), closed shape
  if (coords.length >= 60 && isClosed) {
    return "circle";
  }

  // Polygon: not closed or doesn't match rectangle/circle heuristics
  return "polygon";
};

interface Feature {
  id?: number | string;
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
  const { mutateAsync: createSA, isPending: createPending } =
    useCreateServiceAreaMutation();
  const { mutateAsync: updateSA, isPending: updatePending } =
    useUpdateServiceAreaMutation();
  const { mutateAsync: deleteSA, isPending: deletePending } =
    useDeleteServiceAreaMutation();

  const isMobile = useWindowSize().width < 768;

  const [createModal, setCreateModal] = useState<Feature | undefined>(
    undefined
  );
  const [confirmSave, setConfirmSave] = useState(false);
  const [drawingMode, setDrawingMode] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState<
    string | number | null
  >(null);
  const isSaving = createPending || updatePending || deletePending;

  // Initialize features from service areas
  const initialFeatures = useMemo(
    () =>
      serviceAreas.map((s) => {
        const kind = determineShapeKind(s);
        return {
          id: s.id,
          name: s.name,
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

  const handleButtonClick = (mode: any) => setDrawingMode(mode);

  const handleShapeChange = (payload: Feature) => {
    const idx = features.findIndex((f) => f.id === payload.properties.id);
    let newFeatures: typeof features = [];

    if (idx === -1) {
      newFeatures = [...features, { ...payload, id: payload.properties.id }];
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

  // Helper function to compare coordinates between features
  const areCoordinatesEqual = (coords1: any, coords2: any): boolean => {
    if (!coords1 || !coords2) return false;

    // Check if arrays have the same structure
    if (coords1.length !== coords2.length) return false;

    // Deep comparison of coordinate arrays
    return JSON.stringify(coords1) === JSON.stringify(coords2);
  };

  const saveChanges = async () => {
    // Find completely new features (not in initialFeatures)
    const toCreate = features.filter(
      (feature) => !initialFeatures.some((initial) => initial.id === feature.id)
    );

    // Find features that exist but have been updated (coordinates changed)
    const toUpdate = features.filter((feature) => {
      // Must have an ID to be considered for update
      if (!feature.id) return false;

      // Find the corresponding initial feature
      const initialFeature = initialFeatures.find(
        (initial) => initial.id === feature.id
      );
      if (!initialFeature) return false;

      // Check if coordinates have changed
      return !areCoordinatesEqual(
        feature.geometry.coordinates,
        initialFeature.geometry.coordinates
      );
    });

    // Find features that were in initialFeatures but are no longer in features
    const toDelete = initialFeatures.filter(
      (initialFeature) =>
        !features.some((feature) => feature.id === initialFeature.id)
    );

    console.log(
      `Creating ${toCreate.length} new zones, updating ${toUpdate.length} zones, deleting ${toDelete.length} zones`
    );

    // Process new features
    createSA({
      newServiceAreas: toCreate.map((feat) => ({
        location: feat.geometry,
        name: feat.name!,
        nickName: feat.name!,
        popular: false,
        currency: "USD"
      }))
    });

    // Process updated features
    updateSA({
      serviceAreasData: toUpdate.map((feat) => ({
        id: Number(feat.id),
        location: feat.geometry
      }))
    });

    // Process deleted features
    deleteSA({
      serviceAreaIds: toDelete.map((i) => i.id)
    });
  };

  const handleSelectFeature = (id: string | number) => {
    // Toggle selection
    setSelectedFeatureId((currentId) => (currentId === id ? null : id));
    // Set drawing mode to null when selecting a shape
    setDrawingMode(null);
  };

  const handleDeleteSelected = () => {
    if (!selectedFeatureId) return;

    // Filter out the selected feature
    const newFeatures = features.filter(
      (f) => f.properties.id !== selectedFeatureId
    );

    // Update features and history
    setFeatures(newFeatures);
    setHistory((prevHistory) => [...prevHistory, newFeatures]);

    // Clear selection
    setSelectedFeatureId(null);
  };

  // Find selected feature for info display
  const selectedFeature = features.find(
    (f) => f.properties.id === selectedFeatureId
  );

  return (
    <div className="flex flex-col w-full h-screen md:p-4">
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
      {confirmSave && (
        <ConfirmModal
          open={confirmSave}
          onCancel={() => setConfirmSave(false)}
          onConfirm={() => {
            saveChanges();
            setConfirmSave(false);
          }}
          title="Save Changes?"
          description="Are you sure you want to save all changes to the service zones?"
          confirmText="Save"
          accent="secondary"
        />
      )}
      {!isMobile && (
        <div className="z-10 flex flex-wrap items-center gap-2 p-4 mb-4 overflow-y-hidden rounded-lg bg-surface-50">
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

          <div className="flex items-center gap-2 ml-auto">
            {selectedFeatureId && (
              <div className="flex items-center">
                <span className="mr-2 text-xs font-medium">
                  {selectedFeature?.name || `Shape ${selectedFeatureId}`}
                </span>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-xs text-white transition-colors rounded-lg bg-error hover:bg-error/80"
                  onClick={handleDeleteSelected}
                >
                  <XIcon className="stroke-1 size-4" />
                </button>
              </div>
            )}

            <button
              className="flex items-center justify-center gap-1 px-4 py-2 text-xs transition-colors bg-white border rounded-lg border-black/10 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <UndoIcon className="stroke-1 size-5" />
              Undo
            </button>
            <button
              className="flex items-center justify-center gap-1 px-4 py-2 text-xs text-white transition-colors rounded-lg bg-error hover:bg-error/80 disabled:opacity-50 disabled:hover:bg-error disabled:cursor-not-allowed"
              onClick={handleClearAll}
              disabled={features.length === 0}
            >
              <TrashIcon className="stroke-1 size-5" />
              Clear
            </button>
            <button
              className="flex items-center justify-center gap-1 px-4 py-2 text-xs text-white transition-colors rounded-lg bg-secondary-700 min-w-fit hover:bg-primary/80 disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed"
              onClick={() => setConfirmSave(true)}
              disabled={history.length === 1 || isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
      {!isMobile ? (
        <div className="flex items-start flex-col gap-2 p-3 border rounded-lg border-success bg-success/6 text-success">
          <h4 className="text-sm font-medium">Welcome to Zone Creation!</h4>
          <p className="mt-1 text-xs">
            Get started by selecting a drawing tool above (Rectangle or Circle)
            and then click & drag on the canvas to create your service zone.
          </p>
        </div>
      ) : (
        <div className="flex items-start gap-2 p-3 border rounded-lg border-warning bg-warning/7 text-warning-text">
          <div>
            <SmartphoneIcon className="size-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">
              Drawing mode not available on mobile devices.
            </h4>
            <p className="mt-1 text-xs">
              For the best zone creation experience, please use a desktop or
              tablet device with a larger screen. You can still view existing
              zones and access all other features.
            </p>
          </div>
        </div>
      )}

      <InteractiveMap
        readOnly={isMobile}
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        drawingMode={drawingMode}
        onReady={() => setIsReady(true)}
        onChange={handleShapeChange}
        onDrawingModeChange={(mode: any) => setDrawingMode(mode)}
        mapContainerClassName={cn(
          "h-full w-full mt-4 rounded-lg overflow-hidden outline-2 outline-primary-700 outline-dashed outline-offset-2",
          isSaving && "opacity-40 pointer-events-none"
        )}
        center={{ lat: 38.231917, lng: -85.757639 }}
        features={features}
        onSelectFeature={handleSelectFeature}
        selectedFeatureId={selectedFeatureId}
      />
    </div>
  );
}

export default MapEditorFull;
