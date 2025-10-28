"use client";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import LineGraphIncreaseIcon from "@/components/icons/LineGraphIncreaseIcon";
import {
  AlertCircleIcon,
  Loader2,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  useCleanersQuery,
  useGetBookingsQuery,
  useStatsQuery
} from "./_services/queries";
import { subDays } from "date-fns";
import OverviewItem from "./_components/OverviewItem";
import ErrorComponent from "@/app/_components/ErrorComponent";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const todayDate = new Date().toISOString().slice(0, 10);
  const yesterdayDate = subDays(new Date(todayDate), 1)
    .toISOString()
    .slice(0, 10);
  const { data: stats, error: statsError } = useStatsQuery({
    startDate: todayDate,
    endDate: todayDate
  });
  const { data: yesterdayStats, error: yestStatsError } = useStatsQuery({
    startDate: yesterdayDate,
    endDate: yesterdayDate
  });
  const { data: bookings, error: bookingsError } = useGetBookingsQuery({
    startDate: todayDate,
    endDate: todayDate,
    limit: 500
  });

  const { data: cleaners, error: cleanersError } = useCleanersQuery({});

  const completedBookings = useMemo(() => {
    return bookings?.data.filter((i) => i.status === "COMPLETED").length;
  }, [bookings]);

  const paginatedBookings = useMemo(() => {
    if (!bookings?.data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return bookings.data.slice(startIndex, endIndex);
  }, [bookings?.data, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (!bookings?.data) return 0;
    return Math.ceil(bookings.data.length / itemsPerPage);
  }, [bookings?.data, itemsPerPage]);

  const router = useRouter();

  const error = statsError || yestStatsError || bookingsError || cleanersError;

  if (error) {
    return <ErrorComponent error={error} reset={router.refresh} />;
  }

  const isLoading =
    !stats ||
    !bookings ||
    typeof completedBookings !== "number" ||
    !cleaners ||
    !yesterdayStats;

  if (isLoading) return <Loader2 className="animate-spin my-8 mx-auto" />;

  const vsYesterday = Math.min(
    ((stats.baseRevenue - yesterdayStats?.baseRevenue) /
      yesterdayStats.baseRevenue) *
      100,
    1000
  );

  const completedPercentage = (completedBookings / bookings.data.length) * 100;

  const statsBoxes = [
    {
      title: "Today's Booking",
      value: bookings.data.length,
      icon: <CalendarIcon className="size-6" />,
      statusText: `${completedBookings} Complete`,
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor: "text-success"
    },
    {
      title: "Available Cleaners",
      value: cleaners.filter((i) => i.status === "AVAILABLE").length,
      icon: <Users className="size-6" />,
      statusText: `of ${cleaners.length} Total`,
      statusColor: "text-secondary-700/70",
      noStatusIcon: true
    },
    {
      title: "Today's Revenue",
      value: stats.baseRevenue,
      icon: <DollarIcon2 className="size-6" />,
      statusText: `${vsYesterday > 0 ? "+" : ""}${Math.trunc(vsYesterday || 0)}% vs yesterday`,
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor:
        vsYesterday > 0
          ? "text-success"
          : vsYesterday < 0
            ? "text-error"
            : "text-warning-text"
    },
    {
      title: "Completion Rate",
      value: `${completedPercentage || 0}%`,
      icon: <LineGraphIncreaseIcon className="size-6" />,
      statusText: "On track",
      statusIcon: <CheckBrokenIcon className="size-3.5" />,
      statusColor: "text-success"
    }
  ];

  // Map alert types to styles
  const alertStyles: Record<"info" | "warning" | "error", string> = {
    info: "bg-info/10 border-info-text",
    warning: "bg-warning/10 border-warning",
    error: "bg-error/10 border-error"
  };

  // Alerts data to be rendered via map
  const alerts: {
    type: "info" | "warning" | "error";
    content: React.ReactNode;
  }[] = [
    {
      type: "info",
      content: (
        <>
          <span className="font-bold">001</span> Overdue invoice need attention
        </>
      )
    },
    {
      type: "warning",
      content: (
        <>
          Booking <span className="font-bold">002</span> Status Updated to{" "}
          <span className="font-bold">“Complete”</span>
        </>
      )
    },
    {
      type: "warning",
      content: (
        <>
          Booking <span className="font-bold">008</span> Status Updated to{" "}
          <span className="font-bold">“In-Progress”</span>
        </>
      )
    },
    {
      type: "error",
      content: (
        <>
          Booking <span className="font-bold">012</span> has been{" "}
          <span className="font-bold">“Cancelled”</span>
        </>
      )
    }
  ];

  return (
    <main className="w-full h-full py-4 px-6">
      <div className="flex justify-between items-center">
        <h3 className="text-heading-4">Overview</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>

      <hr className="my-4 text-black/10" />

      <div className="flex gap-4 flex-col lg:flex-row">
        {statsBoxes.map((box, index) => (
          <div
            key={index}
            className="p-6 flex-1 border border-black/10 rounded-lg shadow-custom-light"
          >
            <div className="flex justify-between items-center text-sm">
              <span>{box.title}</span>
              {box.icon}
            </div>
            <p className="mt-4 text-subtitle font-medium">{box.value}</p>
            <div className="mt-2 text-sm">
              <p
                className={`${box.statusColor} text-sm flex items-center gap-2`}
              >
                {!box.noStatusIcon && box.statusIcon}
                <span>{box.statusText}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex *:flex-1 gap-4 flex-col lg:flex-row">
        <div className="lg:border border-black/10 lg:p-6 rounded-lg">
          <h4 className="flex items-center gap-2 text-subtitle font-medium">
            <ClockIcon className="size-6" />
            Today&apos;s Schedule ({bookings.data.length})
          </h4>

          {bookings.data.length === 0 ? (
            <div className="mt-6 p-6 flex flex-col items-center justify-center text-secondary-700/70">
              <ClockIcon className="size-8 mb-2" />
              <p className="font-medium">No bookings for today</p>
              <p className="text-sm mt-1">
                There are no scheduled bookings for today.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-6 space-y-2.5">
                {paginatedBookings.map((item) => (
                  <OverviewItem key={item.id} booking={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm border border-black/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>

                  <span className="text-sm text-secondary-700/70">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm border border-black/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="lg:border border-black/10 lg:p-6 rounded-lg">
          <h4 className="flex items-center gap-2 text-subtitle font-medium">
            <AlertCircleIcon className="size-5" />
            Alerts & notifications
          </h4>
          <div className="mt-6 space-y-4">
            {alerts.map((a, idx) => (
              <div
                key={idx}
                className={`p-4 flex flex-col lg:flex-row gap-2 lg:items-center justify-between rounded-lg border ${alertStyles[a.type]}`}
              >
                <p>{a.content}</p>
                <button className="py-2 px-4 text-xs rounded-lg border border-black/10 bg-white flex-1 lg:flex-0">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-6 *:flex-1 flex-col lg:flex-row">
        <div className="flex flex-col items-center gap-4 px-4 py-3 border border-black/10 rounded-lg">
          <p className="text-2xl text-success">
            {stats.statusBreakdown.COMPLETED || 0}
          </p>
          <p>Total Completed</p>
        </div>
        <div className="flex flex-col items-center gap-4 px-4 py-3 border border-black/10 rounded-lg">
          <p className="text-2xl text-info-text">
            {stats.statusBreakdown.INPROGRESS || 0}
          </p>
          <p>Total Progress</p>
        </div>
        <div className="flex flex-col items-center gap-4 px-4 py-3 border border-black/10 rounded-lg">
          <p className="text-2xl text-primary-700">
            {stats.statusBreakdown.PENDING || 0}
          </p>
          <p>Pending</p>
        </div>
      </div>
    </main>
  );
}
