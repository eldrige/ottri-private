import { Button } from "@/components/ui/Button";
import { CalendarIcon, CircleAlert, PlusIcon, Star } from "lucide-react";
import React from "react";
import StatCard from "./_components/StatCard";
import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import ServiceCard from "./_components/ServiceCard";
import { Badge } from "@/components/ui/Badge";
import StarIcon from "@/components/icons/StarIcon";

export default function DashboardPage() {
  return (
    <div className="mx-6">
      <div className="flex mb-5 items-center justify-between py-4.25 border-b border-secondary-800/25 ">
        <div>
          <h1 className="flex items-center gap-2.5 font-semibold text-3xl/relaxed">
            Welcome Back Jenny
          </h1>
          <h3 className="text-secondary-800">
            Here’s what is happening with your cleaning schedule
          </h3>
        </div>
        <Button className="flex gap-2 px-3 items-center h-fit" size={"xs"}>
          <PlusIcon />
          Add Booking
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Next Cleaning"
            content="2:00PM - 4:00PM"
            value="Tomorrow"
            Icon={CalendarIcon}
          />
          <StatCard
            title="Total Cleanings"
            value="24"
            content="+3 this month"
            Icon={BroomSparkleIcon}
          />
          <StatCard
            title="Amount Spent"
            value="$567.00"
            content="+24.67 this month"
            Icon={MoneyIcon}
          />
        </div>
        <div className="flex *:flex-1/2 gap-4">
          <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <div>
                <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                  Recent Bookings
                </h1>
                <h3 className="text-[14px] text-secondary-800">
                  Your latest cleaning appointments
                </h3>
              </div>
              <Button
                className="flex gap-2 px-3 items-center h-fit"
                size={"xs"}
              >
                View All
              </Button>
            </div>
            <div className="flex flex-col gap-2.5">
              <ServiceCard>
                <Badge className="bg-[#28A74533] text-[14px] items-center px-3 text-[#34A853] rounded-xl flex border-0 gap-2">
                  <CircleAlert className="w-4.25" />
                  Complete
                </Badge>
                <div className="flex items-center gap-0.25">
                  <StarIcon />
                  <p>5</p>
                </div>
              </ServiceCard>
              <ServiceCard>
                <Badge className="bg-[#28A74533] text-[14px] items-center px-3 text-[#34A853] rounded-xl flex border-0 gap-2">
                  <CircleAlert className="w-4.25" />
                  Complete
                </Badge>
                <div className="flex items-center gap-0.25">
                  <StarIcon />
                  <p>5</p>
                </div>
              </ServiceCard>
              <ServiceCard>
                <Badge className="bg-surface-500/15 text-[14px] items-center px-3 text-secondary-700 rounded-xl flex border-0 gap-2">
                  <CircleAlert className="w-4.25" />
                  Scheduled
                </Badge>
              </ServiceCard>
            </div>
          </div>
          <div className="p-6 border border-surface-500/30 justify-between rounded-lg flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <div>
                <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                  Upcoming Appointments
                </h1>
                <h3 className="text-[14px] text-secondary-800">
                  Your scheduled cleaning sessions
                </h3>
              </div>
              <Button
                className="flex gap-2 px-3 items-center h-fit"
                size={"xs"}
              >
                View All
              </Button>
            </div>
            <div className="flex flex-col gap-2.5">
              <ServiceCard>
                <Button
                  size={"xs"}
                  className="w-full flex justify-center gap-3 "
                  variant={"outline"}
                >
                  <p>Cancel</p>
                </Button>
              </ServiceCard>
              <ServiceCard>
                <Button
                  size={"xs"}
                  className="w-full flex justify-center gap-3 "
                  variant={"outline"}
                >
                  <p>Cancel</p>
                </Button>
              </ServiceCard>
            </div>
            <Button
              size={"xs"}
              className="w-full flex justify-center gap-3 "
              variant={"outline"}
            >
              <PlusIcon />
              <p>Add Booking</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
