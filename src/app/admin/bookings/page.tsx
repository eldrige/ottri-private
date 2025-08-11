import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Filter, ListIcon, PlusIcon } from "lucide-react";
import React from "react";

export default function AdminBookingsPage() {
  return (
    <main className="w-full h-full py-4 px-6">
      <div className="flex justify-between items-center">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10" />

      <div className="flex items-center justify-between gap-6">
        <button className="flex gap-4 items-center text-sm font-medium py-2 px-4 bg-surface-50 rounded-lg">
          <Filter className="size-4" />
          All Bookings
          <ChevronDown className="size-4 text-secondary-700/50" />
        </button>
        <Button
          size={"2xs"}
          variant={"secondary"}
          className="flex gap-2 items-center"
        >
          <PlusIcon /> New Booking
        </Button>
      </div>

      <div className="w-full mt-8 py-2 px-3 flex gap-4 rounded-4xl bg-surface-50">
        <button className="flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 bg-white">
          <CalendarIcon className="size-4" />
          Calendar View
        </button>
        <button className="flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 text-secondary-700/70">
          <ListIcon className="size-4" />
          List View
        </button>
        <button className="flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 text-secondary-700/70">
          <LocationIcon className="size-4" />
          Map View
        </button>
      </div>

      <div className="mt-8 p-6 border border-black/10 rounded-lg">
        <h4 className="text-heading-5">Calendar Grid View</h4>

        <div className="mt-8 grid grid-cols-7 gap-2 font-medium">
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>
          <div className="p-2 mb-2 border-b border-black/10">
            <p className="text-center ">Sun</p>
          </div>

          {[
            27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
          ].map((day, idx) => (
            <div
              key={idx}
              className="p-2 min-h-18 border border-black/10 rounded-lg"
            >
              <p className="">{day}</p>
              {day === 29 && idx !== 2 && (
                <div className="space-y-1 text-tiny">
                  <div className="p-2 rounded-lg bg-info/10 text-info-text">
                    9:00 AM - Maria Garcia
                  </div>
                  <div className="p-2 rounded-lg bg-warning/10 text-warning-text">
                    11:00 AM - Jon Doe
                  </div>
                  <div className="p-2 rounded-lg bg-success/10 text-success">
                    2:00 PM - Emma Lee
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
