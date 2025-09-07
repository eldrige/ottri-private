import Map from "@/app/(landings)/_components/Map";
import React from "react";

export default function MapView() {
  return (
    <div className="mt-4 lg:mt-8 p-4 lg:p-6 border border-black/10 rounded-lg">
      <h4 className="text-heading-5 text-center lg:text-start">
        Map View with Real-Time Status
      </h4>

      <div className="w-full h-[540px] mt-4 lg:mt-8 flex items-center justify-center outline-2 outline-primary-700 outline-dashed outline-offset-2 rounded-lg">
        <Map />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-8">
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-warning" />
          Pending
        </p>
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-info-text" />
          In progress
        </p>
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-success" />
          Completed
        </p>
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-error" />
          Cancelled
        </p>
      </div>
    </div>
  );
}
