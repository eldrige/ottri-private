import { Button } from "@/components/ui/Button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import React from "react";
import StatCard from "./_components/StatCard";
import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";

export default function DashboardPage() {
  return (
    <div className="mx-6">
      <div className="flex mb-5 items-center justify-between py-4.25 border-b border-secondary-800/25 ">
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
      <div className="grid grid-cols-3 gap-4">
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
      </div>
    </div>
  );
}
/*



CalendarIcon
*/
