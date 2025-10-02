import {
  bathroomOptions,
  bedroomOptions,
  squareFootageOptions
} from "@/app/(landings)/booking/new/formData";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useServicesQuery } from "../../_services/queries";
import AddressInput from "@/app/(landings)/booking/new/_components/AddressInput";

export default function AddBooking({ onClose }: { onClose: () => void }) {
  const { data: servicesOptions } = useServicesQuery();

  const [newBookingData, setNewBookingData] = useState({
    clientName: "",
    serviceType: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    serviceAddress: ""
  });
  const [isPending, setIsPending] = useState(false);

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
    setIsPending(true);

    try {
      // Add booking logic here

      onClose();
    } catch (error) {
      console.error("Failed to add booking:", error);
    } finally {
      setIsPending(false);
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
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-heading-5 font-bold text-3xl">Add Booking</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label className="block mb-2 font-medium">
                Client&apos;s Name *
              </label>
              <Input
                placeholder="Enter Name.."
                value={newBookingData.clientName}
                onChange={(e) => setField("clientName", e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Service Type *</label>
              <Select
                placeholder="Service Type"
                options={serviceTypeOptions}
                value={serviceTypeOptions.find(
                  (i) => i.value === newBookingData.serviceType
                )}
                onChange={(value) => setField("serviceType", value.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Bedrooms</label>
              <Select
                placeholder="Select bedrooms"
                options={bedroomOptions}
                value={bedroomOptions.find(
                  (i) => i.value === newBookingData.bedrooms
                )}
                onChange={(value) => setField("bedrooms", value.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Bathrooms</label>
              <Select
                placeholder="Select bathrooms"
                options={bathroomOptions}
                value={bathroomOptions.find(
                  (i) => i.value === newBookingData.bathrooms
                )}
                onChange={(value) => setField("bathrooms", value.value)}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-medium">
                Approximate Square Footage
              </label>
              <Select
                placeholder="Select square footage"
                options={squareFootageOptions}
                value={squareFootageOptions.find(
                  (i) => i.value === newBookingData.squareFootage
                )}
                onChange={(value) => setField("squareFootage", value.value)}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-medium">Service Address</label>
              <AddressInput
                placeholder="123, main street, City, State 1234"
                value={newBookingData.serviceAddress}
                onChange={(e) => setField("serviceAddress", e)}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <Button
              type="button"
              variant="secondary-outline"
              className="w-full py-3 border border-[#2D3648] rounded-lg"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="w-full py-3 bg-[#2D3648] text-white rounded-lg"
              disabled={isPending}
            >
              Add Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, portalContainer);
}
