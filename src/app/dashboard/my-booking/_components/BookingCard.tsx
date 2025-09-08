import { ServiceBooked } from "@/lib/types";
import React from "react";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { ClockIcon } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
type BookingCardProps = Omit<ServiceBooked, "rating"> & {
  setIsOpen?: (isOpen: boolean) => void;
  setBookedServiceOnRating?: (service: Omit<ServiceBooked, "rating">) => void;
};
export default function BookingCard({
  service,
  setIsOpen,
  setBookedServiceOnRating
}: {
  service: Omit<ServiceBooked, "rating">;
  setIsOpen?: (isOpen: boolean) => void;
  setBookedServiceOnRating?: (service: Omit<ServiceBooked, "rating">) => void;
}) {
  return (
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <MobileBookingCard
          {...service}
          setIsOpen={setIsOpen}
          setBookedServiceOnRating={setBookedServiceOnRating}
        />
      </div>
      <div className="hidden xl:flex gap-4">
        <DesktopBookingCard
          {...service}
          setIsOpen={setIsOpen}
          setBookedServiceOnRating={setBookedServiceOnRating}
        />
      </div>
    </>
  );
}

function DesktopBookingCard({
  serviceName,
  cleanerName,
  cleanerImage,
  date,
  time,
  location,
  state,
  price,
  setIsOpen,
  setBookedServiceOnRating
}: BookingCardProps) {
  return (
    <div className="w-full">
      <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full size-12"
            src={cleanerImage ? cleanerImage : userImage}
            alt={"user profile"}
          />
          <div className="flex cursor-pointer gap-1 flex-col">
            <h1 className="font-medium text-body text-secondary-700">
              {serviceName}
            </h1>
            <div className="flex *:text-surface-500 items-center *:text-caption">
              <p>{cleanerName}</p>
              <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
              <p>{date}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                <ClockIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">{time}</p>
              </div>
              <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                <LocationIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">{location}</p>
              </div>
            </div>
          </div>
          {state === "in-progress" ? (
            <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
              In Progress
            </Badge>
          ) : state === "pending" ? (
            <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
              Pending
            </Badge>
          ) : state === "complete" ? (
            <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
              Complete
            </Badge>
          ) : (
            <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
              Cancelled
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex w-full items-center gap-5">
            <p>${price}</p>
            {state !== "complete" && state !== "cancelled" ? (
              <Button
                size={"xs"}
                className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
                variant={"outline"}
              >
                Cancel
              </Button>
            ) : (
              setIsOpen &&
              setBookedServiceOnRating && (
                <Button
                  onClick={() => {
                    setBookedServiceOnRating({
                      serviceName,
                      cleanerName,
                      cleanerImage,
                      date,
                      time,
                      location,
                      state,
                      price
                    });
                    setIsOpen(true);
                  }}
                  size={"xs"}
                  className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                >
                  Rate Cleaning
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileBookingCard({
  serviceName,
  cleanerName,
  cleanerImage,
  date,
  time,
  location,
  state,
  price,
  setIsOpen,
  setBookedServiceOnRating
}: BookingCardProps) {
  return (
    <div className="flex flex-col px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
      <div className="flex gap-4 w-full items-center">
        <div className="flex w-full cursor-pointer gap-1 flex-col">
          <div className="flex justify-between  items-center gap-4 mb-2 w-full">
            <div className="flex gap-2 items-center">
              <h1 className="font-medium text-body text-secondary-700">
                {serviceName}
              </h1>
              {state === "in-progress" ? (
                <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  In Progress
                </Badge>
              ) : state === "pending" ? (
                <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  Pending
                </Badge>
              ) : state === "complete" ? (
                <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
                  Complete
                </Badge>
              ) : (
                <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  Cancelled
                </Badge>
              )}
            </div>
            <p className="text-body font-medium text-secondary-700">${price}</p>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-caption">
            <p>{cleanerName}</p>
            <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
            <p>{date}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
              <ClockIcon className="text-surface-500/50 *:size-5" />
              <p className="text-nowrap">{time}</p>
            </div>
            <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
              <LocationIcon className="text-surface-500/50 *:size-5" />
              <p className="text-nowrap">{location}</p>
            </div>
          </div>
        </div>
      </div>
      {state !== "complete" && state !== "cancelled" ? (
        <Button
          size={"xs"}
          className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
          variant={"outline"}
        >
          Cancel
        </Button>
      ) : (
        setIsOpen &&
        setBookedServiceOnRating && (
          <Button
            onClick={() => {
              setBookedServiceOnRating({
                serviceName,
                cleanerName,
                cleanerImage,
                date,
                time,
                location,
                state,
                price
              });
              setIsOpen(true);
            }}
            size={"xs"}
            className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
          >
            Rate Cleaning
          </Button>
        )
      )}
    </div>
  );
}
