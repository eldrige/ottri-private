import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import ServiceCard, { AppointmentCard } from "./ServiceCard";
import { ChevronLeft, ChevronRight, Loader2, PlusIcon } from "lucide-react";
import { useGetBookingsQuery } from "../_services/queries";
import Link from "next/link";

export default function DashboardSection3() {
  const [recentPage, setRecentPage] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(0);

  const { data: recentBookings, isLoading: recentBookingsLoading } =
    useGetBookingsQuery("COMPLETED", 4, recentPage);

  const { data: upcomingBookings, isLoading: upcomingBookingsLoading } =
    useGetBookingsQuery("", 4, upcomingPage);

  const recentTotalPages = recentBookings
    ? Math.ceil(recentBookings.total / recentBookings.limit)
    : 0;
  const upcomingTotalPages = upcomingBookings
    ? Math.ceil(upcomingBookings.total / upcomingBookings.limit)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 *:flex-1/2 gap-8">
        <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Recent Bookings
              </h3>
              <h3 className="text-caption text-secondary-800">
                Your latest cleaning appointments
              </h3>
            </div>
            <div className="flex justify-end items-center">
              <Link href="/dashboard/my-bookings">
                <Button
                  className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                  size={"xs"}
                >
                  View All
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {recentBookings?.data.map((booking, index) => (
              <ServiceCard
                key={booking.id || `${recentPage}-${index}`}
                service={booking}
              />
            ))}
            {!recentBookingsLoading && recentBookings?.data.length === 0 && (
              <div className="text-caption w-full text-center text-secondary-800">
                No recent appointments
              </div>
            )}
            {recentBookingsLoading && (
              <div className="text-caption w-full flex items-center justify-center text-center text-secondary-800">
                <Loader2 className="animate-spin w-4 h-4" />
              </div>
            )}
          </div>
          {recentTotalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={() => setRecentPage((old) => Math.max(old - 1, 0))}
                disabled={recentPage === 0}
                variant="outline"
                size="xs"
              >
                Previous
              </Button>
              <span className="text-sm text-secondary-700">
                Page {recentPage + 1} of {recentTotalPages}
              </span>
              <Button
                onClick={() => setRecentPage((old) => old + 1)}
                disabled={recentPage >= recentTotalPages - 1}
                variant="outline"
                size="xs"
              >
                Next
              </Button>
            </div>
          )}
        </div>
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Upcoming Appointments
              </h3>
              <h3 className="text-caption text-secondary-800">
                Your scheduled cleaning sessions
              </h3>
            </div>
            <div className="flex justify-end items-center">
              <Link href="/dashboard/my-bookings">
                <Button
                  className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                  size={"xs"}
                >
                  View All
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {!upcomingBookingsLoading &&
              upcomingBookings?.data.length === 0 && (
                <div className="text-caption w-full text-center text-secondary-800">
                  No upcoming appointments
                </div>
              )}
            {upcomingBookings?.data.map((service, index) => (
              <AppointmentCard
                key={service.id || `${upcomingPage}-${index}`}
                service={service}
              />
            ))}
            {upcomingBookingsLoading && (
              <div className="text-caption w-full flex items-center justify-center text-center text-secondary-800">
                <Loader2 className="animate-spin w-4 h-4" />
              </div>
            )}
          </div>
          {upcomingTotalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={() => setUpcomingPage((old) => Math.max(old - 1, 0))}
                disabled={upcomingPage === 0}
                size={"2xs"}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-secondary-700">
                Page {upcomingPage + 1} of {upcomingTotalPages}
              </span>
              <Button
                onClick={() => setUpcomingPage((old) => old + 1)}
                disabled={upcomingPage >= upcomingTotalPages - 1}
                size="2xs"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
          <Link href="/booking/new">
            <Button
              size={"xs"}
              className="w-full flex justify-center gap-3 "
              variant={"outline"}
            >
              <PlusIcon />
              <p>Add Booking</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
