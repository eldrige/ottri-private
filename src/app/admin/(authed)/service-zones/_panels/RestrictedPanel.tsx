import AlertLineIcon from "@/components/icons/AlertLineIcon";
import { Button } from "@/components/ui/Button";
import React from "react";

export default function RestrictedPanel() {
  return (
    <div className="mt-4 rounded-lg md:p-4 md:border border-black/10">
      <h3 className="font-medium">Restricted Log</h3>
      <div className="mt-6 space-y-4">
        {[
          {
            name: "Jennifer Adams",
            zipCode: "10099",
            service: "Regular Clean",
            time: "2025-06-27 14:30",
            reason: "Outside service area"
          },
          {
            name: "Robert Chen",
            zipCode: "10099",
            service: "Regular Clean",
            time: "2025-06-27 14:30",
            reason: "Service not available in zone"
          },
          {
            name: "Maria Lopez",
            zipCode: "10099",
            service: "Regular Clean",
            time: "2025-06-27 14:30",
            reason: "Below minimum booking value"
          }
        ].map((entry, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border rounded-lg gap-y-4 md:flex-row border-black/10"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <AlertLineIcon className="text-primary-700 size-5" />
                <p className="font-medium">{entry.name}</p>
                <p className="px-4 py-1 text-xs border rounded-lg border-black/10">
                  {entry.zipCode}
                </p>
              </div>
              <div className="flex flex-col mt-4 md:flex-row gap-y-2 gap-x-16">
                <div className="space-y-2">
                  <p className="text-xs">
                    <span className="text-sm font-medium">Service: </span>
                    {entry.service}
                  </p>
                  <p className="text-xs">
                    <span className="text-sm font-medium">Time: </span>
                    {entry.time}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs">
                    <span className="text-sm font-medium">ZIP Code: </span>
                    {entry.zipCode}
                  </p>
                  <p className="text-xs">
                    <span className="text-sm font-medium">Reason: </span>
                    {entry.reason}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex *:flex-1 md:*:flex-initial items-start justify-end flex-1 gap-2">
              <Button
                size={"2xs"}
                variant={"secondary-outline"}
                className="border-black/10"
              >
                Contact
              </Button>
              <Button
                size={"2xs"}
                variant={"secondary-outline"}
                className="border-black/10"
              >
                Override
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
