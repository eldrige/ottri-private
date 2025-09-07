import React from "react";
import MyBookingSection1 from "./_components/MyBookingSection1";
import MyBookingSection2 from "./_components/MyBookingSection2";
import MyBookingSection3 from "./_components/MyBookingSection3";
import MyBookingSection4 from "./_components/MyBookingSection4";

export default function MyBookingPage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <MyBookingSection1 />
      <MyBookingSection2 />
      <MyBookingSection3 />
      <MyBookingSection4 />
    </div>
  );
}
