/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useServicesQuery, useTimeSlotsQuery } from "../../_services/queries";
import AddressInput, {
  AddressDetails
} from "@/app/(landings)/booking/new/_components/AddressInput";
import { Textarea } from "@/components/ui/Textarea";
import axios from "axios";
import { toast } from "react-hot-toast";
import DateTimeSlotsFields from "@/components/common/DateTimeSlotsFIelds";

// Frequency options based on the client form
const frequencyOptions = [
  { label: "One-time", value: "ONCE" },
  { label: "Weekly", value: "WEEKLY" },
  { label: "Biweekly", value: "BIWEEKLY" },
  { label: "Monthly", value: "MONTHLY" }
];

// Access method options
const accessMethodOptions = [
  { label: "Client will be home", value: "home" },
  { label: "Key provided", value: "key" },
  { label: "Smart lock", value: "smartlock" },
  { label: "Concierge", value: "concierge" },
  { label: "Other", value: "other" }
];

// Pet options
const petOptions = [
  { label: "No pets", value: "no-pets" },
  { label: "Dog(s)", value: "dogs" },
  { label: "Cat(s)", value: "cats" },
  { label: "Both dogs and cats", value: "both" },
  { label: "Other pets", value: "other" }
];

export default function AddBooking({ onClose }: { onClose: () => void }) {
  const { data: servicesOptions } = useServicesQuery();
  const { data: timeSlots } = useTimeSlotsQuery();
  console.log(timeSlots);

  const [newBookingData, setNewBookingData] = useState({
    // Client Info
    clientName: "",
    clientPhone: "",
    clientEmail: "",

    // Service Details
    serviceType: "",
    specificServiceType: "",
    frequency: "ONCE", // Default to one-time service
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    serviceAddress: "",

    // Location coordinates
    lng: null as number | null,
    lat: null as number | null,
    state: "",
    city: "",
    zipCode: "",

    // Additional Details
    petType: "no-pets",
    petInstructions: "",
    accessMethod: "home",
    accessInstructions: "",

    // Scheduling
    preferredDate: null as Date | null,
    timeWindow: "",

    // Other
    addOns: [] as { id: number; name: string; price: number }[],
    specialInstructions: ""
  });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [specificServices, setSpecificServices] = useState<any[]>([]);

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

  // Update specific service types when a service type is selected
  useEffect(() => {
    if (servicesOptions && newBookingData.serviceType) {
      const selectedService = servicesOptions.find(
        (service) => service.id.toString() === newBookingData.serviceType
      );

      if (selectedService && selectedService.serviceTypes) {
        setSpecificServices(
          selectedService.serviceTypes.map((type: any) => ({
            label: type.name.replace(/(?<=^| )\w/g, (i: any) =>
              i.toUpperCase()
            ),
            value: type.id.toString()
          }))
        );
      } else {
        setSpecificServices([]);
      }
    }
  }, [servicesOptions, newBookingData.serviceType]);

  if (!servicesOptions || !portalContainer) return null;

  const serviceTypeOptions = servicesOptions.map((i) => ({
    label: i.name.replace(/(?<=^| )\w/g, (i) => i.toUpperCase()),
    value: i.id.toString()
  }));

  const setField = (key: keyof typeof newBookingData, value: any) => {
    setNewBookingData((prev) => ({ ...prev, [key]: value }));
    // Clear error when field is updated
    if (errors[key]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  // Handle address selection with coordinates
  const handleAddressSelected = (address: string, details?: AddressDetails) => {
    setField("serviceAddress", address);
    console.log(details);
    if (details) {
      setField("lat", details.lat);
      setField("lng", details.lon);
      setField("city", details.city);
      setField("state", details.state);
      setField("zipCode", details.postcode);
    }
  };

  const handleSelectedDate = (date: Date | null) => {
    setField("preferredDate", date);

    setField("timeWindow", null);
  };

  const handleSelectedTimeWindow = (value: string | null) => {
    setField("timeWindow", value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!newBookingData.clientName)
      newErrors.clientName = "Client name is required";
    if (!newBookingData.clientEmail)
      newErrors.clientEmail = "Client email is required";
    if (!newBookingData.clientPhone)
      newErrors.clientPhone = "Client phone is required";
    if (!newBookingData.serviceType)
      newErrors.serviceType = "Service type is required";
    if (!newBookingData.specificServiceType)
      newErrors.specificServiceType = "Specific service type is required";
    if (!newBookingData.serviceAddress)
      newErrors.serviceAddress = "Service address is required";
    if (!newBookingData.preferredDate)
      newErrors.preferredDate = "Preferred date is required";
    if (!newBookingData.timeWindow)
      newErrors.timeWindow = "Time window is required";
    if (!newBookingData.bedrooms) newErrors.bedrooms = "Bedrooms is required";
    if (!newBookingData.bathrooms)
      newErrors.bathrooms = "Bathrooms is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      newBookingData.clientEmail &&
      !emailRegex.test(newBookingData.clientEmail)
    ) {
      newErrors.clientEmail = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (
      newBookingData.clientPhone &&
      !phoneRegex.test(newBookingData.clientPhone.replace(/\D/g, ""))
    ) {
      newErrors.clientPhone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    setIsPending(true);

    try {
      const selectedService = servicesOptions.find(
        (service) => service.id.toString() === newBookingData.serviceType
      );

      const selectedSpecificService = selectedService?.serviceTypes?.find(
        (type) => type.id.toString() === newBookingData.specificServiceType
      );

      // Format the data according to the structure expected by the API
      const formData = {
        // Format to match schema.ts and route.ts
        fullName: newBookingData.clientName,
        phoneNumber: newBookingData.clientPhone,
        email: newBookingData.clientEmail,

        serviceType: selectedService,
        specificServiceType: selectedSpecificService,
        frequency: newBookingData.frequency,
        bedrooms: newBookingData.bedrooms,
        bathrooms: newBookingData.bathrooms,
        squareFootage: newBookingData.squareFootage,
        serviceAddress: newBookingData.serviceAddress,

        lat: newBookingData.lat,
        lng: newBookingData.lng,

        // Make the API happy with the required fields
        country: "US",
        state: newBookingData.state,
        city: newBookingData.city,
        zipCode: newBookingData.zipCode,

        petType: newBookingData.petType,
        petInstructions: newBookingData.petInstructions,
        accessMethod: newBookingData.accessMethod,
        accessInstructions: newBookingData.accessInstructions,

        preferredDate: newBookingData.preferredDate,
        timeWindow: newBookingData.timeWindow,

        addOns: newBookingData.addOns,
        specialInstructions: newBookingData.specialInstructions,

        // Flag to identify this is an admin booking
        isAdminBooking: true
      };

      // Send data to the API
      await axios.post("/api/submit-order", formData);

      onClose();

      // Refresh the bookings list if needed
      // queryClient.invalidateQueries(['bookings']);
    } catch (error) {
      console.error("Failed to add booking:", error);

      if (axios.isAxiosError(error) && error.response) {
        setErrors((prev) => ({
          ...prev,
          form:
            error.response?.data?.error?.message || "Failed to create booking",
          serviceAddress:
            error.response?.data?.error?.message?.includes("area") &&
            error.response.data.error.message
        }));
        toast.error(
          error.response?.data?.error?.message || "Failed to create booking"
        );
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Network error. Please try again."
        }));
        toast.error("Network error. Please try again.");
      }
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

        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-600">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Client Information Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Client Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 font-medium">
                  Client&apos;s Name *
                </label>
                <Input
                  placeholder="Enter Name.."
                  value={newBookingData.clientName}
                  onChange={(e) => setField("clientName", e.target.value)}
                  className={`w-full p-4 rounded-lg ${errors.clientName ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.clientName}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Client&apos;s Email *
                </label>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={newBookingData.clientEmail}
                  onChange={(e) => setField("clientEmail", e.target.value)}
                  className={`w-full p-4 rounded-lg ${errors.clientEmail ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.clientEmail}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Client&apos;s Phone *
                </label>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={newBookingData.clientPhone}
                  onChange={(e) => setField("clientPhone", e.target.value)}
                  className={`w-full p-4 rounded-lg ${errors.clientPhone ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.clientPhone}
                />
              </div>
            </div>
          </div>

          {/* Service Details Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <div>
                <label className="block mb-2 font-medium">Service Type *</label>
                <Select
                  placeholder="Service Type"
                  options={serviceTypeOptions}
                  value={serviceTypeOptions.find(
                    (i) => i.value === newBookingData.serviceType
                  )}
                  onChange={(value) => {
                    setField("serviceType", value.value);
                    setField("specificServiceType", ""); // Reset specific type when main type changes
                  }}
                  className={`w-full`}
                  error={errors.serviceType}
                />
              </div>

              {specificServices.length > 0 && (
                <div>
                  <label className="block mb-2 font-medium">
                    Specific Service Type *
                  </label>
                  <Select
                    placeholder="Select specific type"
                    options={specificServices}
                    value={specificServices.find(
                      (i) => i.value === newBookingData.specificServiceType
                    )}
                    onChange={(value) =>
                      setField("specificServiceType", value.value)
                    }
                    className={`w-full`}
                    error={errors.specificServiceType}
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 font-medium">Frequency *</label>
                <Select
                  placeholder="Select frequency"
                  options={frequencyOptions}
                  value={frequencyOptions.find(
                    (i) => i.value === newBookingData.frequency
                  )}
                  onChange={(value) => setField("frequency", value.value)}
                  className={`w-full`}
                  error={errors.frequency}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Bedrooms *</label>
                <Select
                  placeholder="Select bedrooms"
                  options={bedroomOptions}
                  value={bedroomOptions.find(
                    (i) => i.value === newBookingData.bedrooms
                  )}
                  onChange={(value) => setField("bedrooms", value.value)}
                  className={`w-full`}
                  error={errors.bedrooms}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Bathrooms *</label>
                <Select
                  placeholder="Select bathrooms"
                  options={bathroomOptions}
                  value={bathroomOptions.find(
                    (i) => i.value === newBookingData.bathrooms
                  )}
                  onChange={(value) => setField("bathrooms", value.value)}
                  className={`w-full`}
                  error={errors.bathrooms}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Square Footage</label>
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
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Service Address *
              </label>
              <AddressInput
                placeholder="123, main street, City, State 1234"
                value={newBookingData.serviceAddress}
                onChange={(address, coordinates) =>
                  handleAddressSelected(address, coordinates)
                }
                error={errors.serviceAddress}
              />
            </div>
          </div>

          {/* Pet Information Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Pet Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-2 font-medium">
                  Pets at Property
                </label>
                <Select
                  placeholder="Select pet type"
                  options={petOptions}
                  value={petOptions.find(
                    (i) => i.value === newBookingData.petType
                  )}
                  onChange={(value) => setField("petType", value.value)}
                  className="w-full"
                />
              </div>

              {newBookingData.petType !== "no-pets" && (
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Pet Instructions
                  </label>
                  <Textarea
                    placeholder="Provide any specific instructions regarding pets..."
                    value={newBookingData.petInstructions}
                    onChange={(e) =>
                      setField("petInstructions", e.target.value)
                    }
                    className="w-full p-4 rounded-lg bg-gray-50"
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Access Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Property Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-2 font-medium">Access Method</label>
                <Select
                  placeholder="How will cleaners access the property?"
                  options={accessMethodOptions}
                  value={accessMethodOptions.find(
                    (i) => i.value === newBookingData.accessMethod
                  )}
                  onChange={(value) => setField("accessMethod", value.value)}
                  className="w-full"
                />
              </div>
              {newBookingData.accessMethod !== "home" && (
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Access Instructions
                  </label>
                  <Textarea
                    placeholder="Provide specific instructions for accessing the property..."
                    value={newBookingData.accessInstructions}
                    onChange={(e) =>
                      setField("accessInstructions", e.target.value)
                    }
                    className="w-full p-4 rounded-lg bg-gray-50"
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Scheduling Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Scheduling</h3>
            {timeSlots && (
              <DateTimeSlotsFields
                timeSlots={timeSlots}
                selectedDate={newBookingData.preferredDate}
                selectedTimeWindow={newBookingData.timeWindow}
                handleSelectedDate={handleSelectedDate}
                handleSelectedTimeWindow={handleSelectedTimeWindow}
              />
            )}
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                <label className="block mb-2 font-medium">
                  Special Instructions
                </label>
                <Textarea
                  placeholder="Any special requests or instructions for the service..."
                  value={newBookingData.specialInstructions}
                  onChange={(e) =>
                    setField("specialInstructions", e.target.value)
                  }
                  className="w-full p-4 rounded-lg bg-gray-50"
                  rows={3}
                />
              </div>
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
              {isPending ? "Creating..." : "Add Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, portalContainer);
}
