import { Button } from "@/components/ui/Button";
import React from "react";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";
import StarIcon from "@/components/icons/StarIcon";

export default function ServiceHistorySection3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Completed Services
              </h1>
              <h3 className="text-caption text-secondary-800">
                Your cleaning history with ratings and reviews
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <DesktopServiceCard key={index}>
                <div className="flex flex-col items-center gap-5">
                  <div className="border text-caption flex justify-center border-badge-green text-badge-green  items-center px-4 py-1 rounded-lg gap-2">
                    Confirmed
                  </div>
                  <p className="w-full text-left">$75</p>
                  <Button
                    size={"xs"}
                    className="w-full text-caption flex justify-center gap-3 "
                    variant={"outline"}
                  >
                    Book Again
                  </Button>
                </div>
              </DesktopServiceCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export function DesktopServiceCard({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="flex p-4 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 ">
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
            <div className="flex *:text-surface-500 items-center *:text-caption">
              <p>Sarah johnson </p>
              <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
              <p>May 16, 2025</p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                <ClockIcon className="text-surface-500/50 size-5" />
                <p className="text-nowrap">2:00 PM - 4:00 PM</p>
              </div>
              <div className="flex gap-1.5 text-surface-500 items-center *:text-caption">
                <LocationIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">123 Main st, Apt 4B</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex *:size-5 gap-0.25">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p className="text-surface-500 text-caption">5/5</p>
            </div>
            <p className="text-surface-500/80 italic text-caption">
              “Excellent service, very thoughtful”
            </p>
          </Link>
        </div>
        <div className="flex gap-2">{children}</div>
      </div>
    </div>
  );
}
