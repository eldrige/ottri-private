/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  accessOptions,
  bathroomOptions,
  bedroomOptions,
  frequencies,
  petTypeOptions,
  squareFootageOptions
} from "@/app/(landings)/booking/new/formData";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";
import React, { useState, useEffect, MouseEventHandler } from "react";
import {
  useServiceAddOnsQuery,
  useServicesQuery,
  useTimeSlotsQuery
} from "../../_services/queries";
import AddressInput, {
  AddressDetails
} from "@/app/(landings)/booking/new/_components/AddressInput";
import { Textarea } from "@/components/ui/Textarea";
import axios from "axios";
import DateTimeSlotsFields from "@/components/common/DateTimeSlotsFIelds";
import {
  useRescheduleBookingMutation,
  useUpdateBookingMutation
} from "../../_services/mutations";
import ModalWrapper from "@/components/common/ModalWrapper";
import Checkbox from "@/components/ui/Checkbox";
import { ServiceAddOn } from "@/app/(landings)/booking/new/types";
import { Booking } from "@/app/admin/types";

const accessMethodOptions = accessOptions.map((i) => ({
  label: i.name,
  value: i.id
}));
const petOptions = petTypeOptions.map((i) => ({ label: i.name, value: i.id }));

export default function EditBooking({
  onClose,
  booking
}: {
  onClose: () => void;
  booking: Booking;
}) {
  const { data: servicesOptions } = useServicesQuery();
  const { data: timeSlots } = useTimeSlotsQuery();
  const { data: addOns } = useServiceAddOnsQuery();
  const { mutateAsync: updateAsync } = useUpdateBookingMutation();
  const { mutateAsync: rescheduleAsync } = useRescheduleBookingMutation();

  // Store initial booking data to compare against changes
  const initialBookingData = {
    // Client Info
    clientName: booking.guest?.fullName,
    clientPhone: booking.guest?.phoneNumber,
    clientEmail: booking.guest?.email,

    // Service Details
    serviceType: booking.serviceType.serviceId.toString(),
    specificServiceType: booking.serviceType.id.toString(),
    frequency: booking.cleaningFrequency || "",
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    squareFootage: booking.approximateSquareFootage,
    serviceAddress: booking.address,

    // Location coordinates
    lng: booking.location?.coordinates[0] as number | null,
    lat: booking.location?.coordinates[1] as number | null,
    state: booking.guest?.state,
    city: booking.guest?.city,
    zipCode: booking.guest?.zipCode,

    // Additional Details
    petType: booking.pets,
    petInstructions: booking.petsInstructions,
    accessMethod: booking.entryMethod || "other",
    accessInstructions: booking.entryInstructions,

    // Scheduling
    preferredDate: new Date(booking.timeSlot.date),
    timeWindow: booking.timeSlot.templateId.toString(),

    // Other
    addOns: booking.addOns || ([] as ServiceAddOn[])
  };

  const [newBookingData, setNewBookingData] = useState({
    ...initialBookingData
  });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [specificServices, setSpecificServices] = useState<any[]>([]);

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

  if (!servicesOptions) return null;

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
  const handleAddressSelected = (
    address: string | null,
    details?: AddressDetails
  ) => {
    setField("serviceAddress", address || undefined);
    if (details?.lat) setField("lat", details.lat);
    if (details?.lon) setField("lng", details.lon);
    if (details?.city) setField("city", details.city);
    if (details?.state) setField("state", details.state);
    if (details?.postcode) setField("zipCode", details.postcode);
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

  // Helper function to check if a field has been changed
  const isFieldChanged = (field: keyof typeof newBookingData): boolean => {
    // Special handling for dates
    if (field === "preferredDate") {
      if (!newBookingData.preferredDate && !initialBookingData.preferredDate)
        return false;
      if (!newBookingData.preferredDate || !initialBookingData.preferredDate)
        return true;
      return (
        newBookingData.preferredDate.getTime() !==
        initialBookingData.preferredDate.getTime()
      );
    }

    // Special handling for addOns array
    if (field === "addOns") {
      if (newBookingData.addOns.length !== initialBookingData.addOns.length)
        return true;

      // Check if all add-ons in newBookingData exist in initialBookingData
      return (
        newBookingData.addOns.some(
          (addon) =>
            !initialBookingData.addOns.some(
              (initialAddon) => initialAddon.id === addon.id
            )
        ) ||
        initialBookingData.addOns.some(
          (initialAddon) =>
            !newBookingData.addOns.some((addon) => addon.id === initialAddon.id)
        )
      );
    }

    // Default comparison for other fields
    return newBookingData[field] !== initialBookingData[field];
  };

  // Function to check if any field has changed
  const hasChanges = (): boolean => {
    return Object.keys(newBookingData).some((key) =>
      isFieldChanged(key as keyof typeof newBookingData)
    );
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

      // Initialize an empty object for formData
      const formData: Record<string, any> = {};

      // Only add fields that have changed to the formData object
      if (isFieldChanged("clientName"))
        formData.fullName = newBookingData.clientName;
      if (isFieldChanged("clientPhone"))
        formData.phoneNumber = newBookingData.clientPhone;
      if (isFieldChanged("clientEmail"))
        formData.email = newBookingData.clientEmail;

      if (isFieldChanged("serviceType"))
        formData.serviceId = selectedService?.id;
      if (isFieldChanged("specificServiceType"))
        formData.serviceTypeId = selectedSpecificService?.id;
      if (isFieldChanged("frequency"))
        formData.cleaningFrequency = newBookingData.frequency;
      if (isFieldChanged("bedrooms"))
        formData.bedrooms = newBookingData.bedrooms;
      if (isFieldChanged("bathrooms"))
        formData.bathrooms = newBookingData.bathrooms;
      if (isFieldChanged("squareFootage"))
        formData.approximateSquareFootage = newBookingData.squareFootage;
      if (isFieldChanged("serviceAddress"))
        formData.address = newBookingData.serviceAddress;

      // Location fields - include them if any coordinate or address changed
      if (isFieldChanged("lat") || isFieldChanged("serviceAddress"))
        formData.lat = newBookingData.lat;
      if (isFieldChanged("lng") || isFieldChanged("serviceAddress"))
        formData.lng = newBookingData.lng;

      // Include these fields if address changed since they're related
      if (isFieldChanged("serviceAddress") || isFieldChanged("state"))
        formData.state = newBookingData.state;
      if (isFieldChanged("serviceAddress") || isFieldChanged("city"))
        formData.city = newBookingData.city;
      if (isFieldChanged("serviceAddress") || isFieldChanged("zipCode"))
        formData.zipCode = newBookingData.zipCode;

      if (isFieldChanged("petType")) formData.pets = newBookingData.petType;
      if (isFieldChanged("petInstructions"))
        formData.petsInstructions = newBookingData.petInstructions;
      if (isFieldChanged("accessMethod"))
        formData.entryMethod = newBookingData.accessMethod;
      if (isFieldChanged("accessInstructions"))
        formData.entryInstructions = newBookingData.accessInstructions;

      // Add addOnIds only if the add-ons have changed
      if (isFieldChanged("addOns"))
        formData.addOnIds = newBookingData.addOns.map((i) => i.id);

      // Only update if there are changes to the booking details
      let updatePromise = null as null | Promise<any>;
      if (Object.keys(formData).length > 0) {
        updatePromise = updateAsync({
          bookingId: booking.id,
          ...formData
        });
      }

      // Check specifically for scheduling changes
      let reschedulePromise = null as null | Promise<any>;
      if (isFieldChanged("preferredDate") || isFieldChanged("timeWindow")) {
        reschedulePromise = rescheduleAsync({
          bookingId: booking.id,
          timeSlotId: Number(newBookingData.timeWindow),
          date: newBookingData.preferredDate?.toISOString() || ""
        });
      }

      // Wait for both promises to resolve (if they exist)
      const promises = [updatePromise, reschedulePromise].filter(
        (p) => p !== null
      );
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      onClose();
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
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Network error. Please try again."
        }));
      }
    } finally {
      setIsPending(false);
    }
  };

  // Add-on selection handling
  const handleAddOnToggle = (addon: ServiceAddOn) => {
    setNewBookingData((prev) => {
      const existingAddOnIndex = prev.addOns.findIndex(
        (item) => item.id === addon.id
      );

      if (existingAddOnIndex >= 0) {
        // Remove the add-on if it's already selected
        const updatedAddOns = [...prev.addOns];
        updatedAddOns.splice(existingAddOnIndex, 1);
        return { ...prev, addOns: updatedAddOns };
      } else {
        // Add the add-on
        return {
          ...prev,
          addOns: [...prev.addOns, addon]
        };
      }
    });
  };

  const isAddOnSelected = (addonId: number) => {
    return newBookingData.addOns.some((item) => item.id === addonId);
  };

  const resetDate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setField("preferredDate", initialBookingData.preferredDate);
    setField("timeWindow", initialBookingData.timeWindow);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-heading-5 font-bold text-3xl">Edit Booking</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

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
                  accent="secondary"
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
                    accent="secondary"
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
                  accent="secondary"
                  placeholder="Select frequency"
                  options={frequencies}
                  value={frequencies.find(
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
                  accent="secondary"
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
                  accent="secondary"
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
                  accent="secondary"
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

          {/* Add-ons Section */}
          {addOns && addOns.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Add-on Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOns.map((addon) => (
                  <div
                    key={addon.id}
                    className={`flex items-start gap-2 p-2 border rounded-md transition-colors ${
                      isAddOnSelected(addon.id)
                        ? "border-secondary-700/70 bg-secondary-50/30"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={`addon-${addon.id}`}
                      checked={isAddOnSelected(addon.id)}
                      onChange={() => handleAddOnToggle(addon)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`addon-${addon.id}`}
                        className="text-sm font-medium text-gray-900 cursor-pointer capitalize"
                      >
                        {addon.name}
                        <span className="ml-1 text-gray-600 text-xs">
                          (${addon.price})
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scheduling Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Scheduling</h3>
            {timeSlots && (
              <>
                <DateTimeSlotsFields
                  accent="secondary"
                  timeSlots={timeSlots}
                  selectedDate={newBookingData.preferredDate}
                  selectedTimeWindow={newBookingData.timeWindow}
                  handleSelectedDate={handleSelectedDate}
                  handleSelectedTimeWindow={handleSelectedTimeWindow}
                  initialTimeWindow={newBookingData.timeWindow}
                />
                <button
                  onClick={resetDate}
                  className="block ml-auto mt-1 text-sm text-error hover:underline"
                >
                  Reset date & time
                </button>
              </>
            )}
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
                  accent="secondary"
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
                  accent="secondary"
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

          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-600">
              {errors.form}
            </div>
          )}
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
              disabled={isPending || !hasChanges()}
            >
              {isPending
                ? "Editing..."
                : hasChanges()
                  ? "Save Changes"
                  : "No Changes"}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
