import {
  bathroomOptions,
  bedroomOptions,
  squareFootageOptions
} from "@/app/(landings)/booking/new/formData";
import { Booking, ServiceOption } from "@/app/admin/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";
import React, { useState } from "react";

export default function EditBooking({
  booking,
  servicesOptions,
  onClose
}: {
  booking: Booking;
  servicesOptions: ServiceOption[];
  onClose: () => void;
}) {
  const serviceTypeOptions = servicesOptions.map((i) => ({
    label: i.name.replace(/(?<=^| )\w/g, (i) => i.toUpperCase()),
    value: i.id.toString()
  }));

  const [newBookingData, setNewBookingData] = useState({
    fullName: booking.customer?.personalInformation.fullName,
    serviceType: booking.serviceType.serviceId,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    approximateSquareFootage: booking.approximateSquareFootage
  });
  console.log(newBookingData);

  const setField = (key: keyof typeof newBookingData, value: string) => {
    setNewBookingData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border border-black/10 rounded-lg p-4 w-full max-w-2xl">
      <div className="flex justify-between items-center">
        <p className="text-heading-5 font-bold">Edit Booking</p>
        <button onClick={onClose}>
          <X className="size-8 text-secondary-700/70" />
        </button>
      </div>
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
        <Button variant={"secondary-outline"} size={"xs"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"secondary"} size={"xs"}>
          Edit Booking
        </Button>
      </div>
    </div>
  );
}
