"use client";
import React from "react";
import ProfileSection1 from "./_components/ProfileSection1";
import ProfileSection3 from "./_components/ProfileSection3";
import ProfileSection2 from "./_components/ProfileSection2";

export default function ProfilePage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ProfileSection1 />
      <ProfileSection2 />
      <ProfileSection3 />
    </div>
  );
}
