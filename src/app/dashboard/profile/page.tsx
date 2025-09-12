"use client";
import React from "react";
import ProfileSection1 from "./_components/ProfileSection1";
import ProfileSection3 from "./_components/ProfileSection3";
import ProfileSection2 from "./_components/ProfileSection2";
import { useGetBookingsQuery, useGetUserProfile } from "../_services/queries";

export default function ProfilePage() {
  const { data: user } = useGetUserProfile();
  const { data: bookingsData } = useGetBookingsQuery();
  const bookings = bookingsData?.data ?? [];
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ProfileSection1 />
      <ProfileSection2 user={user!} />
      <ProfileSection3
        yearJoined={new Date(user!.createdAt).getFullYear()}
        totalBookings={bookings.length}
        averageRating={0}
      />
    </div>
  );
}
