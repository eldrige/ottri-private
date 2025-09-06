"use client";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardSection1({ fullName }: { fullName: string }) {
  const router = useRouter();
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div>
        <h3 className="flex font-poppins items-center gap-2.5 font-medium text-2xl text-secondary-700">
          Welcome Back {fullName}
        </h3>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          Here&apos;s what is happening with your cleaning schedule
        </h3>
      </div>
      <Button
        className="md:flex hidden text-body text-white gap-2 px-3 items-center h-fit"
        size={"xs"}
        onClick={() => router.push("/booking/new")}
      >
        <PlusIcon />
        Add Booking
      </Button>
    </section>
  );
}
