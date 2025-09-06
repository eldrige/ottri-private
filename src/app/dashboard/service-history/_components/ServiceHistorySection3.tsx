import React from "react";
import { ServiceBooked } from "@/lib/types";
import ServiceHistoryCard from "./ServiceHistoryCard";

export default function ServiceHistorySection3() {
  const historyServices: ServiceBooked[] = [
    {
      serviceName: "Deep Cleaning",
      cleanerName: "John Doe",
      cleanerImage: undefined,
      price: 75,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      review: "“Excellent service, very thoughtful”",
      location: "123 Main St, City, Country",
      state: "complete",
      rating: 3
    },
    {
      serviceName: "Deep Cleaning",
      cleanerName: "John Doe",
      cleanerImage: undefined,
      price: 75,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      review: "“Excellent service, very thoughtful”",
      location: "123 Main St, City, Country",
      state: "complete",
      rating: 5
    },
    {
      serviceName: "Deep Cleaning",
      cleanerName: "John Doe",
      cleanerImage: undefined,
      price: 75,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      review: "“Excellent service, very thoughtful”",
      location: "123 Main St, City, Country",
      state: "complete",
      rating: 5
    }
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Completed Services
              </h3>
              <h3 className="text-caption text-secondary-800">
                Your cleaning history with ratings and reviews
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {historyServices.map((service, index) => (
              <ServiceHistoryCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
