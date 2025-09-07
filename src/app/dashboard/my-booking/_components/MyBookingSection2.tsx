import React from "react";
import StatCard from "../../_components/StatCard";
import { AlertCircle, CalendarIcon, PlusIcon } from "lucide-react";
import MoneyIcon from "@/components/icons/MoneyIcon";
import { Button } from "@/components/ui/Button";

function MyBookingSection2() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Upcoming"
        content="Next 30 days"
        value="3"
        Icon={CalendarIcon}
      />
      <StatCard
        title="This Month"
        value="6"
        content="Total Bookings"
        Icon={AlertCircle}
      />
      <StatCard
        title="Total Spent"
        value="$567.00"
        content="This Month"
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

export default MyBookingSection2;
