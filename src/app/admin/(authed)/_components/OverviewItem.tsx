import CallIcon from "@/components/icons/CallIcon";
import React, { useState } from "react";
import { Booking, BookingStatusLabels } from "../../types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import EditIcon from "@/components/icons/EditIcon";
import {
  useCancelBookingMutation,
  useCompleteBookingMutation,
  useStartBookingMutation
} from "../_services/mutations";
import TrashIcon from "@/components/icons/TrashIcon";
import ConfirmModal from "@/components/common/ConfirmModal";
import AssignCleaner from "../bookings/_components/AssignCleaner";
import EditBooking from "../bookings/_components/EditBooking";
import { format } from "date-fns";
import BookingDetails from "../bookings/_components/BookingDetails";

export default function OverviewItem({ booking }: { booking: Booking }) {
  const { mutateAsync: mutateCancel, isPending: isCancelling } =
    useCancelBookingMutation();
  const { mutateAsync: mutateStart, isPending: isStarting } =
    useStartBookingMutation();
  const { mutateAsync: mutateComplete, isPending: isCompleting } =
    useCompleteBookingMutation();

  const [editBooking, setEditBooking] = useState(false);
  const [assignCleaners, setAssignCleaners] = useState<Booking | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formattedFrom = format(
    new Date().setHours(booking.timeSlot.startTime, 0, 0, 0),
    "hh:mm aa"
  );
  const formattedTo = format(
    new Date().setHours(booking.timeSlot.endTime, 0, 0, 0),
    "hh:mm aa"
  );
  return (
    <div className="border border-black/10 rounded-lg py-2 px-4 flex flex-wrap lg:items-center gap-3 justify-between">
      <div className="space-y-1 self-start">
        <p>
          <span className="font-medium">
            {booking.guest?.fullName ||
              booking.customer?.personalInformation.fullName}
          </span>
          <span
            className={cn(
              `text-sm py-1 px-4 ml-3 rounded-lg`,
              booking.status === "INPROGRESS" && "bg-info/20 text-info-text",
              booking.status === "COMPLETED" && "bg-success/20 text-success",
              (booking.status === "PENDING" || booking.status === "UNPAID") &&
                "bg-warning/20 text-warning-text",
              booking.status === "CANCELLED" && "bg-error/20 text-error"
            )}
          >
            {BookingStatusLabels[booking.status]}
          </span>
        </p>
        <p className="text-xs text-secondary-700/70 capitalize">
          {booking.serviceType.name}
          <span className="h-2 w-2 bg-surface-300 inline-block rounded-full mx-2" />
          {formattedFrom} - {formattedTo}
        </p>
        <p className="text-xs text-secondary-700/70">
          Cleaner:
          <span className="ml-2">
            {booking.cleaners.map((i) => i.fullName).join(", ") || "N/A"}
          </span>
        </p>
      </div>
      <div className="flex items-end ml-auto justify-end gap-3">
        {booking.customer?.role === "ADMIN" && (
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
            onClick={() => setEditBooking(!editBooking)}
          >
            <EditIcon className="size-4" />
            Edit
          </Button>
        )}
        <Button
          size="2xs"
          variant={"secondary-outline"}
          className="text-xs flex items-center justify-center gap-1 border-black/10"
        >
          <CallIcon className="size-4" />
          Call
        </Button>
        {booking.status === "PENDING" && booking.cleaners.length > 0 && (
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10 bg-success/15"
            onClick={() => mutateStart({ bookingId: booking.id })}
            disabled={isStarting}
          >
            {isStarting ? "Starting" : "Start"}
          </Button>
        )}
        {booking.status === "INPROGRESS" && (
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10 bg-success/15"
            onClick={() => mutateComplete({ bookingId: booking.id })}
            disabled={isCompleting}
          >
            {isCompleting ? "Completing" : "Complete"}
          </Button>
        )}
        {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
          <Button
            disabled={isCancelling}
            size="2xs"
            variant={"destructive"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
            onClick={() => setConfirmCancel(true)}
          >
            <TrashIcon className="size-4" />
            {isCancelling ? "Cancelling" : "Cancel"}
          </Button>
        )}
        {!booking.cleaners.length &&
          (booking.status === "PENDING" || booking.status === "UNPAID") && (
            <Button
              size={"2xs"}
              variant={"secondary"}
              onClick={() => setAssignCleaners(booking)}
            >
              Assign Cleaner
            </Button>
          )}
        <Button
          size={"2xs"}
          variant={"secondary"}
          onClick={() => setShowDetails(true)}
        >
          Details
        </Button>
      </div>
      {editBooking && (
        <EditBooking booking={booking} onClose={() => setEditBooking(false)} />
      )}
      {assignCleaners && (
        <AssignCleaner
          booking={booking}
          onClose={() => setAssignCleaners(null)}
        />
      )}
      {confirmCancel && (
        <ConfirmModal
          accent="destructive"
          title="Cancel Booking"
          description={`Are you sure you want to cancel booking #${booking.id.toString().padStart(3, "0")}? This action cannot be undone.`}
          onCancel={() => setConfirmCancel(false)}
          onConfirm={async () => {
            await mutateCancel({ bookingId: booking.id });
            setConfirmCancel(false);
          }}
          loading={isCancelling}
          open={confirmCancel}
        />
      )}
      {showDetails && (
        <BookingDetails
          bookingId={booking.id}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}
