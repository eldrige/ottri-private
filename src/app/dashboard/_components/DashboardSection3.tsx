import { Button } from "@/components/ui/Button";
import React from "react";
import ServiceCard, { AppointmentCard } from "./ServiceCard";
import { PlusIcon } from "lucide-react";
import { ServiceBooked } from "@/lib/types";
import userImage from "@/assets/user-profile-figure.png";

export default function DashboardSection3() {
  const bookedServices: ServiceBooked[] = [
    {
      serviceName: "Standard Cleaning",
      cleanerName: "Sarah Johnson",
      cleanerImage: userImage,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Apt 4B",
      state: "complete",
      rating: 5,
    },
    {
      serviceName: "Standard Cleaning",
      cleanerName: "Sarah Johnson",
      cleanerImage: userImage,
      date: "May 16, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Apt 4B",
      state: "complete",
      rating: 5,
    },
    {
      serviceName: "Deep Cleaning",
      cleanerName: "John Doe",
      cleanerImage: userImage,
      date: "May 17, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "456 Elm St, Apt 2A",
      state: "scheduled",
      rating: 4,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 *:flex-1/2 gap-8">
        <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Recent Bookings
              </h1>
              <h3 className="text-caption text-secondary-800">
                Your latest cleaning appointments
              </h3>
            </div>
            <div className="flex justify-end items-center">
              <Button
                className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                size={"xs"}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {bookedServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
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
            <div className="flex justify-end items-center">
              <Button
                className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                size={"xs"}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {bookedServices.map((service, index) => (
              <AppointmentCard key={index} service={service} />
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
