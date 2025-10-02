import {
  bathroomOptions,
  bedroomOptions,
  squareFootageOptions
} from "@/app/(landings)/booking/new/formData";
import { Booking } from "@/app/admin/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useServicesQuery } from "../../_services/queries";
// import { useUpdateBookingMutation } from "../../_services/mutations";

export default function EditBooking({
  booking,
  onClose
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const { data: servicesOptions } = useServicesQuery();
  // const {isPending} = useUpdateBookingMutation()
  const isPending = false;
  const [newBookingData, setNewBookingData] = useState({
    fullName:
      booking.guest?.fullName ||
      booking.customer?.personalInformation?.fullName,
    serviceType: booking.serviceType.serviceId,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    approximateSquareFootage: booking.approximateSquareFootage
  });

  // Create a state to track if the portal container is ready
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  // Set up the portal container on mount
  useEffect(() => {
    // Find existing portal container or create a new one
    let container = document.getElementById("booking-edit-portal");
    if (!container) {
      container = document.createElement("div");
      container.id = "booking-edit-portal";
      document.body.appendChild(container);
    }
    setPortalContainer(container);

    // Cleanup function to remove the portal container when unmounted
    return () => {
      if (
        container &&
        container.parentElement &&
        !container.childElementCount
      ) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Block scrolling while the modal is open
  useEffect(() => {
    // Store the original overflow style
    const originalOverflow = document.body.style.overflow;

    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!servicesOptions || !portalContainer) return null;

  const serviceTypeOptions = servicesOptions.map((i) => ({
    label: i.name.replace(/(?<=^| )\w/g, (i) => i.toUpperCase()),
    value: i.id.toString()
  }));

  const setField = (key: keyof typeof newBookingData, value: string) => {
    setNewBookingData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await updateBooking({
      //   bookingId: booking.id,
      //   bedrooms: newBookingData.bedrooms,
      //   bathrooms: newBookingData.bathrooms,
      //   approximateSquareFootage: newBookingData.approximateSquareFootage,
      //   serviceType: {
      //     serviceId: +newBookingData.serviceType
      //   },
      //   guest: {
      //     fullName: newBookingData.fullName
      //   }
      // });

      // Close the modal on successful update
      onClose();
    } catch (error) {
      console.error("Failed to update booking:", error);
      // Optionally add error handling UI here
    }
  };

  // Content to render in the portal
  const modalContent = (
    <div
      className="fixed inset-0 bg-black/30 text-secondary-700 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close modal when clicking on the backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="border border-black/10 rounded-lg p-4 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center">
          <p className="text-heading-5 font-bold">Edit Booking</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 space-y-4">
            <Input
              label="Client's Name *"
              value={newBookingData.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
            />
            <Select
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
              label="Bedrooms"
              options={bedroomOptions}
              value={bedroomOptions.find(
                (i) => i.value === newBookingData.bedrooms
              )}
              onChange={(option) => setField("bedrooms", option.value)}
            />
            <Select
              label="Bathrooms"
              options={bathroomOptions}
              value={bathroomOptions.find(
                (i) => i.value === newBookingData.bathrooms
              )}
              onChange={(option) => setField("bathrooms", option.value)}
            />
            <Select
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
    </div>
  );

  return createPortal(modalContent, portalContainer);
}
