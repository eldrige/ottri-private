/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import ModalWrapper from "@/components/common/ModalWrapper";
import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { useUpdateTimeSlotMutation } from "../../../_services/mutations";
import { toast } from "react-hot-toast";
import { TimeSlotFormDataType } from "@/lib/types";

type FormErrorsType = {
  [key in keyof TimeSlotFormDataType]?: string;
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

  // Create initial form data to track changes
  const initialFormData: TimeSlotFormDataType = {
    startTime: `${timeSlot.startTime.toString().padStart(2, "0")}:00`,
    maxCapacity: timeSlot.instances,
    serviceIds: timeSlot.services.map((i) => i.id),
    daysOfWeek: timeSlot.weekDays,
    isActive: timeSlot.isActive
  };

  const [formData, setFormData] = useState<TimeSlotFormDataType>(() => ({
    ...initialFormData
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

  // Helper function to check if a field has been changed
  const isFieldChanged = (field: keyof TimeSlotFormDataType): boolean => {
    // Handle array comparisons
    if (
      Array.isArray(formData[field]) &&
      Array.isArray(initialFormData[field])
    ) {
      const currentArray = formData[field] as any[];
      const initialArray = initialFormData[field] as any[];

      if (currentArray.length !== initialArray.length) return true;

      // For simple arrays (like daysOfWeek or serviceIds)
      if (
        typeof currentArray[0] === "string" ||
        typeof currentArray[0] === "number"
      ) {
        return (
          currentArray.some((item) => !initialArray.includes(item)) ||
          initialArray.some((item) => !currentArray.includes(item))
        );
      }

      // For arrays of objects or complex types
      return JSON.stringify(currentArray) !== JSON.stringify(initialArray);
    }

    // Default comparison for other fields
    return formData[field] !== initialFormData[field];
  };

  // Function to check if any field has changed
  const hasChanges = (): boolean => {
    return Object.keys(formData).some((key) =>
      isFieldChanged(key as keyof TimeSlotFormDataType)
    );
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
      // Initialize an empty object for updatedData
      const updatedData: Partial<TimeSlotFormDataType> = {};

      // Only add fields that have changed to the updatedData object
      if (isFieldChanged("startTime"))
        updatedData.startTime = formData.startTime;
      if (isFieldChanged("maxCapacity"))
        updatedData.maxCapacity = formData.maxCapacity;
      if (isFieldChanged("serviceIds"))
        updatedData.serviceIds = formData.serviceIds;
      if (isFieldChanged("daysOfWeek"))
        updatedData.daysOfWeek = formData.daysOfWeek;
      if (isFieldChanged("isActive")) updatedData.isActive = formData.isActive;

      // Only send request if there are changes
      if (Object.keys(updatedData).length > 0) {
        // Call the mutation with timeSlotId and only the changed fields
        await mutateAsync({ timeSlotId: timeSlot.id, ...updatedData });

        // Show success message
        toast.success("Time slot updated successfully", {
          position: "bottom-right"
        });
      }

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
      <div className="p-4 flex flex-col gap-6 w-full bg-white rounded-lg max-w-xl text-secondary-700">
        <h4 className="text-heading-5">Edit Slot</h4>
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
            disabled={isPending || !hasChanges()}
          >
            {isPending
              ? "Updating..."
              : hasChanges()
                ? "Update Slot"
                : "No Changes"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
