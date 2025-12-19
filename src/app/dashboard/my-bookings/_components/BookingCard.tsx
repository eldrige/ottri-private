"use client";
import React, { useState } from "react";
import Image from "next/image";

import cleanerPlacholderImage from "@/assets/cleaner-placeholder.png";
import { ClockIcon } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Booking } from "../../_utils/types";
import { formatDate } from "@/lib/utils";
import { formatHour24To12, formatName } from "../../_utils/helpers";
import { useCancelBookingMutation } from "../../_services/mutations";
import BookingDetails from "@/app/admin/(authed)/bookings/_components/BookingDetails";
import { BookingStatusLabels } from "@/app/admin/types";

type BookingCardProps = Pick<
  Booking,
  | "id"
  | "serviceType"
  | "cleaners"
  | "timeSlot"
  | "address"
  | "status"
  | "price"
  | "review"
>;

export default function BookingCard({
  service,
  setIsOpen,
  setBookedServiceOnRating
}: {
  service: BookingCardProps;
  setIsOpen?: (isOpen: boolean) => void;
  setBookedServiceOnRating?: (
    service: Pick<
      Booking,
      | "id"
      | "serviceType"
      | "cleaners"
      | "timeSlot"
      | "address"
      | "status"
      | "price"
    >
  ) => void;
}) {
  const { mutateAsync: handleCancel, isPending } = useCancelBookingMutation();

  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);

  return (
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <MobileBookingCard
          setShowBookingDetailsModal={setShowBookingDetailsModal}
          {...service}
          setIsOpen={setIsOpen}
          setBookedServiceOnRating={setBookedServiceOnRating}
          handleCancel={(e) => {
            e.preventDefault();
            handleCancel({ bookingId: service.id });
          }}
          isPendingCancel={isPending}
        />
      </div>
      <div className="hidden xl:flex gap-4">
        <DesktopBookingCard
          setShowBookingDetailsModal={setShowBookingDetailsModal}
          {...service}
          setIsOpen={setIsOpen}
          setBookedServiceOnRating={setBookedServiceOnRating}
          handleCancel={(e) => {
            e.preventDefault();
            handleCancel({ bookingId: service.id });
          }}
          isPendingCancel={isPending}
        />
      </div>

      {showBookingDetailsModal && (
        <BookingDetails
          bookingId={service.id}
          onClose={() => setShowBookingDetailsModal(false)}
          variant={"user"}
        />
      )}
    </>
  );
}

