import React from "react";
import Image from "next/image";
import Link from "next/link";
import userImage from "@/assets/user-profile-figure.png";
import ClockIcon from "@/components/icons/ClockIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";
import { CircleAlert } from "lucide-react";
import StarIcon from "@/components/icons/StarIcon";
import { ServiceBooked } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function ServiceCard({
  service
}: {
  service: ServiceCardProps;
}) {
  return (
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <MobileServiceCard {...service} />
      </div>
      <div className="hidden xl:flex gap-4">
        <DesktopServiceCard {...service} />
      </div>
    </>
  );
}

type ServiceCardProps = ServiceBooked;

function DesktopServiceCard({
  serviceName,
  cleanerName,
  cleanerImage,
  date,
  time,
  location,
  state,
  rating
}: ServiceCardProps) {
  return (
    <div className="w-full">
      <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full size-12"
            src={cleanerImage ? cleanerImage : userImage}
            alt={"user profile"}
          />
          <Link
            href={"/dashboard/profile"}
            className="flex cursor-pointer gap-1 flex-col"
          >
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
          </Link>
        </div>
        <div className="flex gap-2">
          {state === "complete" ? (
            <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
              <CircleAlert className="w-4.25" />
              Completed
            </Badge>
          ) : (
            <Badge className="bg-surface-500/15 text-caption items-center px-3 text-secondary-700 rounded-xl flex border-0 gap-2">
              <CircleAlert className="w-4.25" />
              Scheduled
            </Badge>
          )}
          <div className="flex items-center gap-0.25">
            <StarIcon />
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileServiceCard({
  serviceName,
  cleanerName,
  date,
  time,
  location,
  state,
  rating
}: Omit<ServiceCardProps, "cleanerImage">) {
  return (
    <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
      <div className="flex gap-4 w-full items-center">
        <div className="flex cursor-pointer gap-2 w-full flex-col">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-medium text-body text-secondary-700">
              {serviceName}
            </h1>
            <div className="flex flex-row-reverse md:flex-row items-center gap-2">
              <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
                <CircleAlert className="w-4.25" />
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </Badge>
              <div className="flex items-center gap-0.25">
                <StarIcon />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-caption">
            <Link href={"/dashboard/profile"}>
              <p>{cleanerName} </p>
            </Link>
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
    </div>
  );
}

export function AppointmentCard({
  service
}: Readonly<{
  service: ServiceCardProps;
}>) {
  return (
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <AppointmentcardMobile {...service} />
      </div>
      <div className="hidden xl:flex gap-4">
        <AppointmentCardDesktop {...service} />
      </div>
    </>
  );
}

function AppointmentCardDesktop({
  serviceName,
  cleanerName,
  cleanerImage,
  date,
  time,
  location,
  state
}: ServiceCardProps) {
  return (
    <div className="w-full">
      <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full size-12"
            src={cleanerImage ? cleanerImage : userImage}
            alt={"user profile"}
          />
          <Link
            href={"/dashboard/profile"}
            className="flex cursor-pointer gap-1 flex-col"
          >
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
          </Link>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={state === "complete"}
            size={"xs"}
            className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
            variant={"outline"}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function AppointmentcardMobile({
  serviceName,
  cleanerName,
  date,
  time,
  location,
  state
}: ServiceCardProps) {
  return (
    <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
      <div className="flex gap-4 w-full items-center">
        <div className="flex gap-2 w-full flex-col">
          <div className="flex items-center gap-4 mb-2 w-full">
            <Image
              className="rounded-full size-11"
              src={userImage}
              alt={"user profile"}
            />
            <h1 className="font-medium text-body text-secondary-700">
              {serviceName}
            </h1>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-caption">
            <Link href={"/dashboard/profile"}>
              <p>{cleanerName}</p>
            </Link>
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
          <div className="flex flex-row-reverse md:flex-row items-center gap-2">
            <Button
              disabled={state === "complete"}
              size={"xs"}
              className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
              variant={"outline"}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
