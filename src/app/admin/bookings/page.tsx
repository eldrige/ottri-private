"use client";
import React, { useState } from "react";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import {
  ChevronDown,
  Filter,
  ListIcon,
  PlusIcon,
  Settings
} from "lucide-react";
import CalendarView from "./panels/CalendarView";
import ListView from "./panels/ListView";
import { cn } from "@/lib/utils";
import MapView from "./panels/MapView";

export default function AdminBookingsPage() {
  const [activeView, setActiveView] = useState<"calendar" | "list" | "map">(
    "calendar"
  );

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-6 lg:mt-0">
        <button className="flex gap-4 items-center text-sm font-medium py-2 px-4 bg-surface-50 rounded-lg">
          <Filter className="size-4" />
          All Bookings
          <ChevronDown className="size-4 text-secondary-700/50" />
        </button>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <Button
            size={"2xs"}
            variant={"secondary"}
            className="flex gap-2 items-center text-base justify-center"
          >
            <PlusIcon className="size-5" /> New Booking
          </Button>
          <Button
            size={"2xs"}
            variant={"secondary-outline"}
            className="flex gap-2 items-center text-base justify-center"
          >
            <Settings className="size-5" /> Manage Slots
          </Button>
        </div>
      </div>

      <hr className="my-4 text-black/10 lg:hidden" />

      <div className="w-full mt-8 py-2 px-3 flex lg:gap-4 rounded-4xl bg-surface-50">
        <button
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 min-w-fit transition-all ${
            activeView === "calendar"
              ? "bg-white px-4"
              : "px-2 text-secondary-700/70"
          }`}
          onClick={() => setActiveView("calendar")}
        >
          <CalendarIcon
            className={cn(
              "size-4",
              activeView === "calendar" ? "block" : "hidden lg:block"
            )}
          />
          Calendar View
        </button>
        <button
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 min-w-fit transition-all ${
            activeView === "list"
              ? "bg-white px-4"
              : "px-2 text-secondary-700/70"
          }`}
          onClick={() => setActiveView("list")}
        >
          <ListIcon
            className={cn(
              "size-4",
              activeView === "list" ? "block" : "hidden lg:block"
            )}
          />
          List View
        </button>
        <button
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 min-w-fit transition-all ${
            activeView === "map"
              ? "bg-white px-4"
              : "px-2 text-secondary-700/70"
          }`}
          onClick={() => setActiveView("map")}
        >
          <LocationIcon
            className={cn(
              "size-4",
              activeView === "map" ? "block" : "hidden lg:block"
            )}
          />
          Map View
        </button>
      </div>

      {activeView === "calendar" ? (
        <CalendarView />
      ) : activeView === "list" ? (
        <ListView />
      ) : (
        <MapView />
      )}
    </main>
  );
}
