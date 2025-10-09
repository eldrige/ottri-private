"use client";
import CalendarIcon from "@/components/icons/CalendarIcon";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, PlusIcon, UsersIcon } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useTimeSlotsQuery } from "../../_services/queries";
import Loading from "../../loading";
import ErrorComponent from "@/app/_components/ErrorComponent";
import SlotItem from "./_components/SlotItem";
import AddSlot from "./_components/AddSlot";

export default function ManageSlotsPage() {
  const [showAddBooking, setShowAddBooking] = useState(false);
  const {
    data: timeSlots,
    isLoading,
    isError,
    error,
    refetch
  } = useTimeSlotsQuery();

  if (isLoading) return <Loading />;

  if (isError) return <ErrorComponent error={error} reset={refetch} />;

  if (!timeSlots) return null;

  const totalCapacity = timeSlots.reduce((a, i) => a + i.instances, 0);

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      {showAddBooking && <AddSlot onClose={() => setShowAddBooking(false)} />}
      <div className="hidden lg:flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-6">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-6 lg:gap-8">
          <Link
            href={"/admin/bookings"}
            className="flex items-center gap-2 font-medium text-sm"
          >
            <ArrowLeftIcon className="text-secondary-700 size-5" />
            Back to booking
          </Link>
          <Button
            onClick={() => setShowAddBooking(true)}
            size={"2xs"}
            variant={"secondary"}
            className="flex gap-2 items-center text-base justify-center"
          >
            <PlusIcon className="size-5" /> Create new slot
          </Button>
        </div>
      </div>

      <div className="mt-6 relative">
        <div>
          <h3 className="text-heading-4">Available slots management</h3>
          <p className="mt-3 text-sm lg:text-base">
            Manage time slots for bookings. Each slot is 2 hours long with 1
            hour gaps between slots.
          </p>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              {
                label: "Total Slots",
                icon: <CalendarIcon />,
                number: timeSlots.length
              },
              {
                label: "Active Slots",
                icon: <UsersIcon />,
                number: timeSlots.filter((i) => i.isActive).length
              },
              {
                label: "Total Capacity/day",
                icon: <DollarIcon2 />,
                number: totalCapacity
              }
            ].map((box) => (
              <div
                key={box.label}
                className="p-6 flex items-start justify-between border border-black/10 rounded-lg"
              >
                <div className="space-y-4">
                  <p className="text-sm">{box.label}</p>
                  <p className="text-lg font-medium">{box.number}</p>
                </div>
                <span className="*:size-6">{box.icon}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-heading-5">Current Availability Slots</h4>
            <div className={"mt-4 flex transition-all"}>
              <div className="flex flex-col gap-2 flex-1">
                {timeSlots?.map((timeSlot) => (
                  <SlotItem key={timeSlot.id} timeSlot={timeSlot} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
