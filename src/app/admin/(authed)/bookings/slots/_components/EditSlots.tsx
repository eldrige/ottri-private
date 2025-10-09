import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import { FormDataType } from "../types";
import ModalWrapper from "@/components/common/ModalWrapper";
import { TimeSlot } from "@/app/(landings)/booking/new/types";

export default function EditSlots({
  onClose,
  timeSlot
}: {
  onClose: () => void;
  timeSlot: TimeSlot;
}) {
  const [formData, setFormData] = useState<FormDataType>(() => ({
    startTime: `${timeSlot.startTime.toString().padStart(2, "0")}:00`,
    maxCapacity: timeSlot.instances,
    services: timeSlot.services.map((i) => i.id),
    daysOfWeek: timeSlot.weekDays,
    isActive: timeSlot.isActive
  }));
  console.log({ formData });

  const setField = (field: keyof FormDataType, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="p-4 flex flex-col gap-6 w-full bg-white rounded-lg max-w-xl">
        <h4 className="text-heading-5">Edit Slots</h4>
        <SlotForm formData={formData} setField={setField} />
        <div className="flex gap-8 *:flex-1 mt-auto">
          <Button onClick={onClose} variant={"secondary-outline"} size={"xs"}>
            Cancel
          </Button>
          <Button variant={"secondary"} size={"xs"}>
            Update Slot
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
