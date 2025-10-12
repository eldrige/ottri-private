import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import React from "react";
import { AddCleanerForm } from "@/app/admin/types";
import Select from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import AddressInput from "@/app/(landings)/booking/new/_components/AddressInput";
import { useServiceAreasQuery } from "../../_services/queries";

interface SlotFormProps {
  formData: AddCleanerForm;
  setField: (field: keyof AddCleanerForm, value: unknown) => void;
  errors: {
    [key in keyof AddCleanerForm]?: string;
  };
}

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

export default function CleanerForm({
  formData,
  setField,
  errors
}: SlotFormProps) {
  const { data: serviceAreas } = useServiceAreasQuery();

  // Handle multiple selection items
  const handleLanguageToggle = (language: string) => {
    const languageExists = formData.languages.includes(language);

    if (languageExists) {
      return setField(
        "languages",
        formData.languages.filter((lang) => lang !== language)
      );
    } else {
      return setField("languages", [...formData.languages, language]);
    }
  };

  const handleServiceAreaToggle = (id: number) => {
    const exists = formData.serviceAreasIds.includes(id);

    if (exists) {
      return setField(
        "serviceAreasIds",
        formData.serviceAreasIds.filter((areaId) => areaId !== id)
      );
    } else {
      return setField("serviceAreasIds", [...formData.serviceAreasIds, id]);
    }
  };

  return (
    <form>
      {/* Personal Information Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2 font-medium">Full Name *</label>
            <Input
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              className={`w-full p-4 rounded-lg ${errors.fullName ? "border-red-500" : "bg-gray-50"}`}
              error={errors.fullName}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email Address *</label>
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
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
              value={formData.phoneNumber}
              onChange={(e) => setField("phoneNumber", e.target.value)}
              className={`w-full p-4 rounded-lg ${errors.phoneNumber ? "border-red-500" : "bg-gray-50"}`}
              error={errors.phoneNumber}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Profile Image URL</label>
            <Input
              placeholder="https://example.com/profile-image.jpg"
              value={formData.profile}
              onChange={(e) => setField("profile", e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-50"
              error={errors.profile}
            />
          </div>
        </div>
      </div>

      {/* Professional Details Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2 font-medium">Experience Level *</label>
            <Select
              accent="secondary"
              placeholder="Select experience level"
              options={experienceOptions}
              value={experienceOptions.find(
                (i) => i.value === formData.experience
              )}
              onChange={(value) => setField("experience", value.value)}
              className="w-full"
              error={errors.experience}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Work Preference</label>
            <Select
              accent="secondary"
              placeholder="Select preference"
              options={preferenceOptions}
              value={preferenceOptions.find(
                (i) => i.value === formData.preference
              )}
              onChange={(value) => setField("preference", value.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Personal Quote</label>
            <Input
              placeholder="E.g. I believe every home deserves to be a sanctuary."
              value={formData.quote}
              onChange={(e) => setField("quote", e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-50"
              error={errors.quote}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <Textarea
              placeholder="Brief description about the cleaner's background and experience..."
              value={formData.description}
              onChange={(e) => setField("description", e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-50"
              rows={3}
              error={errors.description}
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
            value={formData.address}
            onChange={(address) => setField("address", address)}
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
                formData.languages.includes(language.value)
                  ? "border-secondary-700/70 bg-secondary-50/30"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Checkbox
                id={`lang-${language.value}`}
                checked={formData.languages.includes(language.value)}
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
                      formData.specialitiesIds.includes(speciality.id)
                        ? "border-secondary-700/70 bg-secondary-50/30"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={`spec-${speciality.id}`}
                      checked={formData.specialitiesIds.includes(speciality.id)}
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
                  formData.serviceAreasIds.includes(area.id)
                    ? "border-secondary-700/70 bg-secondary-50/30"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Checkbox
                  id={`area-${area.id}`}
                  checked={formData.serviceAreasIds.includes(area.id)}
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
                      formData.qualificationsIds.includes(qualification.id)
                        ? "border-secondary-700/70 bg-secondary-50/30"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={`qual-${qualification.id}`}
                      checked={formData.qualificationsIds.includes(qualification.id)}
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
    </form>
  );
}
