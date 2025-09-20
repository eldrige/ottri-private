"use client";
import React from "react";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { ClockIcon } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Booking } from "../../_utils/types";
import { formatDate } from "@/lib/utils";
import { formatHour24To12, formatName } from "../../_utils/helpers";
import { useCancelBookingMutation } from "../../_services/mutations";
import { useGetBookingReview } from "../../_services/queries";
// import { revalidatePath } from "next/cache";
type BookingCardProps = Pick<
  Booking,
  | "id"
  | "serviceType"
  | "cleaners"
  | "timeSlot"
  | "address"
  | "status"
  | "price"
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
  const { mutateAsync: handleCancel } = useCancelBookingMutation();

  return (
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <MobileBookingCard
          {...service}
          setIsOpen={setIsOpen}
          setBookedServiceOnRating={setBookedServiceOnRating}
          handleCancel={(e) => {
            e.preventDefault();
            handleCancel(service.id);
          }}
        />
      </div>
      <div className="hidden xl:flex gap-4">
        <DesktopBookingCard
          {...service}
          setIsOpen={setIsOpen}
          setBookedServiceOnRating={setBookedServiceOnRating}
          handleCancel={(e) => {
            e.preventDefault();
            handleCancel(service.id);
          }}
        />
      </div>
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
  handleCancel
}: BookingCardProps & {
  setIsOpen?: (isOpen: boolean) => void;
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
}) {
  const { data: review, isLoading } = useGetBookingReview(String(id));
  return (
    <div className="w-full">
      <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full size-12"
            src={cleaners[0]?.image || userImage}
            alt={"user profile"}
          />
          <div className="flex cursor-pointer gap-1 flex-col">
            <h1 className="font-medium text-body text-secondary-700">
              {formatName(serviceType.name)}
            </h1>
            <div className="flex *:text-surface-500 items-center *:text-caption">
              <p>{cleaners[0]?.name || "No Cleaner"}</p>
              <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
              <p>{formatDate(timeSlot.date)}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                <ClockIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">
                  {formatHour24To12(timeSlot.startTime)} -{" "}
                  {formatHour24To12(timeSlot.endTime)}
                </p>
              </div>
              <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                <LocationIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">{address}</p>
              </div>
            </div>
          </div>
          {status === "INPROGRESS" ? (
            <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
              {formatName(status)}
            </Badge>
          ) : status === "PENDING" ? (
            <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
              {formatName(status)}
            </Badge>
          ) : status === "COMPLETED" ? (
            <Badge className="bg-badge-green-opac text-caption items-center px-4 py-1 text-badge-green rounded-lg flex border-0 gap-2">
              {formatName(status)}
            </Badge>
          ) : (
            status === "CANCELLED" && (
              <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                Cancelled
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
                    size={"xs"}
                    className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                )
              : setIsOpen &&
                setBookedServiceOnRating && (
                  <Button
                    disabled={isLoading || Boolean(review)}
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
                    {isLoading ? "Loading..." : "Rate Cleaning"}
                  </Button>
                )}
          </div>
        </div>
      </div>
    </div>
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
  handleCancel
}: BookingCardProps & {
  setIsOpen?: (isOpen: boolean) => void;
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
}) {
  const { data: review, isLoading } = useGetBookingReview(String(id));
  return (
    <div className="flex flex-col px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
      <div className="flex gap-4 w-full items-center">
        <div className="flex w-full cursor-pointer gap-1 flex-col">
          <div className="flex justify-between  items-center gap-4 mb-2 w-full">
            <div className="flex gap-2 items-center">
              <h1 className="font-medium text-body text-secondary-700">
                {formatName(serviceType.name)}
              </h1>
              {status === "INPROGRESS" ? (
                <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  {formatName(status)}
                </Badge>
              ) : status === "PENDING" ? (
                <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  {formatName(status)}
                </Badge>
              ) : status === "COMPLETED" ? (
                <Badge className="bg-badge-green-opac text-caption items-center px-4 py-1 text-badge-green rounded-lg flex border-0 gap-2">
                  {formatName(status)}
                </Badge>
              ) : (
                handleCancel &&
                status === "CANCELLED" && (
                  <Badge
                    onClick={handleCancel}
                    className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2"
                  >
                    Cancelled
                  </Badge>
                )
              )}
            </div>
            <p className="text-body font-medium text-secondary-700">${price}</p>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-caption">
            <p>{cleaners[0]?.name || "No Cleaner"}</p>
            <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
            <p>{formatDate(timeSlot.date)}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
              <ClockIcon className="text-surface-500/50 *:size-5" />
              <p className="text-nowrap">
                {formatHour24To12(timeSlot.startTime)} -{" "}
                {formatHour24To12(timeSlot.endTime)}
              </p>
            </div>
            <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
              <LocationIcon className="text-surface-500/50 *:size-5" />
              <p className="text-nowrap">{address}</p>
            </div>
          </div>
        </div>
      </div>
      {status !== "COMPLETED" && status !== "CANCELLED"
        ? handleCancel && (
            <Button
              onClick={handleCancel}
              size={"xs"}
              className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
              variant={"outline"}
            >
              Cancel
            </Button>
          )
        : setIsOpen &&
          setBookedServiceOnRating && (
            <Button
              disabled={isLoading || Boolean(review)}
              onClick={() => {
                setBookedServiceOnRating({
                  id,
                  serviceType,
                  cleaners,
                  timeSlot,
                  address: "",
                  status: "PENDING",
                  price: 0
                });
                setIsOpen(true);
              }}
              size={"xs"}
              className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
            >
              {isLoading ? "Loading..." : "Rate Cleaning"}
            </Button>
          )}
    </div>
  );
}
