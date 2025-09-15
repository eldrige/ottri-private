"use client";
import React, { useState } from "react";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import { Filter, ListIcon, PlusIcon, Settings } from "lucide-react";
import CalendarView from "./_panels/CalendarView";
import ListView from "./_panels/ListView";
import { cn } from "@/lib/utils";
import MapView from "./_panels/MapView";
import Select from "@/components/ui/Select";
import Link from "next/link";
import PanelViewer from "../_components/PanelViewer";
import { useGetBookingsQuery } from "../_services/queries";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";

const filterOptions = [
  { label: "All Bookings", value: "all-bookings" },
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "INPROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" }
];

export default function ClientAdminBookingsPage() {
  const { searchParams, setSearchParam } = useClientSearchParams();
  const [activeView, setActiveView] = useState<string>("calendar");
  const statusFilter = searchParams.get("status") || undefined;
  const getBookingsQuery = useGetBookingsQuery(statusFilter);
  const bookingsResponse = getBookingsQuery.data;
  console.log(bookingsResponse);

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-6 lg:mt-0">
        <div className="flex items-center text-sm bg-gray-50 rounded-lg pl-4">
          <Filter className="size-4" />
          <Select
            options={filterOptions}
            value={
              statusFilter
                ? filterOptions.find((i) => i.value === statusFilter)
                : filterOptions[0]
            }
            onChange={(option) => {
              const newStatus =
                option.value === "all-bookings" ? "" : option.value;
              setSearchParam("status", newStatus);
            }}
            placeholder="All Bookings"
            buttonClassName="border-none gap-2 font-medium"
            accent="secondary"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <Link href={"#"}>
            <Button
              size={"2xs"}
              variant={"secondary"}
              className="flex gap-2 items-center text-base justify-center"
            >
              <PlusIcon className="size-5" /> New Booking
            </Button>
          </Link>
          <Link href={"/admin/bookings/manage"}>
            <Button
              size={"2xs"}
              variant={"secondary-outline"}
              className="flex gap-2 items-center text-base justify-center"
            >
              <Settings className="size-5" /> Manage Slots
            </Button>
          </Link>
        </div>
      </div>

      <hr className="my-4 text-black/10 lg:hidden" />

      <PanelViewer
        views={[
          {
            viewName: "calendar",
            content: (
              <>
                <CalendarIcon
                  className={cn(
                    "size-4",
                    activeView === "calendar" ? "block" : "hidden lg:block"
                  )}
                />
                Calendar View
              </>
            )
          },
          {
            viewName: "list",
            content: (
              <>
                <ListIcon
                  className={cn(
                    "size-4",
                    activeView === "list" ? "block" : "hidden lg:block"
                  )}
                />
                List View
              </>
            )
          },
          {
            viewName: "map",
            content: (
              <>
                <LocationIcon
                  className={cn(
                    "size-4",
                    activeView === "map" ? "block" : "hidden lg:block"
                  )}
                />
                Map View
              </>
            )
          }
        ]}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {!getBookingsQuery.isSuccess || !bookingsResponse ? (
        <div className="flex items-center justify-center w-full h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-secondary-700">Loading bookings...</p>
          </div>
        </div>
      ) : activeView === "calendar" ? (
        <CalendarView bookings={bookingsResponse.data} />
      ) : activeView === "list" ? (
        <ListView bookingsResponse={bookingsResponse} />
      ) : (
        <MapView />
      )}
    </main>
  );
}
