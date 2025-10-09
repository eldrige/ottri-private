"use client";
import CalendarIcon from "@/components/icons/CalendarIcon";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, PlusIcon, UsersIcon } from "lucide-react";
import React, { useState } from "react";
import EditSlots from "./_components/EditSlots";
import Link from "next/link";

export default function ManageSlotsPage() {
  const [editSlot, setEditSlot] = useState(false);
  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
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
          <Link href={"/admin/bookings/manage/new"}>
            <Button
              size={"2xs"}
              variant={"secondary"}
              className="flex gap-2 items-center text-base justify-center"
            >
              <PlusIcon className="size-5" /> Create new slot
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 relative">
        {editSlot && (
          <div
            className={cn(
              "bg-white z-10 visible md:hidden",
              !editSlot && "invisible md:visible bg-transparent"
            )}
          >
            <EditSlots onClose={() => setEditSlot(false)} />
          </div>
        )}

        <div className={cn("", editSlot && "hidden md:block")}>
          <h3 className="text-heading-4">Available slots management</h3>
          <p className="mt-3 text-sm lg:text-base">
            Manage time slots for bookings. Each slot is 2 hours long with 1
            hour gaps between slots.
          </p>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { label: "Total Slots", icon: <CalendarIcon />, number: 6 },
              { label: "Active Slots", icon: <UsersIcon />, number: 2 },
              { label: "Total Capacity", icon: <DollarIcon2 />, number: 18 }
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
            <div
              className={cn("mt-4 flex transition-all", editSlot && "gap-8")}
            >
              <div className="flex flex-col gap-2 flex-1">
                {[
                  {
                    id: 1,
                    timeSlot: "9:00 AM - 11:00 AM",
                    isActive: true,
                    instances: "1/3",
                    services: "All Services",
                    days: "All Days"
                  },
                  {
                    id: 2,
                    timeSlot: "12:00 PM - 2:00 PM",
                    isActive: true,
                    instances: "1/3",
                    services: "All Services",
                    days: "All Days"
                  },
                  {
                    id: 3,
                    timeSlot: "3:00 PM - 5:00 PM",
                    isActive: false,
                    instances: "3/3",
                    services: "All Services",
                    days: "All Days"
                  },
                  {
                    id: 4,
                    timeSlot: "6:00 PM - 8:00 PM",
                    isActive: true,
                    instances: "2/3",
                    services: "All Services",
                    days: "All Days"
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-black/10 flex justify-between gap-1 flex-wrap"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-medium min-w-fit">{item.timeSlot}</p>
                        <Badge
                          variant={"secondary"}
                          size={"sm"}
                          className={cn(
                            `text-sm px-3`,
                            !item.isActive && "opacity-20"
                          )}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <span className="flex items-center gap-2 text-xs text-secondary-700/70">
                          <UsersIcon className="size-4" />
                          {item.instances}
                        </span>
                      </div>
                      <div className="mt-4 text-xs space-y-1">
                        <p>
                          <span className="font-medium mr-2">Service:</span>
                          {item.services}
                        </p>
                        <p>
                          <span className="font-medium mr-2">Days:</span>
                          {item.days}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-x-3 gap-y-1 ml-auto w-full lg:w-auto">
                      <Button
                        onClick={() => setEditSlot(!editSlot)}
                        size={"2xs"}
                        variant={"secondary-outline"}
                        className="py-2 px-3 text-xs border-black/10 flex-1 md:flex-0 flex justify-center gap-1"
                      >
                        <EditIcon className="size-4" />
                        Edit
                      </Button>
                      <Button
                        size={"2xs"}
                        variant={"destructive"}
                        className="py-2 px-3 text-xs border-black/10 flex-1 md:flex-0 flex justify-center gap-2"
                      >
                        <TrashIcon className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={cn(
                  "hidden md:block border border-[#0D81F7] rounded-lg transition-all [box-shadow:0px_0px_8px_0px_#0D81F799]",
                  editSlot ? "flex-1" : "w-0 invisible"
                )}
              >
                {editSlot && <EditSlots onClose={() => setEditSlot(false)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
