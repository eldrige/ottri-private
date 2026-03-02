import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfileSection1() {
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div className="flex flex-col gap-1 md:gap-0">
        <h4 className="flex font-poppins items-center gap-2.5 font-medium text-2xl text-secondary-700">
          Profile
        </h4>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          Manage your account details and information preference
        </h3>
      </div>
      <Link href="/booking/new">
        <Button
          className="flex w-full md:w-fit justify-center text-body text-white gap-2 px-3 items-center h-fit"
          size={"xs"}
        >
          <PlusIcon />
          Add Booking
        </Button>
      </Link>
    </section>
  );
}
