import React from "react";
import { AlertTriangle, MapPin } from "lucide-react";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";

// Define the type for a service zone
type ServiceZone = {
  name: string;
  status: "active" | "limited";
  areaType: "Custom Area" | "Circular Zone";
  areaSqMi: number;
  activeBookings: number;
  totalBookings: number;
  zipcodes: string[];
  restrictions: {
    maxDistance: number;
    minBooking: number;
    services: string;
  };
};

// Data representing the service zones from the image
const zones: ServiceZone[] = [
  {
    name: "Downtown Core",
    status: "active",
    areaType: "Custom Area",
    areaSqMi: 12.5,
    activeBookings: 8,
    totalBookings: 156,
    zipcodes: ["1001", "1002", "1003"],
    restrictions: {
      maxDistance: 15,
      minBooking: 50,
      services: "All Services"
    }
  },
  {
    name: "Midtown Area",
    status: "active",
    areaType: "Circular Zone",
    areaSqMi: 8.7,
    activeBookings: 8,
    totalBookings: 156,
    zipcodes: ["10017", "10018", "10019"],
    restrictions: {
      maxDistance: 12,
      minBooking: 60,
      services: "Deep Clean, Regular Clean"
    }
  },
  {
    name: "Uptown District",
    status: "active",
    areaType: "Custom Area",
    areaSqMi: 15.2,
    activeBookings: 8,
    totalBookings: 156,
    zipcodes: ["10025", "10026", "10027"],
    restrictions: {
      maxDistance: 15,
      minBooking: 50,
      services: "All Services"
    }
  },
  {
    name: "Suburban Extension",
    status: "limited",
    areaType: "Circular Zone",
    areaSqMi: 25.8,
    activeBookings: 8,
    totalBookings: 156,
    zipcodes: ["10301", "10302", "10303"],
    restrictions: {
      maxDistance: 15,
      minBooking: 50,
      services: "All Services"
    }
  }
];

export default function ServiceZonesPanel() {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {zones.map((zone, index) => (
        <ZoneCard key={index} zone={zone} />
      ))}
    </div>
  );
}

function ZoneCard({ zone }: { zone: ServiceZone }) {
  return (
    <div className="border border-black/10 rounded-lg p-4 relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{zone.name}</h4>
          {zone.status === "active" ? (
            <CheckBrokenIcon className="text-success size-4" />
          ) : (
            <AlertTriangle className="text-primary-700 size-5" />
          )}
        </div>
        <span
          className={`text-sm px-3 py-1 rounded-lg ${
            zone.status === "active"
              ? "bg-success/10 text-success"
              : "bg-warning/6 text-warning-text"
          }`}
        >
          {zone.status}
        </span>
      </div>

      <div className="text-xs text-secondary-700/70 mb-4">
        {zone.areaType} • {zone.areaSqMi} sq mi
      </div>

      <div className="flex items-start gap-10 mb-4">
        <div>
          <div className="text-xs text-secondary-700/50">Active Bookings</div>
          <div className="mt-1 text-sm">{zone.activeBookings}</div>
        </div>
        <div>
          <div className="text-xs text-secondary-700/50">Total Bookings</div>
          <div className="mt-1 text-sm">{zone.totalBookings}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm mb-2">Zipcodes</div>
        <div className="flex flex-wrap gap-2">
          {zone.zipcodes.map((zipcode, i) => (
            <span
              key={i}
              className="px-4 py-1 rounded-lg text-xs border border-black/10"
            >
              {zipcode}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm mb-2">Restrictions</div>
        <ul className="text-xs space-y-2 text-secondary-700/70">
          <li>• Max distance: {zone.restrictions.maxDistance} miles</li>
          <li>• Min booking: ${zone.restrictions.minBooking}</li>
          <li>• Services: {zone.restrictions.services}</li>
        </ul>
      </div>

      <div className="flex gap-4 mt-4">
        <button className="text-xs flex items-center gap-1 border border-black/10 rounded-lg px-4 py-2 flex-1 justify-center">
          <MapPin className="size-4" /> View
        </button>
        <button className="text-xs flex items-center gap-1 border border-black/10 rounded-lg px-4 py-2 flex-1 justify-center">
          <EditIcon className="size-4" /> Edit
        </button>
        <button className="text-xs flex items-center gap-1 bg-error text-white rounded-lg px-4 py-2 flex-1 justify-center">
          <TrashIcon className="size-4" /> Delete
        </button>
      </div>
    </div>
  );
}
