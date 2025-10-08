import {
  bathroomOptions,
  bedroomOptions,
  squareFootageOptions
} from "@/app/(landings)/booking/new/formData";
import { Booking, UpdateBookingPayload } from "@/app/admin/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useServicesQuery } from "../../_services/queries";
import { useUpdateBookingMutation } from "../../_services/mutations";
import ModalWrapper from "@/components/common/ModalWrapper";

export default function EditBooking({
  booking,
  onClose
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const { data: servicesOptions } = useServicesQuery();
  const {
    isPending,
    mutateAsync: updateBooking,
    error
  } = useUpdateBookingMutation();

  // State for form errors
  const [formError, setFormError] = useState<string | null>(null);

  const [newBookingData, setNewBookingData] = useState({
    fullName:
      booking.guest?.fullName ||
      booking.customer?.personalInformation?.fullName,
    serviceType: booking.serviceType.serviceId,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    approximateSquareFootage: booking.approximateSquareFootage
  });

  // Clear form error when any field changes
  useEffect(() => {
    if (formError) setFormError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBookingData]);

  if (!servicesOptions) return null;

  const serviceTypeOptions = servicesOptions.map((i) => ({
    label: i.name.replace(/(?<=^| )\w/g, (i) => i.toUpperCase()),
    value: i.id.toString()
  }));

  const setField = (key: keyof typeof newBookingData, value: string) => {
    setNewBookingData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Form validation
    if (!newBookingData.fullName?.trim()) {
      setFormError("Client's name is required");
      return;
    }

    try {
      // Define a properly typed payload with only the necessary properties

      const payload: UpdateBookingPayload = { bookingId: booking.id };

      // Compare and add bedrooms if changed
      if (newBookingData.bedrooms !== booking.bedrooms) {
        payload.bedrooms = newBookingData.bedrooms;
      }

      // Compare and add bathrooms if changed
      if (newBookingData.bathrooms !== booking.bathrooms) {
        payload.bathrooms = newBookingData.bathrooms;
      }

      // Compare and add square footage if changed
      if (
        newBookingData.approximateSquareFootage !==
        booking.approximateSquareFootage
      ) {
        payload.approximateSquareFootage =
          newBookingData.approximateSquareFootage;
      }

      // Compare and add service type if changed
      if (+newBookingData.serviceType !== booking.serviceType.serviceId) {
        payload.serviceType = {
          serviceId: +newBookingData.serviceType
        };
      }

      // Compare and add guest name if changed
      const originalName =
        booking.guest?.fullName ||
        booking.customer?.personalInformation?.fullName;
      if (newBookingData.fullName && newBookingData.fullName !== originalName) {
        payload.guest = {
          fullName: newBookingData.fullName
        };
      }

      // Only call update if there are changes
      if (Object.keys(payload).length > 1) {
        // More than just bookingId
        await updateBooking(payload);
        // Close the modal on successful update
        onClose();
      } else {
        // No changes were made
        setFormError("No changes were made to update");
      }
    } catch (err) {
      console.error("Failed to update booking:", err);
      setFormError(
        error?.message || "Failed to update booking. Please try again later."
      );
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 rounded-lg p-4 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center">
          <p className="text-heading-5 font-bold">Edit Booking</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Display error message if exists */}
          {formError && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md">
              {formError}
            </div>
          )}

          <div className="mt-4 space-y-4">
            <Input
              label="Client's Name *"
              value={newBookingData.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
            />
            <Select
              accent="secondary"
              label="Service Type *"
              options={serviceTypeOptions}
              value={serviceTypeOptions.find(
                (i) => +i.value === newBookingData.serviceType
              )}
              onChange={(option) => setField("serviceType", option.value)}
            />
          </div>
          <div className="mt-6 space-y-4">
            <Select
              accent="secondary"
              label="Bedrooms"
              options={bedroomOptions}
              value={bedroomOptions.find(
                (i) => i.value === newBookingData.bedrooms
              )}
              onChange={(option) => setField("bedrooms", option.value)}
            />
            <Select
              accent="secondary"
              label="Bathrooms"
              options={bathroomOptions}
              value={bathroomOptions.find(
                (i) => i.value === newBookingData.bathrooms
              )}
              onChange={(option) => setField("bathrooms", option.value)}
            />
            <Select
              accent="secondary"
              label="Approximate Square Footage"
              options={squareFootageOptions}
              value={squareFootageOptions.find(
                (i) => i.value === newBookingData.approximateSquareFootage
              )}
              onChange={(option) =>
                setField("approximateSquareFootage", option.value)
              }
            />
          </div>

          <div className="mt-8 flex gap-8 *:flex-1">
            <Button
              type="button"
              variant={"secondary-outline"}
              size={"xs"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"secondary"}
              size={"xs"}
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Edit Booking"}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
