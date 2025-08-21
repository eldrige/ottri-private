import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import React from "react";

export default function EditSlots({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 flex flex-col gap-6 w-full">
      <h4 className="text-heading-5">Edit Slots</h4>
      <div className="space-y-8 text-secondary-900">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Input
              label="Start Time*"
              type="number"
              placeholder="09:00"
              className="py-2.5"
            />
            <p className="mt-2 text-tiny text-secondary-700/70">
              Slot will be 9:00 AM - 11:00 AM
            </p>
          </div>
          <div>
            <Input
              label="Max Capacity"
              type="number"
              className="py-2.5"
              placeholder="3"
            />
          </div>
        </div>
        <div>
          <p className="text-caption">Service Type*</p>
          <div className="mt-3 flex items-start gap-4 flex-wrap">
            <Checkbox label="All Services" accent="secondary" />
            <Checkbox label="Deep Clean" accent="secondary" />
            <Checkbox label="Office Clean" accent="secondary" />
            <Checkbox label="Regular Clean" accent="secondary" />
            <Checkbox label="Move-in/Move-out Clean" accent="secondary" />
            <Checkbox label="Post-construction Clean" accent="secondary" />
          </div>
        </div>
        <div>
          <p className="text-caption">Days of the week*</p>
          <div className="mt-3 flex items-start gap-4 flex-wrap">
            <Checkbox label="Mon" accent="secondary" />
            <Checkbox label="Tue" accent="secondary" />
            <Checkbox label="Wed" accent="secondary" />
            <Checkbox label="Thu" accent="secondary" />
            <Checkbox label="Fri" accent="secondary" />
            <Checkbox label="Sat" accent="secondary" />
            <Checkbox label="Sun" accent="secondary" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-4.5 p-0.5 bg-secondary-700 rounded-full flex justify-end">
            <div className="h-full aspect-square bg-white rounded-full" />
          </button>
          <p className="text-caption">Active slot</p>
        </div>
      </div>
      <div className="flex gap-8 *:flex-1 mt-auto">
        <Button onClick={onClose} variant={"secondary-outline"} size={"xs"}>
          Cancel
        </Button>
        <Button variant={"secondary"} size={"xs"}>
          Update Slot
        </Button>
      </div>
    </div>
  );
}
