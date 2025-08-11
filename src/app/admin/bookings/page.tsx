"use client";
import React, { useState } from "react";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Filter, ListIcon, PlusIcon } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar-styles.css";

export default function AdminBookingsPage() {
  const [activeView, setActiveView] = useState("calendar");

  // Sample booking data
  const events = [
    {
      title: "Maria Garcia",
      start: "2025-08-29T09:00:00",
      end: "2025-08-29T10:00:00",
      extendedProps: {
        status: "info"
      }
    },
    {
      title: "Jon Doe",
      start: "2025-08-29T11:00:00",
      end: "2025-08-29T12:00:00",
      extendedProps: {
        status: "warning"
      }
    },
    {
      title: "Emma Lee",
      start: "2025-08-29T14:00:00",
      end: "2025-08-29T15:00:00",
      extendedProps: {
        status: "success"
      }
    }
  ];

  return (
    <main className="w-full h-full py-4 px-6">
      <div className="flex justify-between items-center">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10" />

      <div className="flex items-center justify-between gap-6">
        <button className="flex gap-4 items-center text-sm font-medium py-2 px-4 bg-surface-50 rounded-lg">
          <Filter className="size-4" />
          All Bookings
          <ChevronDown className="size-4 text-secondary-700/50" />
        </button>
        <Button
          size={"2xs"}
          variant={"secondary"}
          className="flex gap-2 items-center"
        >
          <PlusIcon /> New Booking
        </Button>
      </div>

      <div className="w-full mt-8 py-2 px-3 flex gap-4 rounded-4xl bg-surface-50">
        <button
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 ${
            activeView === "calendar" ? "bg-white" : "text-secondary-700/70"
          }`}
          onClick={() => setActiveView("calendar")}
        >
          <CalendarIcon className="size-4" />
          Calendar View
        </button>
        <button
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 ${
            activeView === "list" ? "bg-white" : "text-secondary-700/70"
          }`}
          onClick={() => setActiveView("list")}
        >
          <ListIcon className="size-4" />
          List View
        </button>
        <button
          className={`flex-1 text-sm py-2 rounded-4xl flex justify-center items-center gap-2 ${
            activeView === "map" ? "bg-white" : "text-secondary-700/70"
          }`}
          onClick={() => setActiveView("map")}
        >
          <LocationIcon className="size-4" />
          Map View
        </button>
      </div>

      <div className="mt-8 p-6 border border-black/10 rounded-lg">
        <h4 className="text-heading-5">Calendar Grid View</h4>

        <div className="mt-8 w-full custom-calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: ""
            }}
            events={events}
            eventContent={(eventInfo) => {
              const status = eventInfo.event.extendedProps
                .status as keyof typeof statusClasses;
              const statusClasses = {
                info: "bg-info/10 text-info-text",
                warning: "bg-warning/10 text-warning-text",
                success: "bg-success/10 text-success"
              };

              // Only show time and name
              const timeText = eventInfo.timeText;
              const title = eventInfo.event.title;

              return (
                <div
                  className={`p-2 rounded-lg ${statusClasses[status]}`}
                >{`${timeText} - ${title}`}</div>
              );
            }}
            dayHeaderContent={(args) => {
              return (
                <div className="text-center">
                  {args.date.toLocaleDateString("en-US", {
                    weekday: "short"
                  })}
                </div>
              );
            }}
          />
        </div>
      </div>
    </main>
  );
}
