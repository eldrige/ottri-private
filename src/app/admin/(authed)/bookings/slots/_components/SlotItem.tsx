import { TimeSlot } from "@/app/(landings)/booking/new/types";
import EditIcon from "@/components/icons/EditIcon";
import { Button } from "@/components/ui/Button";
import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { TrashIcon, UsersIcon } from "lucide-react";

function formatHour(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM

  return `${displayHour}:00 ${period}`;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SlotItem({ timeSlot }: { timeSlot: TimeSlot }) {
  return (
    <div
      key={timeSlot.id}
      className="p-4 rounded-lg border border-black/10 flex justify-between gap-1 flex-wrap"
    >
      <div>
        <div className="flex items-center gap-3">
          <p className="font-medium min-w-fit">
            {formatHour(timeSlot.startTime)} - {formatHour(timeSlot.endTime)}
          </p>
          <Badge
            variant={"secondary"}
            size={"sm"}
            className={cn(`text-sm px-3`, !timeSlot.isActive && "opacity-20")}
          >
            {timeSlot.isActive ? "Active" : "Inactive"}
          </Badge>
          <span className="flex items-center gap-2 text-xs text-secondary-700/70">
            <UsersIcon className="size-4" />
            {timeSlot.instances}
          </span>
        </div>
        <div className="mt-4 text-xs space-y-1">
          <p>
            <span className="font-medium mr-2">Service:</span>
            {timeSlot.services?.map((i) => i.name).join(", ") || "All Services"}
          </p>
          <p>
            <span className="font-medium mr-2">Days:</span>
            {timeSlot.weekDays.map((day) => days[day]).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-start justify-end gap-x-3 gap-y-1 ml-auto w-full lg:w-auto">
        <Button
          // onClick={() => setEditSlot(!editSlot)}
          size={"2xs"}
          variant={"secondary-outline"}
          className="py-2 px-3 text-xs border-black/10 flex-1 md:flex-0 flex justify-center gap-1"
        >
          <EditIcon className="size-4" />
          Edit
        </Button>
        <Button
          size={"2xs"}
          variant={"destructive"}
          className="py-2 px-3 text-xs border-black/10 flex-1 md:flex-0 flex justify-center gap-2"
        >
          <TrashIcon className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
