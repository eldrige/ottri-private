import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-between mx-6 py-[17.25px] border-b border-secondary-800/25 ">
      <div>
        <h1 className="flex items-center gap-2.5 font-semibold text-3xl/relaxed">
          Welcome Back Jenny
        </h1>
        <h3 className="text-secondary-800">
          Here’s what is happening with your cleaning schedule
        </h3>
      </div>
      <Button className="flex gap-2 px-3 items-center h-fit" size={"xs"}>
        <PlusIcon />
        Add Booking
      </Button>
    </div>
  );
}
