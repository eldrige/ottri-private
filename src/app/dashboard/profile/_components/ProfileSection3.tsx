import React from "react";
import StatCard from "../../_components/StatCard";
import {
  useGetBookingsQuery,
  useGetUserProfile
} from "../../_services/queries";

export default function ProfileSection3() {
  const { data: user, isLoading: userLoading } = useGetUserProfile();
  const yearJoined = new Date(user!.createdAt).getFullYear();
  const current = new Date().getFullYear();
  const membershipDuration = current - yearJoined;
  const { data: bookingsData, isLoading: bookingsLoading } =
    useGetBookingsQuery();
  const { data: completedBookingsData, isLoading: completedBookingsLoading } =
    useGetBookingsQuery("COMPLETED");
  const bookings = bookingsData?.data ?? [];

  const completedBookings = completedBookingsData?.data || [];

  const averageRating =
    completedBookings.reduce((cum, booking) => {
      return cum + (booking.review?.rating || 0);
    }, 0) / (completedBookings.filter((b) => b.review).length || 1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Member since"
        content={`${membershipDuration} year`}
        value={
          userLoading
            ? "loading..."
            : new Date(user!.createdAt).getFullYear() || "unknown"
        }
      />
      <StatCard
        title="Total Bookings"
        value={bookingsLoading ? "loading..." : bookings.length || 0}
        content="All time"
      />
      <StatCard
        title="Average Rating"
        value={
          completedBookingsLoading
            ? "loading..."
            : (averageRating || 0).toFixed(1)
        }
        content="Given by me"
      />
    </div>
  );
}
