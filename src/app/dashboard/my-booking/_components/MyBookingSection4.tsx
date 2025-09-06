"use client";
import React, { useState } from "react";
import BookingCard from "./BookingCard";
import { FilterIcon } from "lucide-react";
import RatingPopUp from "./RatingPopUp";
import { Booking } from "../../_utils/types";

export default function MyBookingSection4({
  pastBookings
}: {
  pastBookings: Booking[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookedServiceOnRating, setBookedServiceOnRating] = useState<Booking>(
    pastBookings[0]
  );
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-8">
          <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
              <div>
                <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                  Past Appointments
                </h3>
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
              {pastBookings.length > 0 ? (
                pastBookings.map((service, index) => (
                  <BookingCard
                    key={index}
                    service={service}
                    setIsOpen={setIsOpen}
                    setBookedServiceOnRating={setBookedServiceOnRating}
                  />
                ))
              ) : (
                <div className="text-caption w-full text-center text-secondary-800">
                  No past appointments
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RatingPopUp
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        booking={bookedServiceOnRating}
      />
    </>
  );
}
