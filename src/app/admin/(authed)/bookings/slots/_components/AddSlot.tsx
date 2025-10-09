import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import { FormDataType } from "../types";
import ModalWrapper from "@/components/common/ModalWrapper";
import { useAddTimeSlotMutation } from "../../../_services/mutations";
import { toast } from "react-hot-toast";

export default function AddSlot({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useAddTimeSlotMutation();
  const [formData, setFormData] = useState<FormDataType>(() => ({
    startTime: null,
    maxCapacity: null,
    serviceIds: [],
    daysOfWeek: [],
    isActive: false
  }));
  console.log({ formData });

  const setField = (field: keyof FormDataType, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const onSubmit = async () => {
    try {
      // Call the mutation with timeSlotId and body
      await mutateAsync(formData);

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
        <h4 className="text-heading-5">Add Slot</h4>
        <SlotForm formData={formData} setField={setField} />
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
