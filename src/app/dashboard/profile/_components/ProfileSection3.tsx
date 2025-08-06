import React from "react";
import StatCard from "../../_components/StatCard";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";

export default function ProfileSection3() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard title="Member since" content="2024" value="+1 year" />
      <StatCard title="Total Bookings" value="45" content="All time" />
      <StatCard title="Average Rating" value="4.9" content="Given by me" />
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
