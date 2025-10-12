/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";

// You'll need to create or modify these queries for your actual implementation
import { AddCleanerForm } from "@/app/admin/types";
import { useAddCleanerMutation } from "../../_services/mutations";
import CleanerForm from "./CleanerForm";
import { ImageListType } from "react-images-uploading";
import { uploadImage } from "@/app/_actions/uploadImage";

export default function AddCleaner({ onClose }: { onClose: () => void }) {
  const { mutateAsync } = useAddCleanerMutation();

  const [cleanerData, setCleanerData] = useState<AddCleanerForm>({
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
    // Skills and Qualifications
    languages: [] as string[],
    specialitiesIds: [] as number[],
    serviceAreasIds: [] as number[],
    qualificationsIds: [] as number[]
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

  const handleSetImage = (image: ImageListType) => {
    setImage(image);
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated["profile"];
      return updated;
    });
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
    if (image.length === 0) {
      newErrors.profile = "Profile image is required";
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
      // Upload image
      let imageUrl = cleanerData.profile;
      if (image[0].file && !imageUrl) {
        const imageData = await uploadImage(image[0].file);

        if (imageData?.error || !imageData?.data) throw imageData?.error;

        setField("profile", imageData.data.url);

        imageUrl = imageData.data.url;
      }

      // Format the data according to the expected API structure
      const formData = {
        ...cleanerData,
        profile: imageUrl
      };

      // Send data to the API
      await mutateAsync(formData);
      onClose();
    } catch (error: any) {
      console.error("Failed to add cleaner:", error);

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
          <p className="text-heading-5 font-bold text-3xl">Add Cleaner</p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        <CleanerForm
          formData={cleanerData}
          setField={setField}
          errors={errors}
          image={image}
          setImage={handleSetImage}
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
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Cleaner"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
