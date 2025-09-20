"use client";
import { Loader2, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useGetUserProfile } from "../_services/queries";

export default function DashboardSection1() {
  const { data: userProfile, isPending: isProfilePending } =
    useGetUserProfile();

  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div>
        <h3 className="flex font-poppins items-center gap-2.5 font-medium text-2xl text-secondary-700">
          Welcome Back{" "}
          {isProfilePending ? (
            <Loader2 className="animate-spin h-3 w-3" />
          ) : (
            userProfile?.personalInformation.fullName
          )}
          !
        </h3>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          Here&apos;s what is happening with your cleaning schedule
        </h3>
      </div>
      <Link
        href="/booking/new"
        className="md:flex hidden text-body transition-all duration-150 text-white gap-2 px-3 items-center h-fit bg-primary-700 hover:bg-transparent hover:text-primary-700 border border-primary-700 py-2 rounded-lg"
      >
        <PlusIcon />
        Add Booking
      </Link>
    </section>
  );
}
