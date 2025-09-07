import { Button } from "@/components/ui/Button";
import React from "react";
import ServiceCard, { AppointmentCard } from "./ServiceCard";
import { PlusIcon } from "lucide-react";
import { Booking } from "../_utils/types";

export default function DashboardSection3({
  bookings
}: {
  bookings: Booking[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 *:flex-1/2 gap-8">
        <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Recent Bookings
              </h3>
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
            {bookings.map((booking, index) => (
              <ServiceCard key={index} service={booking} />
            ))}
          </div>
        </div>
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Upcoming Appointments
              </h3>
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
            {bookings.map((service) => (
              <AppointmentCard key={service.id} service={service} />
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
