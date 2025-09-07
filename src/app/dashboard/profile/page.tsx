import React from "react";
import ProfileSection1 from "./_components/ProfileSection1";
import ProfileSection3 from "./_components/ProfileSection3";
import ProfileSection2 from "./_components/ProfileSection2";
import { getBookings, getUserDetails, getUserProfile } from "../_utils/queries";

export default async function ProfilePage() {
  const profile = await getUserProfile();
  const user = await getUserDetails(profile.id);
  const bookings = await getBookings();
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ProfileSection1 />
      <ProfileSection2 user={user} />
      <ProfileSection3
        yearJoined={new Date(user.createdAt).getFullYear()}
        totalBookings={bookings.length}
        averageRating={0}
      />
    </div>
  );
}
