"use client";
import { Button } from "@/components/ui/Button";
import { StarIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Booking } from "../../_utils/types";
import { formatDate } from "@/lib/utils";
import { formatHour24To12, formatName } from "../../_utils/helpers";
import { useRateBookingMutation } from "../../_services/mutations";

export default function RatingPopUp({
  booking,
  onClose
}: {
  booking: Pick<
    Booking,
    | "id"
    | "serviceType"
    | "timeSlot"
    | "address"
    | "cleaners"
    | "status"
    | "price"
  >;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [value, setValue] = useState(50);
  const [comment, setComment] = useState("");
  const { mutateAsync: rateBooking, isPending } = useRateBookingMutation();

  return (
    <div className="bg-white p-3 md:p-6 rounded-lg shadow-lg w-full md:max-w-2xl">
      <div className="flex justify-between">
        <h3 className="font-bold text-secondary-700 text-xl">
          Review & Ratings
        </h3>
        <XIcon
          onClick={onClose}
          className="cursor-pointer text-secondary-500"
        />
      </div>
      <div className="bg-[#F7F8F8] flex flex-col gap-1 text-secondary-700 md:text-nowrap rounded-lg p-4 mt-4">
        <h3>
          <span className="font-medium">Date & Time:</span>{" "}
          {formatDate(booking.timeSlot.date)} at{" "}
          {formatHour24To12(booking.timeSlot.startTime)}
        </h3>
        <h3>
          <span className="font-medium">Address:</span> {booking.address}
        </h3>
        <h3>
          <span className="font-medium">Service:</span>{" "}
          {formatName(booking.serviceType.name)}
        </h3>
      </div>
      <div className="flex text-secondary-700 items-center flex-col gap-4 my-4">
        <h3>How do you rate the job done by the cleanersdf?</h3>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              className={`stroke-[1.5px] cursor-pointer ${index < hover || index < rating ? "fill-[#FBC503] text-[#FBC503]" : "text-secondary-700"}`}
              size={24}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <div className="w-full mt-4">
          <div className="w-full flex justify-between">
            <h3 className="text-secondary-700 mb-2">Job Completion Rate:</h3>
            <span className="ml-2 font-medium">{value}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setValue(newValue);
            }}
            className="w-full accent-secondary-700 cursor-pointer"
          />
        </div>
        <div className="flex-col flex w-full t">
          <h3>Complaints (optional)</h3>
          <textarea
            placeholder="Write your review here..."
            datatype="text"
            translate="yes"
            className="w-full bg-[#F7F8F8] rounded-lg px-3 py-2 min-h-30 max-h-30"
            name=""
            id=""
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>
      <Button
        disabled={isPending || rating === 0 || comment.trim().length === 0}
        onClick={async () => {
          await rateBooking({
            bookingId: booking.id,
            rating,
            comment: comment.trim(),
            completionRate: value
          });
          onClose();
        }}
        size={"xs"}
        className="w-full py-3"
      >
        {isPending ? "Rating..." : "Rate Job"}
      </Button>
    </div>
  );
}
