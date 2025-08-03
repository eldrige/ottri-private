import React from "react";
import { DesktopServiceCard } from "./MyBookingSection3";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FilterIcon } from "lucide-react";

export default function MyBookingSection4() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h1 className="flex items-center gap-2.5 font-semibold text-lg">
                Past Appointments
              </h1>
              <h3 className="text-caption text-secondary-800">
                Your past cleaning sessions
              </h3>
            </div>
            <div className=" justify-end">
              {/* <Button
                className="flex bg-transparent text-caption px-4 py-1 text-primary-700 lg:bg-primary-700 lg:text-white gap-2  items-center h-fit"
                size={"xs"}
              >
                View All
              </Button> */}
              <div className="flex  text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 py-3 rounded-lg">
                <FilterIcon size={16} />
                <select className="" name="filter" id="">
                  <option value="all">Completed</option>
                  <option value="today">Canceled</option>
                  <option value="upcoming">Pending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
                  Complete
                </Badge>
              }
            >
              <div className="flex items-center gap-5">
                <p>$75</p>
                <Button
                  size={"xs"}
                  className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                >
                  Rate Cleaning
                </Button>
              </div>
            </DesktopServiceCard>
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-red-opac text-badge-red items-center px-4 py-1 rounded-lg flex border-0 gap-2">
                  Cancelled
                </Badge>
              }
            >
              <div className="flex w-full items-center gap-5">
                <p>$45</p>
                <Button
                  size={"xs"}
                  className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                >
                  Rate Cleaning
                </Button>
              </div>
            </DesktopServiceCard>
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
                  Complete
                </Badge>
              }
            >
              <div className="flex w-full items-center gap-5">
                <p>$150</p>
                <Button
                  size={"xs"}
                  className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                >
                  Rate Cleaning
                </Button>
              </div>
            </DesktopServiceCard>
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
                  Complete
                </Badge>
              }
            >
              <div className="flex w-full items-center gap-5">
                <p>$150</p>
                <Button
                  size={"xs"}
                  className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                >
                  Rate Cleaning
                </Button>
              </div>
            </DesktopServiceCard>
            <DesktopServiceCard
              badge={
                <Badge className="bg-badge-green-opac text-caption items-center px-3 text-badge-green rounded-lg flex border-0 gap-2">
                  Complete
                </Badge>
              }
            >
              <div className="flex w-full items-center gap-5">
                <p>$150</p>
                <Button
                  size={"xs"}
                  className="hover:border-secondary-700 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
                >
                  Rate Cleaning
                </Button>
              </div>
            </DesktopServiceCard>
          </div>
        </div>
      </div>
    </div>
  );
}