function DesktopBookingCard({
  id,
  serviceType,
  cleaners,
  timeSlot,
  address,
  status,
  price,
  setIsOpen,
  setBookedServiceOnRating,
  handleCancel,
  isPendingCancel,
  review,
  setShowBookingDetailsModal
}: BookingCardProps & {
  setIsOpen?: (isOpen: boolean) => void;
  setShowBookingDetailsModal: (show: boolean) => void;
  setBookedServiceOnRating?: (
    service: Pick<
      Booking,
      | "id"
      | "serviceType"
      | "timeSlot"
      | "address"
      | "cleaners"
      | "status"
      | "price"
    >
  ) => void;
  handleCancel?: (e: React.FormEvent) => void;
  isPendingCancel?: boolean;
}) {
  const isReviewed = Boolean(review);
  return (
    <>
      <div className="w-full">
        <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
          <div className="flex gap-4 items-center">
            <Image
              className="object-cover rounded-full w-13.5 aspect-square"
              src={cleaners[0]?.profile || cleanerPlacholderImage}
              alt={"cleaner profile"}
              width={100}
              height={100}
            />
            <div className="flex cursor-pointer gap-1 flex-col">
              <h1
                onClick={() => setShowBookingDetailsModal(true)}
                className="cursor-pointer hover:text-secondary-900 font-medium text-body  text-secondary-700"
              >
                {formatName(serviceType.name)}
              </h1>
              <div className="flex *:text-surface-500 items-center *:text-caption">
                <p>{cleaners[0]?.fullName || "No Cleaner"}</p>
                <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
                <p>{formatDate(timeSlot.date)}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                  <ClockIcon className="text-surface-500/50 size-4" />
                  <p className="text-nowrap">
                    {formatHour24To12(timeSlot.startTime)} -{" "}
                    {formatHour24To12(timeSlot.endTime)}
                  </p>
                </div>
                <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                  <LocationIcon className="text-surface-500/50 size-4" />
                  <p className="text-nowrap">{address}</p>
                </div>
              </div>
            </div>
            {status === "INPROGRESS" ? (
              <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                {BookingStatusLabels[status]}
              </Badge>
            ) : status === "PENDING" || status === "UNPAID" ? (
              <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                {BookingStatusLabels[status]}
              </Badge>
            ) : status === "COMPLETED" ? (
              <Badge className="bg-badge-green-opac text-caption items-center px-4 py-1 text-badge-green rounded-lg flex border-0 gap-2">
                {BookingStatusLabels[status]}
              </Badge>
            ) : (
              status === "CANCELLED" && (
                <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  {BookingStatusLabels[status]}
                </Badge>
              )
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex w-full items-center gap-5">
              <p>${price}</p>
              {status !== "COMPLETED" && status !== "CANCELLED"
                ? handleCancel && (
                    <Button
                      onClick={handleCancel}
                      disabled={isPendingCancel}
                      size={"xs"}
                      className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
                      variant={"outline"}
                    >
                      {isPendingCancel ? "Cancelling..." : "Cancel"}
                    </Button>
                  )
                : setIsOpen &&
                  setBookedServiceOnRating && (
                    <Button
                      disabled={isReviewed || status !== "COMPLETED"}
                      onClick={() => {
                        setBookedServiceOnRating({
                          id,
                          serviceType,
                          cleaners,
                          timeSlot,
                          address,
                          status,
                          price
                        });
                        setIsOpen(true);
                      }}
                      size={"xs"}
                      className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                    >
                      {"Rate Cleaning"}
                    </Button>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileBookingCard({
  id,
  serviceType,
  cleaners,
  timeSlot,
  address,
  status,
  price,
  setIsOpen,
  setBookedServiceOnRating,
  handleCancel,
  isPendingCancel,
  review,
  setShowBookingDetailsModal
}: BookingCardProps & {
  setIsOpen?: (isOpen: boolean) => void;
  setShowBookingDetailsModal: (show: boolean) => void;
  setBookedServiceOnRating?: (
    service: Pick<
      Booking,
      | "id"
      | "serviceType"
      | "timeSlot"
      | "address"
      | "cleaners"
      | "status"
      | "price"
    >
  ) => void;
  handleCancel?: (e: React.FormEvent) => void;
  isPendingCancel?: boolean;
}) {
  const isReviewed = Boolean(review);
  return (
    <div className="flex flex-col px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
      <div className="flex gap-4 w-full items-center">
        <div className="flex w-full cursor-pointer gap-1 flex-col">
          <div className="flex justify-between  items-center gap-4 mb-2 w-full">
            <div className="flex gap-2 items-center">
              <h1
                onClick={() => setShowBookingDetailsModal(true)}
                className="font-medium hover:text-secondary-800 text-body text-secondary-700"
              >
                {formatName(serviceType.name)}
              </h1>
              {status === "INPROGRESS" ? (
                <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  {BookingStatusLabels[status]}
                </Badge>
              ) : status === "PENDING" || status === "UNPAID" ? (
                <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  {BookingStatusLabels[status]}
                </Badge>
              ) : status === "COMPLETED" ? (
                <Badge className="bg-badge-green-opac text-caption items-center px-4 py-1 text-badge-green rounded-lg flex border-0 gap-2">
                  {BookingStatusLabels[status]}
                </Badge>
              ) : (
                status === "CANCELLED" && (
                  <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                    {BookingStatusLabels[status]}
                  </Badge>
                )
              )}
            </div>
            <p className="text-body font-medium text-secondary-700">${price}</p>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-caption">
            <p>{cleaners[0]?.fullName || "No Cleaner"}</p>
            <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
            <p>{formatDate(timeSlot.date)}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
              <ClockIcon className="text-surface-500/50 size-4" />
              <p className="text-nowrap">
                {formatHour24To12(timeSlot.startTime)} -{" "}
                {formatHour24To12(timeSlot.endTime)}
              </p>
            </div>
            <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
              <LocationIcon className="text-surface-500/50 size-4" />
              <p className="text-nowrap">{address}</p>
            </div>
          </div>
        </div>
      </div>
      {status !== "COMPLETED" && status !== "CANCELLED"
        ? handleCancel && (
            <Button
              onClick={handleCancel}
              disabled={isPendingCancel}
              size={"xs"}
              className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
              variant={"outline"}
            >
              {isPendingCancel ? "Cancelling..." : "Cancel"}
            </Button>
          )
        : setIsOpen &&
          setBookedServiceOnRating && (
            <Button
              disabled={isReviewed}
              onClick={() => {
                setBookedServiceOnRating({
                  id,
                  serviceType,
                  cleaners,
                  timeSlot,
                  address,
                  status,
                  price
                });
                setIsOpen(true);
              }}
              size={"xs"}
              className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
            >
              {"Rate Cleaning"}
            </Button>
          )}
    </div>
  );
}
