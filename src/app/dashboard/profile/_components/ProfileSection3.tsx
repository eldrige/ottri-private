import React from "react";
import StatCard from "../../_components/StatCard";

export default function ProfileSection3() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard title="Member since" content="+1 year" value="2024" />
      <StatCard title="Total Bookings" value="45" content="All time" />
      <StatCard title="Average Rating" value="4.9" content="Given by me" />
    </div>
  );
}
