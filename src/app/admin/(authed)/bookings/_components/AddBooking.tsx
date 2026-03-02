/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
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
import React, { useState, useEffect } from "react";
import {
  useServiceAddOnsQuery,
  useServicesQuery,
  useTimeSlotsQuery
} from "../../_services/queries";
import AddressInput, {
  AddressDetails
} from "@/app/(landings)/booking/new/_components/AddressInput";
import { Textarea } from "@/components/ui/Textarea";
import DateTimeSlotsFields from "@/components/common/DateTimeSlotsFIelds";
import { useAddBookingMutation } from "../../_services/mutations";
import ModalWrapper from "@/components/common/ModalWrapper";
import Checkbox from "@/components/ui/Checkbox";
import { ServiceAddOn } from "@/app/(landings)/booking/new/types";

const accessMethodOptions = accessOptions.map((i) => ({
  label: i.name,
  value: i.id
}));
const petOptions = petTypeOptions.map((i) => ({ label: i.name, value: i.id }));

type BookingFormData = {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceType: string;
  specificServiceType: string;
  frequency: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  serviceAddress: string;
  lng: number | null;
  lat: number | null;
  state: string;
  city: string;
  zipCode: string;
  petType: string;
  petInstructions: string;
  accessMethod: string;
  accessInstructions: string;
  preferredDate: Date | null;
  timeWindow: string;
  addOns: ServiceAddOn[];
  otherService: string;
};

