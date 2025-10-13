"use client";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CallIcon from "@/components/icons/CallIcon";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import LineGraphIncreaseIcon from "@/components/icons/LineGraphIncreaseIcon";
import { AlertCircleIcon, Users } from "lucide-react";
import React from "react";
import { useStatsQuery } from "./_services/queries";

export default function AdminDashboardPage() {
  const { data: stats } = useStatsQuery();

  if (!stats) return null;
  const statsBoxes = [
    {
      title: "Today's Booking",
      value: "0",
      icon: <CalendarIcon className="size-6" />,
      statusText: "0 Complete",
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor: "text-success"
    },
    {
      title: "Available Cleaners",
      value: "2",
      icon: <Users className="size-6" />,
      statusText: "of 4 Total",
      statusColor: "text-secondary-700/70",
      noStatusIcon: true
    },
    {
      title: "Today's Revenue",
      value: "$0.00",
      icon: <DollarIcon2 className="size-6" />,
      statusText: "+15% vs yesterday",
      statusIcon: <LineGraphIncreaseIcon className="size-3.5" />,
      statusColor: "text-success"
    },
    {
      title: "Completion Rate",
      value: "0%",
      icon: <LineGraphIncreaseIcon className="size-6" />,
      statusText: "On track",
      statusIcon: <CheckBrokenIcon className="size-3.5" />,
      statusColor: "text-success"
    }
  ];

  const scheduleItems = [
    {
      customerName: "Jenny murphy",
      status: "In Progress",
      statusColor: "bg-info/20 text-info-text",
      serviceType: "Deep cleaning",
      time: "9:00 AM - 11:00 AM",
      cleaner: "Maria Garcia",
      buttonText: "Complete"
    },
    {
      customerName: "Jenny murphy",
      status: "Pending",
      statusColor: "bg-warning/20 text-warning-text",
      serviceType: "Deep cleaning",
      time: "9:00 AM - 11:00 AM",
      cleaner: "Maria Garcia",
      buttonText: "Start"
    },
    {
      customerName: "Jenny murphy",
      status: "Completed",
      statusColor: "bg-success/20 text-success",
      serviceType: "Deep cleaning",
      time: "9:00 AM - 11:00 AM",
      cleaner: "Maria Garcia",
      buttonText: null
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
            Today&apos;s Schedule ({scheduleItems.length})
          </h4>

          <div className="mt-6 space-y-2.5">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className="border border-black/10 rounded-lg py-2 px-4 flex flex-col lg:flex-row lg:items-center gap-3 justify-between"
              >
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">{item.customerName}</span>
                    <span
                      className={`text-sm py-1 px-4 ml-3 rounded-lg ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p className="text-xs text-secondary-700/70">
                    {item.serviceType}
                    <span className="h-2 w-2 bg-surface-300 inline-block rounded-full mx-2" />
                    {item.time}
                  </p>
                  <p className="text-xs text-secondary-700/70">
                    Cleaner:<span className="ml-2">{item.cleaner}</span>
                  </p>
                </div>
                <div className="flex gap-3 *:flex-1 lg:*:flex-0">
                  {item.buttonText && (
                    <button className="py-2 px-4 text-xs rounded-lg border border-black/10 bg-white">
                      {item.buttonText}
                    </button>
                  )}
                  <button className="py-2 px-4 text-xs rounded-lg border border-black/10 bg-error text-white">
                    <span className="flex gap-1 justify-center">
                      <CallIcon className="size-4 inline" />
                      Call
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
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
            {stats.statusBreakdown.COMPLETED}
          </p>
          <p>Total Completed</p>
        </div>
        <div className="flex flex-col items-center gap-4 px-4 py-3 border border-black/10 rounded-lg">
          <p className="text-2xl text-info-text">
            {stats.statusBreakdown.INPROGRESS}
          </p>
          <p>Total Progress</p>
        </div>
        <div className="flex flex-col items-center gap-4 px-4 py-3 border border-black/10 rounded-lg">
          <p className="text-2xl text-primary-700">
            {stats.statusBreakdown.PENDING}
          </p>
          <p>Pending</p>
        </div>
      </div>
    </main>
  );
}
