import React from "react";
import BookingCard from "./BookingCard";
import { FilterIcon } from "lucide-react";
import { ServiceBooked } from "@/lib/types";

import userImage from "@/assets/user-profile-figure.png";

export default function MyBookingSection4() {
  const bookedServices: Omit<ServiceBooked, "rating">[] = [
    {
      serviceName: "Standard Cleaning",
      cleanerName: "Sarah Johnson",
      cleanerImage: userImage,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Apt 4B",
      state: "complete",
      price: 75,
    },
    {
      serviceName: "Standard Cleaning",
      cleanerName: "Sarah Johnson",
      cleanerImage: userImage,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Apt 4B",
      state: "complete",
      price: 45,
    },
    {
      serviceName: "Deep Cleaning",
      cleanerName: "John Doe",
      cleanerImage: userImage,
      date: "May 17, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "456 Elm St, Apt 2A",
      state: "complete",
      price: 45,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Past Appointments
              </h1>
              <h3 className="text-caption text-secondary-800">
                Your past cleaning sessions
              </h3>
            </div>
            <div className="justify-end">
              <div className="flex  text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
                <FilterIcon size={16} />
                <select className="" name="filter" id="">
                  <option value="all">Completed</option>
                  <option value="today">Canceled</option>
                  <option value="upcoming">Pending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {bookedServices.map((service, index) => (
              <BookingCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
