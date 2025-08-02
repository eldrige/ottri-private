import { Button } from "@/components/ui/Button";
import React from "react";
import ServiceCard, { AppointmentCard } from "./ServiceCard";
import { CircleAlert, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import StarIcon from "@/components/icons/StarIcon";

export default function DashboardSection3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 *:flex-1/2 gap-8">
        <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Recent Bookings
              </h1>
              <h3 className="text-[14px] text-secondary-800">
                Your latest cleaning appointments
              </h3>
            </div>
            <div className="flex justify-end items-center">
              <Button
                className="flex bg-transparent text-primary-700 lg:bg-primary-700 lg:text-white gap-2 px-3 py-1.5 items-center h-fit"
                size={"xs"}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
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
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Upcoming Appointments
              </h1>
              <h3 className="text-[14px] text-secondary-800">
                Your scheduled cleaning sessions
              </h3>
            </div>
            <div className="flex justify-end items-center">
              <Button
                className="flex bg-transparent text-primary-700 lg:bg-primary-700 lg:text-white gap-2 px-3 py-1.5 items-center h-fit"
                size={"xs"}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <AppointmentCard>
              <Button
                size={"xs"}
                className="w-full flex justify-center gap-3 "
                variant={"outline"}
              >
                <p>Cancel</p>
              </Button>
            </AppointmentCard>
            <AppointmentCard>
              <Button
                size={"xs"}
                className="w-full flex justify-center gap-3 "
                variant={"outline"}
              >
                <p>Cancel</p>
              </Button>
            </AppointmentCard>
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
  );
}
