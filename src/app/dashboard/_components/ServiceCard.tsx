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
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <MobileServiceCard>{children}</MobileServiceCard>
      </div>
      <div className="hidden xl:flex gap-4">
        <DesktopServiceCard>{children}</DesktopServiceCard>
      </div>
    </>
  );
}

function DesktopServiceCard({
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
        </div>
        <div className="flex gap-2">{children}</div>
      </div>
    </div>
  );
}

function MobileServiceCard({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div className="flex px-4 py-2 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
      <div className="flex gap-4 w-full items-center">
        <div className="flex cursor-pointer gap-2 w-full flex-col">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-medium text-body text-secondary-700">
              Standard Cleaning
            </h1>
            <div className="flex flex-row-reverse md:flex-row items-center gap-2">
              {children}
            </div>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-[14px]">
            <Link href={"/dashboard/profile"}>
              <p>Sarah johnson </p>
            </Link>
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
        </div>
      </div>
    </div>
  );
}

export function AppointmentCard({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col xl:hidden gap-4">
        <AppointmentcardMobile>{children}</AppointmentcardMobile>
      </div>
      <div className="hidden xl:flex gap-4">
        <DesktopServiceCard>{children}</DesktopServiceCard>
      </div>
    </>
  );
}

function AppointmentcardMobile({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
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
              Standard Cleaning
            </h1>
          </div>
          <div className="flex *:text-surface-500 items-center *:text-[14px]">
            <Link href={"/dashboard/profile"}>
              <p>Sarah johnson </p>
            </Link>
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
          <div className="flex flex-row-reverse md:flex-row items-center gap-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
