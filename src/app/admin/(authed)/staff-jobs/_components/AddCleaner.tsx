/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";
import React, { useState } from "react";
import AddressInput, {
  AddressDetails
} from "@/app/(landings)/booking/new/_components/AddressInput";
import { Textarea } from "@/components/ui/Textarea";
import axios from "axios";
import { toast } from "react-hot-toast";
import ModalWrapper from "@/components/common/ModalWrapper";
import Checkbox from "@/components/ui/Checkbox";

// You'll need to create or modify these queries for your actual implementation
import { useServiceAreasQuery } from "../../_services/queries";

// Language options
const languageOptions = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
  { label: "Arabic", value: "Arabic" },
  { label: "Mandarin", value: "Mandarin" },
  { label: "Hindi", value: "Hindi" }
];

// Experience options
const experienceOptions = [
  { label: "Less than 1 year", value: "0-1" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5-10 years", value: "5-10" },
  { label: "10+ years", value: "10+" }
];

// Preference options
const preferenceOptions = [
  { label: "Flexible scheduling", value: "flexible" },
  { label: "Prefers advance booking (24-48 hours)", value: "advance" },
  { label: "Weekdays only", value: "weekdays" },
  { label: "Weekends available", value: "weekends" },
  { label: "Evening availability", value: "evening" }
];

export default function AddCleaner({ onClose }: { onClose: () => void }) {
  const { data: serviceAreas } = useServiceAreasQuery();

  const [cleanerData, setCleanerData] = useState({
    // Personal Info
    fullName: "",
    phoneNumber: "",
    email: "",
    profile: "",

    // Professional Details
    description: "",
    quote: "",
    experience: "",
    preference: "flexible",

    // Location
    address: "",
    lng: null as number | null,
    lat: null as number | null,

    // Skills and Qualifications
    languages: [] as string[],
    specialitiesIds: [] as number[],
    serviceAreasIds: [] as number[],
    qualificationsIds: [] as number[]
  });

  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (key: keyof typeof cleanerData, value: any) => {
    setCleanerData((prev) => ({ ...prev, [key]: value }));
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
    setField("address", address);
    if (details) {
      setField("lat", details.lat);
      setField("lng", details.lon);
    }
  };

  // Handle multiple selection items
  const handleLanguageToggle = (language: string) => {
    setCleanerData((prev) => {
      const languageExists = prev.languages.includes(language);

      if (languageExists) {
        return {
          ...prev,
          languages: prev.languages.filter((lang) => lang !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, language]
        };
      }
    });
  };

  // const handleSpecialityToggle = (id: number) => {
  //   setCleanerData((prev) => {
  //     const exists = prev.specialitiesIds.includes(id);

  //     if (exists) {
  //       return {
  //         ...prev,
  //         specialitiesIds: prev.specialitiesIds.filter(specId => specId !== id)
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         specialitiesIds: [...prev.specialitiesIds, id]
  //       };
  //     }
  //   });
  // };

  const handleServiceAreaToggle = (id: number) => {
    setCleanerData((prev) => {
      const exists = prev.serviceAreasIds.includes(id);

      if (exists) {
        return {
          ...prev,
          serviceAreasIds: prev.serviceAreasIds.filter(
            (areaId) => areaId !== id
          )
        };
      } else {
        return {
          ...prev,
          serviceAreasIds: [...prev.serviceAreasIds, id]
        };
      }
    });
  };

  // const handleQualificationToggle = (id: number) => {
  //   setCleanerData((prev) => {
  //     const exists = prev.qualificationsIds.includes(id);

  //     if (exists) {
  //       return {
  //         ...prev,
  //         qualificationsIds: prev.qualificationsIds.filter(qualId => qualId !== id)
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         qualificationsIds: [...prev.qualificationsIds, id]
  //       };
  //     }
  //   });
  // };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!cleanerData.fullName) newErrors.fullName = "Name is required";
    if (!cleanerData.email) newErrors.email = "Email is required";
    if (!cleanerData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!cleanerData.experience)
      newErrors.experience = "Experience level is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanerData.email && !emailRegex.test(cleanerData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (
      cleanerData.phoneNumber &&
      !phoneRegex.test(cleanerData.phoneNumber.replace(/\D/g, ""))
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
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
      // Format the data according to the expected API structure
      // const formData = {
      //   ...cleanerData,
      //   // Any additional formatting needed
      // };

      // Send data to the API
      // await mutateAsync({ formData });
      toast.success("Cleaner added successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to add cleaner:", error);

      if (axios.isAxiosError(error) && error.response) {
        setErrors((prev) => ({
          ...prev,
          form: error.response?.data?.error?.message || "Failed to add cleaner"
        }));
        toast.error(
          error.response?.data?.error?.message || "Failed to add cleaner"
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

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-heading-5 font-bold text-3xl">Add Cleaner</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 font-medium">Full Name *</label>
                <Input
                  placeholder="Enter Full Name"
                  value={cleanerData.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className={`w-full p-4 rounded-lg ${errors.fullName ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.fullName}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={cleanerData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`w-full p-4 rounded-lg ${errors.email ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.email}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={cleanerData.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  className={`w-full p-4 rounded-lg ${errors.phoneNumber ? "border-red-500" : "bg-gray-50"}`}
                  error={errors.phoneNumber}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Profile Image URL
                </label>
                <Input
                  placeholder="https://example.com/profile-image.jpg"
                  value={cleanerData.profile}
                  onChange={(e) => setField("profile", e.target.value)}
                  className="w-full p-4 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Professional Details Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-medium">
                  Experience Level *
                </label>
                <Select
                  accent="secondary"
                  placeholder="Select experience level"
                  options={experienceOptions}
                  value={experienceOptions.find(
                    (i) => i.value === cleanerData.experience
                  )}
                  onChange={(value) => setField("experience", value.value)}
                  className="w-full"
                  error={errors.experience}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Work Preference
                </label>
                <Select
                  accent="secondary"
                  placeholder="Select preference"
                  options={preferenceOptions}
                  value={preferenceOptions.find(
                    (i) => i.value === cleanerData.preference
                  )}
                  onChange={(value) => setField("preference", value.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Personal Quote</label>
                <Input
                  placeholder="E.g. I believe every home deserves to be a sanctuary."
                  value={cleanerData.quote}
                  onChange={(e) => setField("quote", e.target.value)}
                  className="w-full p-4 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Description</label>
                <Textarea
                  placeholder="Brief description about the cleaner's background and experience..."
                  value={cleanerData.description}
                  onChange={(e) => setField("description", e.target.value)}
                  className="w-full p-4 rounded-lg bg-gray-50"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Address</h3>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Home Address</label>
              <AddressInput
                placeholder="Enter home address"
                value={cleanerData.address}
                onChange={(address, coordinates) =>
                  handleAddressSelected(address, coordinates)
                }
                error={errors.address}
              />
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {languageOptions.map((language) => (
                <div
                  key={language.value}
                  className={`flex items-start gap-2 p-2 border rounded-md transition-colors ${
                    cleanerData.languages.includes(language.value)
                      ? "border-secondary-700/70 bg-secondary-50/30"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Checkbox
                    id={`lang-${language.value}`}
                    checked={cleanerData.languages.includes(language.value)}
                    onChange={() => handleLanguageToggle(language.value)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`lang-${language.value}`}
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {language.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialities Section */}
          {/* {specialities && specialities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Specialities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialities.map((speciality) => (
                  <div
                    key={speciality.id}
                    className={`flex items-start gap-2 p-2 border rounded-md transition-colors ${
                      cleanerData.specialitiesIds.includes(speciality.id)
                        ? "border-secondary-700/70 bg-secondary-50/30"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={`spec-${speciality.id}`}
                      checked={cleanerData.specialitiesIds.includes(speciality.id)}
                      onChange={() => handleSpecialityToggle(speciality.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`spec-${speciality.id}`}
                        className="text-sm font-medium text-gray-900 cursor-pointer capitalize"
                      >
                        {speciality.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Service Areas Section */}
          {serviceAreas && serviceAreas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Service Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area.id}
                    className={`flex items-start gap-2 p-2 border rounded-md transition-colors ${
                      cleanerData.serviceAreasIds.includes(area.id)
                        ? "border-secondary-700/70 bg-secondary-50/30"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={`area-${area.id}`}
                      checked={cleanerData.serviceAreasIds.includes(area.id)}
                      onChange={() => handleServiceAreaToggle(area.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`area-${area.id}`}
                        className="text-sm font-medium text-gray-900 cursor-pointer capitalize"
                      >
                        {area.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications Section */}
          {/* {qualifications && qualifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Qualifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {qualifications.map((qualification) => (
                  <div
                    key={qualification.id}
                    className={`flex items-start gap-2 p-2 border rounded-md transition-colors ${
                      cleanerData.qualificationsIds.includes(qualification.id)
                        ? "border-secondary-700/70 bg-secondary-50/30"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={`qual-${qualification.id}`}
                      checked={cleanerData.qualificationsIds.includes(qualification.id)}
                      onChange={() => handleQualificationToggle(qualification.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`qual-${qualification.id}`}
                        className="text-sm font-medium text-gray-900 cursor-pointer capitalize"
                      >
                        {qualification.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

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
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Cleaner"}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
