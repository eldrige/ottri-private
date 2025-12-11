"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PhoneIcon,
  PlayIcon,
  CheckIcon,
  TrashIcon,
  UserPlusIcon,
  EyeIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Booking } from "@/app/admin/types";
import {
  useCancelBookingMutation,
  useCompleteBookingMutation,
  useStartBookingMutation
} from "../_services/mutations";
import EditBooking from "../bookings/_components/EditBooking";
import AssignCleaner from "../bookings/_components/AssignCleaner";
import ConfirmModal from "@/components/common/ConfirmModal";
import BookingDetails from "../bookings/_components/BookingDetails";
import Checkbox from "@/components/ui/Checkbox";

interface BookingActionsProps {
  booking: Booking;
}

export default function BookingActions({ booking }: BookingActionsProps) {
  const { mutateAsync: mutateCancel, isPending: isCancelling } =
    useCancelBookingMutation();
  const { mutateAsync: mutateStart, isPending: isStarting } =
    useStartBookingMutation();
  const { mutateAsync: mutateComplete, isPending: isCompleting } =
    useCompleteBookingMutation();

  const [editBooking, setEditBooking] = useState(false);
  const [assignCleaners, setAssignCleaners] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const status = booking.status;
  const isAdmin = booking.user?.role === "ADMIN";
  const hasCleaners = booking.cleaners.length > 0;
  const bookingNumber = booking.id;

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <EllipsisVerticalIcon className="size-5 text-secondary-700" />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {/* View Details */}
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => setShowDetails(true)}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2 text-sm",
                    focus ? "bg-gray-100" : ""
                  )}
                >
                  <EyeIcon className="size-4" />
                  View Details
                </button>
              )}
            </MenuItem>

            {/* Edit - Admin only */}
            {isAdmin && (
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => setEditBooking(true)}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-2 text-sm",
                      focus ? "bg-gray-100" : ""
                    )}
                  >
                    <PencilIcon className="size-4" />
                    Edit
                  </button>
                )}
              </MenuItem>
            )}

            {/* Call */}
            <MenuItem>
              {({ focus }) => (
                <button
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2 text-sm",
                    focus ? "bg-gray-100" : ""
                  )}
                >
                  <PhoneIcon className="size-4" />
                  Call
                </button>
              )}
            </MenuItem>

            {/* Assign Cleaner */}
            {!hasCleaners && (status === "PENDING" || status === "UNPAID") && (
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => setAssignCleaners(true)}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-2 text-sm",
                      focus ? "bg-gray-100" : ""
                    )}
                  >
                    <UserPlusIcon className="size-4" />
                    Assign Cleaner
                  </button>
                )}
              </MenuItem>
            )}

            {/* Start - Pending with cleaners */}
            {status === "PENDING" && hasCleaners && (
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => mutateStart({ bookingId: booking.id })}
                    disabled={isStarting}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-2 text-sm text-success",
                      focus ? "bg-gray-100" : "",
                      isStarting ? "opacity-50 cursor-not-allowed" : ""
                    )}
                  >
                    <PlayIcon className="size-4" />
                    {isStarting ? "Starting..." : "Start"}
                  </button>
                )}
              </MenuItem>
            )}

            {/* Complete - In Progress */}
            {status === "INPROGRESS" && (
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => mutateComplete({ bookingId: booking.id })}
                    disabled={isCompleting}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-2 text-sm text-success",
                      focus ? "bg-gray-100" : "",
                      isCompleting ? "opacity-50 cursor-not-allowed" : ""
                    )}
                  >
                    <CheckIcon className="size-4" />
                    {isCompleting ? "Completing..." : "Complete"}
                  </button>
                )}
              </MenuItem>
            )}

            {/* Cancel - Not cancelled or completed */}
            {status !== "CANCELLED" && status !== "COMPLETED" && (
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => setConfirmCancel(true)}
                    disabled={isCancelling}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-2 text-sm text-error",
                      focus ? "bg-gray-100" : "",
                      isCancelling ? "opacity-50 cursor-not-allowed" : ""
                    )}
                  >
                    <TrashIcon className="size-4" />
                    {isCancelling ? "Cancelling..." : "Cancel"}
                  </button>
                )}
              </MenuItem>
            )}
          </div>
        </MenuItems>
      </Menu>

      {editBooking && (
        <EditBooking booking={booking} onClose={() => setEditBooking(false)} />
      )}
      {assignCleaners && (
        <AssignCleaner
          booking={booking}
          onClose={() => setAssignCleaners(false)}
        />
      )}
      {confirmCancel && (
        <ConfirmModal
          accent="destructive"
          title="Cancel Booking"
          description={`Are you sure you want to cancel booking #${bookingNumber.toString().padStart(3, "0")}? This action cannot be undone.`}
          onCancel={() => setConfirmCancel(false)}
          onConfirm={async () => {
            await mutateCancel({
              bookingId: booking.id,
              unsubscribe: unsubscribe
            });
            setConfirmCancel(false);
          }}
          loading={isCancelling}
          open={confirmCancel}
        >
          <div className="mb-6 flex items-center gap-2">
            <Checkbox
              id="unsubscribe"
              checked={unsubscribe}
              onChange={(e) => setUnsubscribe(e.target.checked)}
              disabled={isCancelling}
              label="Unsubscribe from cleaning service"
              accent="secondary"
            />
          </div>
        </ConfirmModal>
      )}
      {showDetails && (
        <BookingDetails
          bookingId={booking.id}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
