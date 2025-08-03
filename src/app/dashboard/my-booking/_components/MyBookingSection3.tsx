import { Button } from "@/components/ui/Button";
import React from "react";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { CircleAlert, ClockIcon, FilterIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";

export default function MyBookingSection3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Upcoming Appointments
              </h1>
              <h3 className="text-caption text-secondary-800">
                Your scheduled cleaning sessions
              </h3>
            </div>
            <div className=" justify-end">
              {/* <Button
                className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                size={"xs"}
              >
                View All
              </Button> */}
              <div className="flex  text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
                <FilterIcon size={16} />
                <select className="" name="filter" id="">
                  <option value="all">Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-blue-opac text-badge-blue items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  In Progress
                </Badge>
              }
            >
              <div className="flex items-center gap-5">
                <p>$75</p>
                <Button
                  size={"xs"}
                  className="w-full text-caption flex justify-center gap-3 "
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </DesktopServiceCard>
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-orange-opac text-badge-orange items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  Pending
                </Badge>
              }
            >
              <div className="flex w-full items-center gap-5">
                <p>$45</p>
                <Button
                  size={"xs"}
                  className="w-full text-caption flex justify-center gap-3 "
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </DesktopServiceCard>
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  Cancelled
                </Badge>
              }
            >
              <div className="flex w-full items-center gap-5">
                <p>$45</p>
                <Button
                  disabled={true}
                  size={"xs"}
                  className="w-full text-caption disabled:text-gray-300 disabled:bg-transparent disabled:border-gray-300 flex justify-center gap-3 "
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </DesktopServiceCard>
          </div>
          <Button
            size={"xs"}
            className="w-full flex justify-center gap-3 "
            variant={"outline"}
          >
            <PlusIcon />
            <p>Add Booking</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
function DesktopServiceCard({
  children,
  badge,
}: Readonly<{
  children?: React.ReactNode;
  badge?: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full size-12"
            src={userImage}
            alt={"user profile"}
          />
          <Link
            href={"/dashboard/profile"}
            className="flex cursor-pointer gap-1 flex-col"
          >
            <h1 className="font-medium text-body text-secondary-700">
              Standard Cleaning
            </h1>
            <div className="flex *:text-surface-500 items-center *:text-[14px]">
              <p>Sarah johnson </p>
              <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
              <p>May 16, 2025</p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1.5 text-surface-500 items-center *:text-[14px]">
                <ClockIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">2:00 PM - 4:00 PM</p>
              </div>
              <div className="flex gap-1.5 text-surface-500 items-center *:text-[14px]">
                <LocationIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">123 Main st, Apt 4B</p>
              </div>
            </div>
          </Link>
          {badge}
        </div>
        <div className="flex gap-2">{children}</div>
      </div>
    </div>
  );
}
