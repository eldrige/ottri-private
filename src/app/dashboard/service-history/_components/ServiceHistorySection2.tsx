import React from "react";
import StatCard from "../../_components/StatCard";
import { Button } from "@/components/ui/Button";
import { CalendarIcon, Download, StarIcon } from "lucide-react";
import MoneyIcon from "@/components/icons/MoneyIcon";

export default function ServiceHistorySection2({
  totalServices,
  averageRating,
  totalSpent
}: {
  totalServices: number;
  averageRating: number;
  totalSpent: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Total Services"
        content="Since joining"
        value={totalServices.toString()}
        Icon={CalendarIcon}
      />
      <StatCard
        title="Average Rating"
        value={averageRating.toFixed(1)}
        content="Out of 5 stars"
        Icon={StarIcon}
      />
      <StatCard
        title="Total Spent"
        value={`$${totalSpent.toFixed(2)}`}
        content="All Spent"
        Icon={MoneyIcon}
      />
      <Button
        className="md:hidden flex justify-center py-2.25 gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <Download />
        Export PDF
      </Button>
    </div>
  );
}
