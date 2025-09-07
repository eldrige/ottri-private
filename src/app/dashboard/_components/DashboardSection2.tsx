import React from "react";
import StatCard from "./StatCard";
import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardSection2() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Next Cleaning"
        content="2:00PM - 4:00PM"
        value="Tomorrow"
        Icon={CalendarIcon}
      />
      <StatCard
        title="Total Cleanings"
        value="24"
        content="+3 this month"
        Icon={BroomSparkleIcon}
      />
      <StatCard
        title="Amount Spent"
        value="$567.00"
        content="+24.67 this month"
        Icon={MoneyIcon}
      />
      <Button
        className="md:hidden flex justify-center py-2.25 gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <PlusIcon />
        Add Booking
      </Button>
    </div>
  );
}
