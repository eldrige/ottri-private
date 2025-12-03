"use client";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { ApplyFormType } from "../types/ApplyFormType";

export default function ApplyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ApplyFormType>();

  const onSubmit = (data: ApplyFormType) => {
    console.log(data.resume[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-black/25 rounded p-9 flex flex-col items-start gap-6"
    >
      <h1 className="text-heading-3 font-bold">Apply For This Position</h1>

      <div className="w-full">
        <Input
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            }
          })}
          label="Full Name *"
          className="border border-black/10"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="w-full">
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          label="Email *"
          type="email"
          className="border border-black/10"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full">
        <Input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[\d\s\-\+\(\)]+$/,
              message: "Invalid phone number"
            },
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits"
            }
          })}
          label="Phone *"
          type="tel"
          className="border border-black/10"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="w-full">
        <Textarea
          {...register("coverLetter", {
            required: "Cover letter is required",
            minLength: {
              value: 50,
              message: "Cover letter must be at least 50 characters"
            }
          })}
          label="Cover Letter *"
          rows={6}
          className="border border-black/10"
        />
        {errors.coverLetter && (
          <p className="text-red-500 text-sm mt-1">
            {errors.coverLetter.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="resume" className="block text-sm mb-2">
          Resume/CV *
        </label>
        <input
          {...register("resume", {
            required: "Resume is required",
            validate: {
              fileSize: (files) => {
                if (!files || files.length === 0) return true;
                return (
                  files[0].size <= 5000000 || "File size must be less than 5MB"
                );
              },
              fileType: (files) => {
                if (!files || files.length === 0) return true;
                const allowedTypes = [
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ];
                return (
                  allowedTypes.includes(files[0].type) ||
                  "Only .pdf, .doc, and .docx files are allowed"
                );
              }
            }
          })}
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full border border-black/10 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary hover:file:bg-primary/90"
        />
        <p className="text-sm text-gray-500 mt-1">
          Allowed Type(s): .pdf, .doc, .docx
        </p>
        {errors.resume && (
          <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
        )}
      </div>

      <div className="w-full">
        <Checkbox
          {...register("dataConsent", {
            required: "You must agree to the terms"
          })}
          label="By using this form you agree with the storage and handling of your data by this website. *"
          className="border border-black/10"
        />
        {errors.dataConsent && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dataConsent.message}
          </p>
        )}
      </div>

      <Button size={"sm"} type="submit">
        SUBMIT
      </Button>
    </form>
  );
}
