import { Booking, BookingStatusLabels } from "@/app/admin/types";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { X, User, Calendar, CreditCard, Loader2, InfoIcon } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import CallIcon from "@/components/icons/CallIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import {
  useCancelBookingMutation,
  useCompleteBookingMutation,
  useStartBookingMutation
} from "../../_services/mutations";
import EditBooking from "./EditBooking";
import AssignCleaner from "./AssignCleaner";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useGetBookingQuery } from "../../_services/queries";

export default function BookingDetails({
  bookingId,
  onClose,
  variant = "admin"
}: {
  bookingId: number | string;
  onClose: () => void;
  variant?: "admin" | "user";
}) {
  const { data: booking, error, isLoading } = useGetBookingQuery(bookingId);

  const { mutateAsync: mutateCancel, isPending: isCancelling } =
    useCancelBookingMutation();
  const { mutateAsync: mutateStart, isPending: isStarting } =
    useStartBookingMutation();
  const { mutateAsync: mutateComplete, isPending: isCompleting } =
    useCompleteBookingMutation();

  const [editBooking, setEditBooking] = useState(false);
  const [assignCleaners, setAssignCleaners] = useState<Booking | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  if (isLoading) {
    return (
      <ModalWrapper onClose={onClose}>
        <div
          className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center py-8">
            <Loader2 className="animate-spin size-8 mx-auto"></Loader2>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  if (error || !booking) {
    return (
      <ModalWrapper onClose={onClose}>
        <div
          className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Error</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Failed to load booking details</p>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  const dateTime = format(
    new Date(booking.timeSlot.date),
    "dd-MM-yyyy 'at' h:mm a"
  );

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-success/15 text-success";
      case "INPROGRESS":
        return "bg-info/10 text-info-text";
      case "PENDING":
        return "bg-warning/10 text-warning-text";
      case "UNPAID":
        return "bg-warning/10 text-warning-text";
      case "CANCELLED":
        return "bg-error/10 text-error";
      default:
        return "bg-gray-200";
    }
  };

  const displayId = booking.displayId.slice(0, 9).toUpperCase();

  return (
    <ModalWrapper onClose={onClose}>
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <InfoIcon className="size-6 " />
            <h2 className="text-xl font-bold">Booking Details - {displayId}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:">
            <X className="size-6" />
          </button>
        </div>

        {/* Service Header */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h3 className="font-medium">Ottri Cleaning Service</h3>
            <p className="capitalize text-sm mt-1">
              {booking.serviceType.name}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium ">{displayId}</p>
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getStatusColor(booking.status)}`}
            >
              {BookingStatusLabels[booking.status]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Information */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="size-4 " />
              <h3 className="font-medium ">Client Information</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium ">Name:</span>
                <span className="ml-2 ">
                  {booking.guest?.fullName ||
                    booking.user?.personalInformation?.fullName}
                </span>
              </div>
              <div className="truncate">
                <span className="font-medium">Email:</span>
                <span className="ml-2 w-full">
                  {booking.guest?.email || booking.user?.email}
                </span>
              </div>
              {(booking.guest?.phoneNumber ||
                booking.user?.personalInformation?.phoneNumber) && (
                <div>
                  <span className="font-medium ">Phone:</span>
                  <span className="ml-2 ">
                    {booking.guest?.phoneNumber ||
                      booking.user?.personalInformation?.phoneNumber}
                  </span>
                </div>
              )}
              <div>
                <span className="font-medium ">Address:</span>
                <span className="ml-2 ">{booking.address}</span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="size-4 " />
              <h3 className="font-medium ">Service Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium ">Service:</span>
                <span className="ml-2 capitalize">
                  {booking.serviceType.name}
                </span>
              </div>
              <div>
                <span className="font-medium ">Date:</span>
                <span className="ml-2 ">{dateTime}</span>
              </div>
              <div>
                <span className="font-medium ">Team Size:</span>
                <span className="ml-2 capitalize">
                  {booking.cleaners?.length
                    ? `${booking.cleaners.length} cleaners`
                    : "Unassigned"}
                </span>
              </div>
              <div>
                <span className="font-medium ">Property:</span>
                <span className="ml-2 ">
                  {booking.bedrooms} bed, {booking.bathrooms} bath,{" "}
                  {booking.approximateSquareFootage} sq ft
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3 text-black/10" />

        {/* Payment Information */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="size-4 " />
            <h3 className="font-medium ">Payment Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="">Service Amount:</span>
              <span className="">
                {booking.currency} {booking.servicesPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="">Payment Method:</span>
              <span className="">Credit Card</span>
            </div>

            <div className="flex justify-between">
              <span className="">
                Tax (
                {(
                  (booking.tax /
                    (booking.servicesPrice + booking.addOnsPrice)) *
                  100
                ).toFixed(1)}
                %):
              </span>
              <span className="">
                {booking.currency} {booking.tax}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="">Invoice Date:</span>
              <span className="">
                {format(new Date(booking.createdAt), "yyyy-MM-dd")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="">Tips:</span>
              <span className="">
                {booking.currency} {booking.tip}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="">Due Date:</span>
              <span className="">
                {format(new Date(booking.timeSlot.date), "yyyy-MM-dd")}
              </span>
            </div>

            <div className="flex justify-between font-medium pt-2 border-t border-black/10">
              <span className="">Total Amount:</span>
              <span className="">
                {booking.currency} {booking.price}
              </span>
            </div>
            <div></div>

            {booking.status === "COMPLETED" && (
              <>
                <div className="flex justify-between text-green-600 font-medium col-span-full">
                  <span>Paid On:</span>
                  <span>
                    {format(new Date(booking.updatedAt), "yyyy-MM-dd")}
                  </span>
                </div>
                <div></div>
              </>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {(booking.addOns?.length > 0 ||
          booking.pets ||
          booking.entryMethod ||
          booking.entryInstructions) && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium  mb-3">Additional Information</h4>
            <div className="space-y-2 text-sm">
              {booking.addOns?.length > 0 && (
                <div>
                  <span className="font-medium ">Add-ons:</span>
                  <span className="ml-2 ">
                    {booking.addOns.map((addOn) => addOn.name).join(", ")}
                  </span>
                </div>
              )}
              {booking.pets && (
                <div>
                  <span className="font-medium ">Pets:</span>
                  <span className="ml-2 capitalize">{booking.pets}</span>
                </div>
              )}
              {booking.entryMethod && (
                <div>
                  <span className="font-medium ">Entry Method:</span>
                  <span className="ml-2 capitalize">
                    {booking.entryMethod.toLowerCase()}
                  </span>
                </div>
              )}
              {booking.entryInstructions && (
                <div>
                  <span className="font-medium ">Entry Instructions:</span>
                  <span className="ml-2 ">{booking.entryInstructions}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {booking.user?.role === "ADMIN" && (
            <Button
              variant="outline"
              size="2xs"
              className="flex items-center gap-2"
              onClick={() => setEditBooking(true)}
            >
              <EditIcon className="size-4" />
              Edit
            </Button>
          )}

          {variant === "admin" && (
            <>
              <Button
                variant="outline"
                size="2xs"
                className="flex items-center gap-2"
              >
                <CallIcon className="size-4" />
                Call
              </Button>
              {booking.status === "PENDING" && booking.cleaners.length > 0 && (
                <Button
                  variant="outline"
                  size="2xs"
                  className="flex items-center gap-2 bg-success/15 border-success/30"
                  onClick={() => mutateStart({ bookingId: booking.id })}
                  disabled={isStarting}
                >
                  {isStarting ? "Starting..." : "Start"}
                </Button>
              )}
              {booking.status === "INPROGRESS" && (
                <Button
                  variant="outline"
                  size="2xs"
                  className="flex items-center gap-2 bg-success/15 border-success/30"
                  onClick={() => mutateComplete({ bookingId: booking.id })}
                  disabled={isCompleting}
                >
                  {isCompleting ? "Completing..." : "Complete"}
                </Button>
              )}
              {!booking.cleaners.length &&
                (booking.status === "PENDING" ||
                  booking.status === "UNPAID") && (
                  <Button
                    variant="secondary"
                    size="2xs"
                    onClick={() => setAssignCleaners(booking)}
                  >
                    Assign Cleaner
                  </Button>
                )}
              {booking.status !== "CANCELLED" &&
                booking.status !== "COMPLETED" && (
                  <Button
                    variant="destructive"
                    size="2xs"
                    className="flex items-center gap-2"
                    onClick={() => setConfirmCancel(true)}
                    disabled={isCancelling}
                  >
                    <TrashIcon className="size-4" />
                    {isCancelling ? "Cancelling..." : "Cancel"}
                  </Button>
                )}{" "}
            </>
          )}
        </div>
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
    </ModalWrapper>
  );
}
