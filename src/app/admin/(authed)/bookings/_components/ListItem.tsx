"use client";
import { Booking } from "@/app/admin/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import BookingActions from "../../_components/BookingActions";

interface StatusType {
  label: string;
  value: string;
}

export default function ListItem({
  status,
  booking
}: {
  status: StatusType;
  booking: Booking;
}) {
  const bookingName =
    booking.guest?.fullName ||
    booking.user?.personalInformation?.fullName ||
    "";
  const bookingNumber = booking.id;
  const service = booking.serviceType.name;
  const dateTime = format(
    new Date(booking.timeSlot.date),
    "dd-MM-yyyy 'at' h:mm a"
  );
  const cleaners = booking.cleaners;
  const address = booking.address;
  const phone =
    booking.guest?.phoneNumber ||
    booking.user?.personalInformation?.phoneNumber ||
    "";
  const price = booking.price || 0;
  const notes = [
    booking.otherAddOns,
    booking.petsInstructions,
    booking.entryInstructions
  ]
    .filter((i) => i)
    .join(", ");

  return (
    <div className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-medium">{bookingName || "Guest"}</span>
          <div
            className={cn(
              "py-1.5 px-3 text-sm rounded-md inline-flex items-center",
              status.value === "PENDING" || booking.status === "UNPAID"
                ? "bg-warning/20 text-warning-text"
                : status.value === "INPROGRESS"
                  ? "bg-info/20 text-info-text"
                  : status.value === "COMPLETED"
                    ? "bg-success/10 text-success"
                    : status.value === "CANCELLED"
                      ? "bg-error/10 text-error"
                      : ""
            )}
          >
            {status.label}
          </div>
          <span className="text-xs text-secondary-700/70">
            #{bookingNumber.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="mt-4 lg:mt-6 text-xs flex flex-wrap gap-x-8 gap-y-4">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Service:</span>
              <span className="capitalize">{service}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Date & Time:</span>
              <span>{dateTime}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Cleaners:</span>
              {cleaners?.length ? (
                cleaners.map((i) => i.fullName).join(", ")
              ) : (
                <span className="text-error">Unassigned</span>
              )}
            </p>
            {notes && (
              <p className="mt-2 text-xs text-secondary-700/70">
                <span className="font-medium mr-2">Notes:</span>
                <span>{notes}</span>
              </p>
            )}
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Address:</span>
              <span>{address}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Phone:</span>
              <span>{phone}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Price:</span>
              <span>${price}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-end">
        <BookingActions booking={booking} />
      </div>
    </div>
  );
}
