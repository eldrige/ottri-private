/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useCallback } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  useMap,
  useMapsLibrary
} from "@vis.gl/react-google-maps";

function generateId(length = 7) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return id;
}

const scriptLibraries = ["drawing", "geometry", "marker"];

function InteractiveMap({
  onChange,
  drawingMode,
  onDrawingModeChange,
  onReady,
  googleMapsApiKey,
  mapContainerClassName,
  center,
  features = []
}: any) {
  return (
    <APIProvider apiKey={googleMapsApiKey} libraries={scriptLibraries}>
      <div className={mapContainerClassName}>
        <GoogleMap
          mapId="aPjEtS0by8"
          defaultCenter={center}
          defaultZoom={10}
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={false}
          className="w-full h-full"
        >
          <DrawingManagerBridge
            drawingMode={drawingMode}
            onChange={onChange}
            onDrawingModeChange={onDrawingModeChange}
            onReady={onReady}
            features={features}
          />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}

function DrawingManagerBridge({
  drawingMode,
  onChange,
  onDrawingModeChange,
  onReady,
  features
}: any) {
  const map = useMap();
  const drawing = useMapsLibrary("drawing");
  const geometry = useMapsLibrary("geometry");

  const managerRef = useRef<any>(null);
  const overlayByIdRef = useRef(new Map()); // id -> overlay
  const idByOverlayRef = useRef(new WeakMap()); // overlay -> id

  const toGeoJSON = useCallback(
    (shape: any, type: any) => {
      if (type === "polyline") {
        const coords = shape
          .getPath()
          .getArray()
          .map((p: any) => [p.lng(), p.lat()]);
        return { type: "LineString", coordinates: coords };
      }
      if (type === "polygon") {
        const coords = shape
          .getPath()
          .getArray()
          .map((p: any) => [p.lng(), p.lat()]);
        return { type: "Polygon", coordinates: [coords] };
      }
      if (type === "circle" && geometry) {
        const center = shape.getCenter();
        const radius = shape.getRadius();
        const steps = 64;
        const coords = [];
        for (let i = 0; i <= steps; i++) {
          const point = geometry.spherical.computeOffset(
            center,
            radius,
            (i * 360) / steps
          );
          coords.push([point.lng(), point.lat()]);
        }
        return { type: "Polygon", coordinates: [coords] };
      }
      if (type === "rectangle") {
        const bounds = shape.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        return {
          type: "Polygon",
          coordinates: [
            [
              [sw.lng(), ne.lat()],
              [ne.lng(), ne.lat()],
              [ne.lng(), sw.lat()],
              [sw.lng(), sw.lat()],
              [sw.lng(), ne.lat()]
            ]
          ]
        };
      }
      return null;
    },
    [geometry]
  );

  const emitChange = useCallback(
    (overlay: any, type: any) => {
      const id = idByOverlayRef.current.get(overlay);
      if (!id) return;
      const geometryObj = toGeoJSON(overlay, type);
      if (!geometryObj) return;
      if (onChange)
        onChange({
          type: "Feature",
          properties: {
            id,
            kind: type
          }, // Required for some visualizers like https://geojson.io
          geometry: geometryObj
        });
    },
    [onChange, toGeoJSON]
  );

  const wireOverlayListeners = useCallback(
    (overlay: any, type: string, id: any) => {
      idByOverlayRef.current.set(overlay, id);
      if (type === "polygon" || type === "polyline") {
        const path = overlay.getPath();
        path.addListener("set_at", () => emitChange(overlay, type));
        path.addListener("insert_at", () => emitChange(overlay, type));
      } else if (type === "circle") {
        overlay.addListener("center_changed", () => emitChange(overlay, type));
        overlay.addListener("radius_changed", () => emitChange(overlay, type));
      } else if (type === "rectangle") {
        overlay.addListener("bounds_changed", () => emitChange(overlay, type));
      }
    },
    [emitChange]
  );

  useEffect(() => {
    if (!map || !drawing) return;

    const manager = new drawing.DrawingManager({
      drawingMode: drawingMode ?? null,
      drawingControl: false,
      polylineOptions: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      },
      polygonOptions: {
        fillColor: "#00FF00",
        fillOpacity: 0.35,
        strokeColor: "#00FF00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      },
      circleOptions: {
        fillColor: "#0000FF",
        fillOpacity: 0.35,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      },
      rectangleOptions: {
        fillColor: "#FFA500",
        fillOpacity: 0.35,
        strokeColor: "#FFA500",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      }
    });

    manager.setMap(map);
    managerRef.current = manager;

    const overlayCompleteListener = manager.addListener(
      "overlaycomplete",
      (e: any) => {
        const overlay = e.overlay;
        const type = e.type;
        const id = generateId();

        overlayByIdRef.current.set(id, overlay);
        idByOverlayRef.current.set(overlay, id);

        wireOverlayListeners(overlay, type, id);
        emitChange(overlay, type);
        if (onDrawingModeChange) onDrawingModeChange(null);
      }
    );

    if (onReady) onReady();

    return () => {
      if (overlayCompleteListener) overlayCompleteListener.remove();
      manager.setMap(null);
      managerRef.current = null;
    };
  }, [
    map,
    drawing,
    drawingMode,
    onDrawingModeChange,
    onReady,
    wireOverlayListeners,
    emitChange
  ]);

  useEffect(() => {
    if (!managerRef.current) return;
    managerRef.current.setDrawingMode(drawingMode ?? null);
  }, [drawingMode]);

  // Helper function to calculate circle center and radius from polygon coordinates
  const calculateCircleFromPolygonCoords = useCallback(
    (coordinates: any[], gmaps: any) => {
      const points = coordinates.map(([lng, lat]: any) => ({ lat, lng }));

      // Calculate center as average of all points
      const center = points.reduce(
        (acc, point) => ({
          lat: acc.lat + point.lat / points.length,
          lng: acc.lng + point.lng / points.length
        }),
        { lat: 0, lng: 0 }
      );

      // For a circle, all points should be roughly the same distance from center
      // Take the average distance as radius
      let radius = 0;
      if (points.length > 0) {
        for (let i = 0; i < points.length; i++) {
          radius += gmaps.geometry.spherical.computeDistanceBetween(
            new gmaps.LatLng(center.lat, center.lng),
            new gmaps.LatLng(points[i].lat, points[i].lng)
          );
        }
        radius /= points.length;
      }

      return { center, radius };
    },
    []
  );

  // Render initial features (e.g., polygons/lines) when provided
  useEffect(() => {
    if (!map || !window.google) return;
    const gmaps = window.google.maps;

    // Clear existing overlays before re-rendering
    overlayByIdRef.current.forEach((overlay) => {
      overlay.setMap(null);
    });
    overlayByIdRef.current.clear();

    features?.forEach((f: any) => {
      if (!f) return;

      const id = f.properties?.id;
      const kind = f.properties?.kind;
      const geom = f.geometry;

      if (!id || !geom || !geom.type) return;

      // Remove existing overlay with this ID if it exists
      if (overlayByIdRef.current.has(id)) {
        const existingOverlay = overlayByIdRef.current.get(id);
        if (existingOverlay) existingOverlay.setMap(null);
        overlayByIdRef.current.delete(id);
      }

      if (kind === "circle" || geom.properties?.type === "circle") {
        // Handle circle
        if (geom.type === "Polygon" && Array.isArray(geom.coordinates?.[0])) {
          // Calculate circle parameters from polygon points
          const { center, radius } = calculateCircleFromPolygonCoords(
            geom.coordinates[0],
            gmaps
          );

          const circle = new gmaps.Circle({
            map,
            center,
            radius,
            fillColor: "#0000FF",
            fillOpacity: 0.35,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            editable: true,
            clickable: true,
            zIndex: 1
          });

          overlayByIdRef.current.set(id, circle);
          idByOverlayRef.current.set(circle, id);
          wireOverlayListeners(circle, "circle", id);
        }
      } else if (
        kind === "rectangle" ||
        geom.properties?.type === "rectangle"
      ) {
        // Handle rectangle
        if (geom.type === "Polygon" && Array.isArray(geom.coordinates?.[0])) {
          // For a rectangle in GeoJSON, the points are typically stored in this order:
          // [sw.lng, ne.lat], [ne.lng, ne.lat], [ne.lng, sw.lat], [sw.lng, sw.lat], [sw.lng, ne.lat]
          // Or sometimes as a different starting point but same sequence
          const points = geom.coordinates[0];

          // Create bounds using min/max values to be robust against different point orderings
          let minLat = Infinity,
            maxLat = -Infinity;
          let minLng = Infinity,
            maxLng = -Infinity;

          points.forEach(([lng, lat]: [number, number]) => {
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);
          });

          const bounds = new gmaps.LatLngBounds(
            { lat: minLat, lng: minLng }, // southwest
            { lat: maxLat, lng: maxLng } // northeast
          );

          const rectangle = new gmaps.Rectangle({
            map,
            bounds,
            fillColor: "#FFA500",
            fillOpacity: 0.35,
            strokeColor: "#FFA500",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            editable: true,
            clickable: true,
            zIndex: 1
          });

          overlayByIdRef.current.set(id, rectangle);
          idByOverlayRef.current.set(rectangle, id);
          wireOverlayListeners(rectangle, "rectangle", id);
        }
      } else if (
        geom.type === "Polygon" &&
        Array.isArray(geom.coordinates?.[0])
      ) {
        // Handle polygon
        const path = geom.coordinates[0].map(([lng, lat]: any) => ({
          lat,
          lng
        }));
        const polygon = new gmaps.Polygon({
          paths: path,
          map,
          fillColor: "#00FF00",
          fillOpacity: 0.35,
          strokeColor: "#00FF00",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          editable: true,
          clickable: true,
          zIndex: 1
        });
        overlayByIdRef.current.set(id, polygon);
        idByOverlayRef.current.set(polygon, id);
        wireOverlayListeners(polygon, "polygon", id);
      } else if (
        geom.type === "LineString" &&
        Array.isArray(geom.coordinates)
      ) {
        // Handle polyline
        const path = geom.coordinates.map(([lng, lat]: any) => ({ lat, lng }));
        const polyline = new gmaps.Polyline({
          path,
          map,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          editable: true,
          clickable: true,
          zIndex: 1
        });
        overlayByIdRef.current.set(id, polyline);
        idByOverlayRef.current.set(polyline, id);
        wireOverlayListeners(polyline, "polyline", id);
      }
    });
  }, [features, map, wireOverlayListeners, calculateCircleFromPolygonCoords]);

  return null;
}

export default React.memo(InteractiveMap);
