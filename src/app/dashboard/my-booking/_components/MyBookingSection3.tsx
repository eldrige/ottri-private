import { Button } from "@/components/ui/Button";
import React from "react";
import userImage from "@/assets/user-profile-figure.png";
import { FilterIcon, PlusIcon } from "lucide-react";
import { ServiceBooked } from "@/lib/types";
import BookingCard from "./BookingCard";

export default function MyBookingSection3() {
  const bookedServices: Omit<ServiceBooked, "rating">[] = [
    {
      serviceName: "Standard Cleaning",
      cleanerName: "Sarah Johnson",
      cleanerImage: userImage,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Apt 4B",
      state: "in-progress",
      price: 75,
    },
    {
      serviceName: "Standard Cleaning",
      cleanerName: "Sarah Johnson",
      cleanerImage: userImage,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Apt 4B",
      state: "pending",
      price: 45,
    },
    {
      serviceName: "Deep Cleaning",
      cleanerName: "John Doe",
      cleanerImage: userImage,
      date: "May 17, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "456 Elm St, Apt 2A",
      state: "scheduled",
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
                Upcoming Appointments
              </h1>
              <h3 className="text-caption text-secondary-800">
                Your scheduled cleaning sessions
              </h3>
            </div>
            <div className="md:justify-end">
              <div className="flex w-fit text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
                <FilterIcon size={16} />
                <select className="w-fit" name="filter" id="">
                  <option value="all">Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {bookedServices.map((service, index) => (
              <BookingCard key={index} service={service} />
            ))}
          </div>
          <Button
            size={"xs"}
            className="w-full flex justify-center gap-3 "
            variant={"outline"}
          >
            <PlusIcon />
            <p>Add Booking</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
