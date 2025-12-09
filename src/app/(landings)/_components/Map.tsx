"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

interface Location {
  id: number;
  title: string;
  status: string;
  position: {
    lat: number;
    lng: number;
  };
}
export default function Map({
  locations = [],
  onMarkerClick
}: {
  locations?: Location[];
  onMarkerClick?: (id: number) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Google maps setup
  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"]
    });
    const mapOptions = {
      center: {
        lat: 38.2527, // Louisville, Kentucky coordinates
        lng: -85.7585
      },
      zoom: 12, // Adjusted zoom level for city view
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    };

    // Initialize the map when the component mounts
    loader
      .load()
      .then((google) => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, mapOptions);

          // Add markers for each location
          locations.forEach((location) => {
            const markerColors: Record<string, string> = {
              UNPAID: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              PENDING:
                "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              INPROGRESS:
                "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              COMPLETED:
                "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              CANCELLED: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            };

            const marker = new google.maps.Marker({
              position: location.position,
              map: map,
              title: location.title,
              icon: location.status ? markerColors[location.status] : undefined
            });
            marker.addListener("click", () => {
              if (onMarkerClick) {
                onMarkerClick(location.id);
              }
            });
          });
        }
      })
      .catch((e) => {
        console.error("Error loading Google Maps:", e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, locations]);
  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      className="bg-gray-100 rounded-lg"
    >
      {/* Map will be rendered here */}
    </div>
  );
}
