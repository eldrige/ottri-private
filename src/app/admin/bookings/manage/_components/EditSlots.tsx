import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import { FormDataType } from "../types";

export default function EditSlots({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormDataType>(() => ({
    startTime: null,
    maxCapacity: null,
    serviceTypes: [],
    daysOfWeek: [],
    activeSlot: false
  }));

  const setField = (field: keyof FormDataType, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-4 flex flex-col gap-6 w-full">
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
  );
}
