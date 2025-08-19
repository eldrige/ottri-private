import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function ManageSlotsPage() {
  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-6 lg:mt-0">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <Button
            size={"2xs"}
            variant={"secondary"}
            className="flex gap-2 items-center text-base justify-center"
          >
            <PlusIcon className="size-5" /> Create new slot
          </Button>
        </div>
      </div>
    </main>
  );
}
