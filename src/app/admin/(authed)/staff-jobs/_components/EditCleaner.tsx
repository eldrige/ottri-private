/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";

// You'll need to create or modify these queries for your actual implementation
import { AddCleanerForm, Cleaner } from "@/app/admin/types";
import { useUpdateCleanerMutation } from "../../_services/mutations";
import CleanerForm from "./CleanerForm";
import { ImageListType } from "react-images-uploading";
import { uploadImage } from "@/app/_actions/uploadImage";

export default function EditCleaner({
  onClose,
  cleaner
}: {
  onClose: () => void;
  cleaner: Cleaner;
}) {
  const { mutateAsync } = useUpdateCleanerMutation();

  // Store initial cleaner data to compare against changes
  const initialCleanerData: AddCleanerForm = {
    // Personal Info
    fullName: cleaner.fullName,
    phoneNumber: cleaner.phoneNumber,
    email: cleaner.user.email,
    profile: cleaner.profile,

    // Professional Details
    description: cleaner.description,
    quote: cleaner.quote,
    experience: cleaner.experience,
    preference: cleaner.preference || "flexible",

    // Location
    address: cleaner.address,
    // Skills and Qualifications
    languages: cleaner.languages || ([] as string[]),
    specialitiesIds: cleaner.specialities.map((i) => i.id) || ([] as number[]),
    serviceAreasIds: cleaner.serviceAreas.map((i) => i.id) || ([] as number[]),
    qualificationsIds: [] as number[]
  };

  const [cleanerData, setCleanerData] = useState<AddCleanerForm>({
    ...initialCleanerData
  });

  const [image, setImage] = useState<ImageListType>([]);

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

  // Helper function to check if a field has been changed
  const isFieldChanged = (field: keyof typeof cleanerData): boolean => {
    if (field === "profile") {
      return image.length > 0;
    }

    // Handle array comparisons
    if (
      Array.isArray(cleanerData[field]) &&
      Array.isArray(initialCleanerData[field])
    ) {
      const currentArray = cleanerData[field] as any[];
      const initialArray = initialCleanerData[field] as any[];

      if (currentArray.length !== initialArray.length) return true;

      // For simple arrays (like languages)
      if (
        typeof currentArray[0] === "string" ||
        typeof currentArray[0] === "number"
      ) {
        return (
          currentArray.some((item) => !initialArray.includes(item)) ||
          initialArray.some((item) => !currentArray.includes(item))
        );
      }

      // For arrays of objects or complex types - would need specific implementation
      // This is a simple check that might need to be enhanced for complex objects
      return JSON.stringify(currentArray) !== JSON.stringify(initialArray);
    }

    // Default comparison for other fields
    return cleanerData[field] !== initialCleanerData[field];
  };

  // Function to check if any field has changed
  const hasChanges = (): boolean => {
    return (
      Object.keys(cleanerData).some((key) =>
        isFieldChanged(key as keyof typeof cleanerData)
      ) || image.length > 0
    );
  };

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

    // pfp validation
    if (!cleanerData.profile) {
      newErrors.profile = "Profile image is required";
    } else {
      try {
        new URL(cleanerData.profile);
      } catch {
        newErrors.profile = "Please enter a valid URL";
      }
    }

    // description
    if (!cleanerData.description)
      newErrors.description = "Description is required";

    // quote
    if (!cleanerData.quote) newErrors.quote = "Quote is required";

    // address
    if (!cleanerData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    setIsPending(true);

    try {
      // Handle image change
      let imageUrl = cleanerData.profile;
      if (image[0]?.file && imageUrl === cleaner.profile) {
        const imageData = await uploadImage(image[0].file);

        if (imageData?.error || !imageData?.data) throw imageData?.error;

        setField("profile", imageData.data.url);

        imageUrl = imageData.data.url;
      }

      // Initialize an empty object for formData
      const formData: Record<string, any> = {};

      // Only add fields that have changed to the formData object
      if (isFieldChanged("fullName")) formData.fullName = cleanerData.fullName;
      if (isFieldChanged("phoneNumber"))
        formData.phoneNumber = cleanerData.phoneNumber;
      if (isFieldChanged("email")) formData.email = cleanerData.email;
      if (isFieldChanged("profile")) formData.profile = imageUrl;
      if (isFieldChanged("description"))
        formData.description = cleanerData.description;
      if (isFieldChanged("quote")) formData.quote = cleanerData.quote;
      if (isFieldChanged("experience"))
        formData.experience = cleanerData.experience;
      if (isFieldChanged("preference"))
        formData.preference = cleanerData.preference;
      if (isFieldChanged("address")) formData.address = cleanerData.address;

      // Handle arrays separately
      if (isFieldChanged("languages"))
        formData.languages = cleanerData.languages;
      if (isFieldChanged("specialitiesIds"))
        formData.specialitiesIds = cleanerData.specialitiesIds;
      if (isFieldChanged("serviceAreasIds"))
        formData.serviceAreasIds = cleanerData.serviceAreasIds;
      if (isFieldChanged("qualificationsIds"))
        formData.qualificationsIds = cleanerData.qualificationsIds;

      // Only send request if there are changes
      if (Object.keys(formData).length > 0) {
        // Send data to the API
        await mutateAsync({ cleanerId: cleaner.id, ...formData });
        onClose();
      } else {
        // No changes to save, just close
        onClose();
      }
    } catch (error: any) {
      console.error("Failed to update cleaner:", error);

      setErrors((prev) => ({
        ...prev,
        form: JSON.stringify(error) || "Network error. Please try again."
      }));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-heading-5 font-bold text-3xl">Edit Cleaner</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        <CleanerForm
          formData={cleanerData}
          setField={setField}
          errors={errors}
          image={image}
          setImage={setImage}
        />
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
            onClick={handleSubmit}
            type="button"
            variant="secondary"
            className="w-full py-3 bg-[#2D3648] text-white rounded-lg"
            disabled={isPending || !hasChanges()}
          >
            {isPending
              ? "Saving..."
              : hasChanges()
                ? "Save Changes"
                : "No Changes"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