export default function AddBooking({ onClose }: { onClose: () => void }) {
  const { data: servicesOptions } = useServicesQuery();
  const { data: timeSlots } = useTimeSlotsQuery();
  const { data: addOns } = useServiceAddOnsQuery();
  const { mutateAsync } = useAddBookingMutation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    defaultValues: {
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      serviceType: "",
      specificServiceType: "",
      frequency: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      serviceAddress: "",
      lng: null,
      lat: null,
      state: "",
      city: "",
      zipCode: "",
      petType: "no-pets",
      petInstructions: "",
      accessMethod: accessOptions[0].id,
      accessInstructions: "",
      preferredDate: null,
      timeWindow: "",
      addOns: [],
      otherService: ""
    }
  });

  const serviceType = watch("serviceType");
  const specificServiceType = watch("specificServiceType");
  const petType = watch("petType");
  const accessMethod = watch("accessMethod");
  const addOnsValue = watch("addOns");

  const [specificServices, setSpecificServices] = useState<any[]>([]);

  // Update specific service types when a service type is selected
  useEffect(() => {
    if (servicesOptions && serviceType) {
      const selectedService = servicesOptions.find(
        (service) => service.id.toString() === serviceType
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
      setValue("specificServiceType", "");
    }
  }, [servicesOptions, serviceType, setValue]);

  // Check if the selected specific service type is recurring
  const isRecurringService = React.useMemo(() => {
    if (!servicesOptions || !serviceType || !specificServiceType) return false;

    const selectedService = servicesOptions.find(
      (service) => service.id.toString() === serviceType
    );

    const selectedSpecificService = selectedService?.serviceTypes?.find(
      (type) => type.id.toString() === specificServiceType
    );

    return (
      selectedSpecificService?.name?.toLowerCase().includes("recurring") ||
      false
    );
  }, [servicesOptions, serviceType, specificServiceType]);

  if (!servicesOptions) return null;

  const serviceTypeOptions = servicesOptions.map((i) => ({
    label: i.name.replace(/(?<=^| )\w/g, (i) => i.toUpperCase()),
    value: i.id.toString()
  }));

  // Handle address selection with coordinates
  const handleAddressSelected = (
    address: string | null,
    details?: AddressDetails
  ) => {
    if (address) {
      setValue("serviceAddress", address);
    }
    if (details) {
      setValue("lat", details.lat);
      setValue("lng", details.lon);
      setValue("city", details.city);
      setValue("state", details.state);
      if (details.postcode) setValue("zipCode", details.postcode);
    }
  };

  // Add-on selection handling
  const handleAddOnToggle = (addon: ServiceAddOn) => {
    const existingAddOnIndex = addOnsValue.findIndex(
      (item) => item.id === addon.id
    );

    if (existingAddOnIndex >= 0) {
      const updatedAddOns = [...addOnsValue];
      updatedAddOns.splice(existingAddOnIndex, 1);
      setValue("addOns", updatedAddOns);

      // Clear otherService if "others" is unchecked
      if (addon.name === "others") {
        setValue("otherService", "");
      }
    } else {
      setValue("addOns", [...addOnsValue, addon]);
    }
  };

  const isAddOnSelected = (addonId: number) => {
    return addOnsValue.some((item) => item.id === addonId);
  };

  const isOthersSelected = addOnsValue.some((item) => item.name === "others");

  const onSubmit = async (data: BookingFormData) => {
    const selectedService = servicesOptions.find(
      (service) => service.id.toString() === data.serviceType
    );

    const selectedSpecificService = selectedService?.serviceTypes?.find(
      (type) => type.id.toString() === data.specificServiceType
    );

    const formData = {
      fullName: data.clientName,
      phoneNumber: data.clientPhone,
      email: data.clientEmail,
      serviceType: selectedService,
      specificServiceType: selectedSpecificService,
      frequency: data.frequency,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      squareFootage: data.squareFootage,
      serviceAddress: data.serviceAddress,
      lat: data.lat,
      lng: data.lng,
      country: "US",
      state: data.state,
      city: data.city,
      zipCode: data.zipCode,
      petType: data.petType,
      petInstructions: data.petInstructions,
      accessMethod: data.accessMethod,
      accessInstructions: data.accessInstructions,
      preferredDate: data.preferredDate,
      timeWindow: data.timeWindow,
      addOns: data.addOns,
      otherService: data.otherService,
      isAdminBooking: true
    };

    await mutateAsync({ formData });
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-heading-5 font-bold text-3xl">Add Booking</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Client Information Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Client Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 font-medium">
                  Client&apos;s Name *
                </label>
                <Input
                  {...register("clientName", {
                    required: "Client name is required"
                  })}
                  placeholder="Enter Name.."
                  className={`w-full p-4 rounded-lg ${errors.clientName ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.clientName?.message}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Client&apos;s Email *
                </label>
                <Input
                  {...register("clientEmail", {
                    required: "Client email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  type="email"
                  placeholder="Email address"
                  className={`w-full p-4 rounded-lg ${errors.clientEmail ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.clientEmail?.message}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Client&apos;s Phone *
                </label>
                <Input
                  {...register("clientPhone", {
                    required: "Client phone is required",
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Please enter a valid phone number"
                    }
                  })}
                  type="tel"
                  placeholder="Phone number"
                  className={`w-full p-4 rounded-lg ${errors.clientPhone ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.clientPhone?.message}
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
                <Controller
                  name="serviceType"
                  control={control}
                  rules={{ required: "Service type is required" }}
                  render={({ field }) => (
                    <Select
                      accent="secondary"
                      placeholder="Service Type"
                      options={serviceTypeOptions}
                      value={serviceTypeOptions.find(
                        (i) => i.value === field.value
                      )}
                      onChange={(value) => field.onChange(value.value)}
                      className={`w-full`}
                      error={errors.serviceType?.message}
                    />
                  )}
                />
              </div>

              {specificServices.length > 0 && (
                <div>
                  <label className="block mb-2 font-medium">
                    Specific Service Type *
                  </label>
                  <Controller
                    name="specificServiceType"
                    control={control}
                    rules={{ required: "Specific service type is required" }}
                    render={({ field }) => (
                      <Select
                        accent="secondary"
                        placeholder="Select specific type"
                        options={specificServices}
                        value={specificServices.find(
                          (i) => i.value === field.value
                        )}
                        onChange={(value) => field.onChange(value.value)}
                        className={`w-full`}
                        error={errors.specificServiceType?.message}
                      />
                    )}
                  />
                </div>
              )}

              {isRecurringService && (
                <div>
                  <label className="block mb-2 font-medium">Frequency *</label>
                  <Controller
                    name="frequency"
                    control={control}
                    rules={{ required: "Frequency is required" }}
                    render={({ field }) => (
                      <Select
                        accent="secondary"
                        placeholder="Select frequency"
                        options={frequencies}
                        value={frequencies.find((i) => i.value === field.value)}
                        onChange={(value) => field.onChange(value.value)}
                        className={`w-full`}
                        error={errors.frequency?.message}
                      />
                    )}
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 font-medium">Bedrooms *</label>
                <Controller
                  name="bedrooms"
                  control={control}
                  rules={{ required: "Bedrooms is required" }}
                  render={({ field }) => (
                    <Select
                      accent="secondary"
                      placeholder="Select bedrooms"
                      options={bedroomOptions}
                      value={bedroomOptions.find(
                        (i) => i.value === field.value
                      )}
                      onChange={(value) => field.onChange(value.value)}
                      className={`w-full`}
                      error={errors.bedrooms?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Bathrooms *</label>
                <Controller
                  name="bathrooms"
                  control={control}
                  rules={{ required: "Bathrooms is required" }}
                  render={({ field }) => (
                    <Select
                      accent="secondary"
                      placeholder="Select bathrooms"
                      options={bathroomOptions}
                      value={bathroomOptions.find(
                        (i) => i.value === field.value
                      )}
                      onChange={(value) => field.onChange(value.value)}
                      className={`w-full`}
                      error={errors.bathrooms?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Square Footage</label>
                <Controller
                  name="squareFootage"
                  control={control}
                  render={({ field }) => (
                    <Select
                      accent="secondary"
                      placeholder="Select square footage"
                      options={squareFootageOptions}
                      value={squareFootageOptions.find(
                        (i) => i.value === field.value
                      )}
                      onChange={(value) => field.onChange(value.value)}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Service Address *
              </label>
              <Controller
                name="serviceAddress"
                control={control}
                rules={{ required: "Service address is required" }}
                render={({ field }) => (
                  <AddressInput
                    placeholder="123, main street, City, State 1234"
                    value={field.value}
                    onChange={(address, coordinates) => {
                      field.onChange(address);
                      handleAddressSelected(address, coordinates);
                    }}
                    error={errors.serviceAddress?.message}
                  />
                )}
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

              {isOthersSelected && (
                <div className="mt-4">
                  <label className="block mb-2 font-medium">
                    Specify Other Service *
                  </label>
                  <Input
                    {...register("otherService", {
                      required: isOthersSelected
                        ? "Please specify the other service"
                        : false
                    })}
                    placeholder="Enter text..."
                    className="w-full p-4 rounded-lg bg-gray-50"
                    error={errors.otherService?.message}
                  />
                </div>
              )}
            </div>
          )}

          {/* Scheduling Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Scheduling</h3>
            {timeSlots && (
              <Controller
                name="preferredDate"
                control={control}
                rules={{ required: "Preferred date is required" }}
                render={({ field: dateField }) => (
                  <Controller
                    name="timeWindow"
                    control={control}
                    rules={{ required: "Time window is required" }}
                    render={({ field: timeField }) => (
                      <DateTimeSlotsFields
                        accent="secondary"
                        timeSlots={timeSlots}
                        selectedDate={dateField.value || null}
                        selectedTimeWindow={timeField.value || null}
                        handleSelectedDate={(date) => {
                          dateField.onChange(date);
                          timeField.onChange(null);
                        }}
                        handleSelectedTimeWindow={(value) =>
                          timeField.onChange(value)
                        }
                      />
                    )}
                  />
                )}
              />
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
                <Controller
                  name="petType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      accent="secondary"
                      placeholder="Select pet type"
                      options={petOptions}
                      value={petOptions.find((i) => i.value === field.value)}
                      onChange={(value) => field.onChange(value.value)}
                      className="w-full"
                    />
                  )}
                />
              </div>

              {petType !== "no-pets" && (
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Pet Instructions
                  </label>
                  <Textarea
                    {...register("petInstructions")}
                    placeholder="Provide any specific instructions regarding pets..."
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
                <Controller
                  name="accessMethod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      accent="secondary"
                      placeholder="How will cleaners access the property?"
                      options={accessMethodOptions}
                      value={accessMethodOptions.find(
                        (i) => i.value === field.value
                      )}
                      onChange={(value) => field.onChange(value.value)}
                      className="w-full"
                    />
                  )}
                />
              </div>
              {accessMethod !== "home" && (
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Access Instructions
                  </label>
                  <Textarea
                    {...register("accessInstructions")}
                    placeholder="Provide specific instructions for accessing the property..."
                    className="w-full p-4 rounded-lg bg-gray-50"
                    rows={3}
                  />
                </div>
              )}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Add Booking"}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
