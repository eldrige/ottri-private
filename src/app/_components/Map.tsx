"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function Map({ apiKey }: { apiKey: string; }) {
  const mapRef = useRef<HTMLDivElement>(null)

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

          // Example: Add markers for the locations mentioned in LandingSection7
          const locations = [
            { title: "Downtown", position: { lat: 38.2527, lng: -85.7585 } },
            { title: "Suburban Hills", position: { lat: 38.2794, lng: -85.6389 } }, // East End area
            { title: "Riverside", position: { lat: 38.2680, lng: -85.7798 } }, // Ohio River area
            { title: "Westside", position: { lat: 38.2484, lng: -85.8229 } }, // West Louisville
            { title: "North Valley", position: { lat: 38.2921, lng: -85.7430 } } // Clifton/Crescent Hill area
          ];

          // Add markers for each location
          locations.forEach(location => {
            new google.maps.Marker({
              position: location.position,
              map: map,
              title: location.title
            });
          });
        }
      })
      .catch(e => {
        console.error("Error loading Google Maps:", e);
      });
  }, [apiKey]);
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
