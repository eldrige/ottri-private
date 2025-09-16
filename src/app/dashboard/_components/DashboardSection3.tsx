import { Button } from "@/components/ui/Button";
import React from "react";
import ServiceCard, { AppointmentCard } from "./ServiceCard";
import { PlusIcon } from "lucide-react";
import { useGetBookingsQuery } from "../_services/queries";
import Link from "next/link";

export default function DashboardSection3() {
  const { data: pastBookings } = useGetBookingsQuery("COMPLETED");
  const { data: upcomingBookings } = useGetBookingsQuery("");
  if (
    !pastBookings ||
    pastBookings.data.length === 0 ||
    !upcomingBookings ||
    upcomingBookings.data.length === 0
  )
    return null;

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
              <Link href="/dashboard/my-bookings">
                <Button
                  className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                  size={"xs"}
                >
                  View All
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {pastBookings.data.map((booking, index) => (
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
              <Link href="/dashboard/my-bookings">
                <Button
                  className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                  size={"xs"}
                >
                  View All
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {upcomingBookings.data.map((service) => (
              <AppointmentCard key={service.id} service={service} />
            ))}
          </div>
          <Link href="/booking/new">
            <Button
              size={"xs"}
              className="w-full flex justify-center gap-3 "
              variant={"outline"}
            >
              <PlusIcon />
              <p>Add Booking</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
