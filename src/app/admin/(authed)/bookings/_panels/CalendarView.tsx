import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../calendar-styles.css";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";
import { useGetBookingsQuery } from "../../_services/queries";
import ErrorComponent from "@/app/_components/ErrorComponent";
import { cn } from "@/lib/utils";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import BookingDetails from "../_components/BookingDetails";

export default function CalendarView() {
  const [window, setWindow] = useState({
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined
  });

  const [showDetails, setShowDetails] = useState<string | null>(null);

  const statusFilter = useClientSearchParams().searchParams.get("status") || "";
  const getBookingsQuery = useGetBookingsQuery({
    statusFilter,
    limit: 100,
    startDate: window.startDate,
    endDate: window.endDate,
    enabled: !!(window.startDate && window.endDate)
  });
  const bookingsResponse = getBookingsQuery.data;

  if (getBookingsQuery.error)
    return (
      <ErrorComponent
        error={getBookingsQuery.error}
        reset={getBookingsQuery.refetch}
      />
    );

  const bookings = bookingsResponse?.data;

  const myEvents: EventSourceInput | undefined = bookings?.map((booking) => ({
    id: booking.id.toString(),
    title: (
      booking.guest?.fullName || booking.customer?.personalInformation?.fullName
    )?.slice(0, 10),
    start: `${booking.timeSlot.date.split("T")[0]}T${booking.timeSlot.startTime}:00:00`,
    end: `${booking.timeSlot.date.split("T")[0]}T${booking.timeSlot.endTime}:00:00`,
    extendedProps: {
      status:
        booking.status === "PENDING"
          ? "warning"
          : booking.status === "COMPLETED"
            ? "success"
            : booking.status === "CANCELLED"
              ? "error"
              : "info"
    }
  }));

  return (
    <div
      className={cn(
        "mt-8 p-6 lg:border border-black/10 rounded-lg overflow-auto",
        getBookingsQuery.isLoading && "opacity-25 pointer-events-none"
      )}
    >
      <h4 className="text-heading-5">Calendar Grid View</h4>

      {getBookingsQuery.isLoading && <p>Loading bookings...</p>}

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
              success: "bg-success/10 text-success",
              error: "bg-error/10 text-error"
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
          datesSet={(arg) => {
            setWindow({
              startDate: arg.startStr,
              endDate: arg.endStr
            });
          }}
          eventClick={(calData) => {
            setShowDetails(calData.event._def.publicId);
          }}
        />
      </div>
      {showDetails && (
        <BookingDetails
          bookingId={showDetails}
          onClose={() => setShowDetails(null)}
        />
      )}
    </div>
  );
}
