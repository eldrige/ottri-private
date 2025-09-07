import { Button } from "@/components/ui/Button";
import React from "react";
import { FilterIcon, PlusIcon } from "lucide-react";
import BookingCard from "./BookingCard";
import { Booking } from "../../_utils/types";

export default function MyBookingSection3({
  upcomingBookings
}: {
  upcomingBookings: Booking[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
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
            {upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} service={{ ...booking }} />
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
