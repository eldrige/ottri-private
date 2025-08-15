import Map from "@/app/(landings)/_components/Map";
import React from "react";

export default function MapView() {
  return (
    <div className="mt-8 lg:p-6 lg:border border-black/10 rounded-lg">
      <h4 className="text-heading-5">Map View with Real-Time Status</h4>

      <div className="w-full max-h-[540px] sm:aspect-square mt-8 flex items-center justify-center outline-2 outline-primary-700 outline-dashed outline-offset-2 rounded-lg">
        <Map />
      </div>

      <div className="flex mt-8">
        <p className="text-subtitle font-medium flex-1">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-warning" />
          Pending
        </p>
        <p className="text-subtitle font-medium flex-1">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-info-text" />
          In progress
        </p>
        <p className="text-subtitle font-medium flex-1">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-success" />
          Completed
        </p>
        <p className="text-subtitle font-medium flex-1">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-error" />
          Cancelled
        </p>
      </div>
    </div>
  );
}
