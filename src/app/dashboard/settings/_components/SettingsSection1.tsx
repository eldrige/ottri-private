import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function SettingsSection1() {
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div className="flex flex-col gap-1 md:gap-0">
        <h1 className="flex items-center gap-2.5 font-semibold text-2xl">
          Settings
        </h1>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          Manage your account preferences and settings
        </h3>
      </div>
      <Button
        className="flex w-full md:w-fit justify-center text-body text-white gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <PlusIcon />
        Add Booking
      </Button>
    </section>
  );
}
