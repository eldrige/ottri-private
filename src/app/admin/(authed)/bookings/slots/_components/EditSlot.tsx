import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import { FormDataType } from "../types";
import ModalWrapper from "@/components/common/ModalWrapper";
import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { useUpdateTimeSlotMutation } from "../../../_services/mutations";
import { toast } from "react-hot-toast";

type FormErrorsType = {
  [key in keyof FormDataType]?: string;
};

export default function EditSlot({
  onClose,
  timeSlot
}: {
  onClose: () => void;
  timeSlot: TimeSlot;
}) {
  const { mutateAsync, isPending, isError, error } =
    useUpdateTimeSlotMutation();
  const [formData, setFormData] = useState<FormDataType>(() => ({
    startTime: `${timeSlot.startTime.toString().padStart(2, "0")}:00`,
    maxCapacity: timeSlot.instances,
    serviceIds: timeSlot.services.map((i) => i.id),
    daysOfWeek: timeSlot.weekDays,
    isActive: timeSlot.isActive
  }));

  const [errors, setErrors] = useState<FormErrorsType>({});

  const setField = (field: keyof FormDataType, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when it's changed
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrorsType = {};

    if (formData.startTime === null || String(formData.startTime) === "") {
      newErrors.startTime = "Start time is required";
    }

    if (formData.maxCapacity === null || String(formData.maxCapacity) === "") {
      newErrors.maxCapacity = "Maximum capacity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    // Validate form before submission
    if (!validate()) {
      return;
    }

    try {
      // Call the mutation with timeSlotId and body
      await mutateAsync({ timeSlotId: timeSlot.id, ...formData });

      // Show success message
      toast.success("Time slot updated successfully", {
        position: "bottom-right"
      });

      // Close the modal on success
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Failed to update time slot:", error);

      // Show error message
      if (error && typeof error === "object" && "message" in error) {
        toast.error(error.message as string, { position: "bottom-right" });
      } else {
        toast.error("Failed to update time slot. Please try again.", {
          position: "bottom-right"
        });
      }
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="p-4 flex flex-col gap-6 w-full bg-white rounded-lg max-w-xl">
        <h4 className="text-heading-5">Edit Slot</h4>
        <SlotForm formData={formData} setField={setField} errors={errors} />

        {isError && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {error.message}
          </div>
        )}

        <div className="flex gap-8 *:flex-1 mt-auto">
          <Button onClick={onClose} variant={"secondary-outline"} size={"xs"}>
            Cancel
          </Button>
          <Button
            variant={"secondary"}
            size={"xs"}
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Slot"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
