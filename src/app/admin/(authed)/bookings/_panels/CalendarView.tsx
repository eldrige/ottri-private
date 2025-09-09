import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../calendar-styles.css";
import { Booking } from "@/app/admin/types";

export default function CalendarView({ bookings }: { bookings: Booking[] }) {
  // Sample booking data
  // const events = [
  //   {
  //     title: "Maria Garcia",
  //     start: "2025-08-29T09:00:00",
  //     end: "2025-08-29T10:00:00",
  //     extendedProps: {
  //       status: "info"
  //     }
  //   },
  //   {
  //     title: "Jon Doe",
  //     start: "2025-08-29T11:00:00",
  //     end: "2025-08-29T12:00:00",
  //     extendedProps: {
  //       status: "warning"
  //     }
  //   },
  //   {
  //     title: "Emma Lee",
  //     start: "2025-08-29T14:00:00",
  //     end: "2025-08-29T15:00:00",
  //     extendedProps: {
  //       status: "success"
  //     }
  //   }
  // ];

  const myEvents = bookings.map((booking) => ({
    title: booking.customer?.personalInformation?.fullName || "Guest",
    start: `${booking.timeSlot.date.split("T")[0]}T${booking.timeSlot.startTime}:00:00`,
    end: `${booking.timeSlot.date.split("T")[0]}T${booking.timeSlot.endTime}:00:00`,
    extendedProps: {
      status:
        booking.status === "PENDING"
          ? "warning"
          : booking.status === "COMPLETED"
            ? "success"
            : "info"
    }
  }));

  return (
    <div className="mt-8 p-6 lg:border border-black/10 rounded-lg overflow-auto">
      <h4 className="text-heading-5">Calendar Grid View</h4>

      <div className="mt-8 w-full min-w-4xl custom-calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: ""
          }}
          events={myEvents}
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
  );
}
