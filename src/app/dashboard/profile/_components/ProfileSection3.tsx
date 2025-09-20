import React from "react";
import StatCard from "../../_components/StatCard";

export default function ProfileSection3({
  yearJoined,
  totalBookings,
  averageRating
}: {
  yearJoined: string | number;
  totalBookings: number;
  averageRating: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Member since"
        content="+1 year"
        value={yearJoined || "unknown"}
      />
      <StatCard
        title="Total Bookings"
        value={totalBookings || 0}
        content="All time"
      />
      <StatCard
        title="Average Rating"
        value={(averageRating || 0).toFixed(1)}
        content="Given by me"
      />
    </div>
  );
}
