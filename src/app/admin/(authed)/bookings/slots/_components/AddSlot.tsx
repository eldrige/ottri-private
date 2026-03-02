/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import ModalWrapper from "@/components/common/ModalWrapper";
import { useAddTimeSlotMutation } from "../../../_services/mutations";
import { toast } from "react-hot-toast";
import { TimeSlotFormDataType } from "@/lib/types";

type FormErrorsType = {
  [key in keyof TimeSlotFormDataType]?: string;
};

export default function AddSlot({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending, isError, error } = useAddTimeSlotMutation();
  const [formData, setFormData] = useState<TimeSlotFormDataType>(() => ({
    startTime: null,
    maxCapacity: null,
    serviceIds: [],
    daysOfWeek: [],
    isActive: false
  }));
  const [errors, setErrors] = useState<FormErrorsType>({});

  const setField = (field: keyof TimeSlotFormDataType, value: unknown) => {
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

    if (formData.startTime === null) {
      newErrors.startTime = "Start time is required";
    }

    if (formData.maxCapacity === null) {
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
      await mutateAsync(formData);

      // Show success message
      toast.success("Time slot added successfully", {
        position: "bottom-right"
      });

      // Close the modal on success
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Failed to add time slot:", error);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="p-4 flex flex-col gap-6 w-full bg-white rounded-lg max-w-xl text-secondary-700">
        <h4 className="text-heading-5">Add Slot</h4>
        <SlotForm formData={formData} setField={setField} errors={errors} />

        {isError && (
          <div className="text-error text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {(error as any).response.data.message}
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
            {isPending ? "Adding..." : "Add Slot"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
