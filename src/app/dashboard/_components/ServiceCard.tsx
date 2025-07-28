import React from "react";
import Image from "next/image";
import Link from "next/link";
import userImage from "@/assets/user-profile-figure.png";
import ClockIcon from "@/components/icons/ClockIcon";
import LocationIcon from "@/components/icons/LocationIcon";

export default function ServiceCard({
  children,
}: Readonly<{
  children?: React.ReactNode;
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
            <h1 className="font-medium text-lg text-black">
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
                <p>2:00 PM - 4:00 PM</p>
              </div>
              <div className="flex gap-1.5 text-surface-500 items-center *:text-[14px]">
                <LocationIcon className="text-surface-500/50 *:size-5" />
                <p>123 Main st, Apt 4B</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
