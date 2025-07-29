import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function DashboardSection1() {
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-5 md:items-center justify-between py-4.25 border-b border-secondary-800/25 ">
      <div>
        <h1 className="flex items-center gap-2.5 font-semibold text-3xl/relaxed">
          Welcome Back Jenny
        </h1>
        <h3 className="text-secondary-800 text-wrap">
          Here&apos;s what is happening with your cleaning schedule
        </h3>
      </div>
      <Button className="flex gap-2 px-3 items-center h-fit" size={"xs"}>
        <PlusIcon />
        Add Booking
      </Button>
    </section>
  );
}
