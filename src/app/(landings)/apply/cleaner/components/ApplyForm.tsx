"use client";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { ApplyFormType } from "../types/ApplyFormType";
import { useSubmitApplication } from "../_hooks/useSubmitApplication";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { AxiosError } from "axios";

export default function ApplyForm() {
  const {
    mutateAsync: submitApplication,
    isPending,
    error
  } = useSubmitApplication();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ApplyFormType>();

  const onSubmit = async (data: ApplyFormType) => {
    try {
      await submitApplication(data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Failed to submit application:", error);
      // Error is already handled by react-query error state
    }
  };

  if (isSubmitted) {
    return (
      <div className="border border-green-200 bg-green-50 rounded p-9 flex flex-col items-center gap-6 text-center">
        <CheckCircle className="w-16 h-16 text-green-600" />
        <div>
          <h2 className="text-heading-3 font-bold text-green-800 mb-2">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600">
            Thank you for applying! We have received your application and will
            review it shortly. You should receive a confirmation email soon.
          </p>
        </div>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          size="sm"
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

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
          disabled={isPending}
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
          disabled={isPending}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full">
        <Input
          {...register("phoneNumber", {
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
          disabled={isPending}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
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
          disabled={isPending}
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
          className="w-full border border-black/10 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary hover:file:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
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
          disabled={isPending}
        />
        {errors.dataConsent && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dataConsent.message}
          </p>
        )}
      </div>

      {error && (
        <div className="w-full border border-red-200 bg-red-50 rounded p-4 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-800 mb-1">
              Submission Failed
            </h3>
            <p className="text-sm text-red-700">
              {error instanceof AxiosError
                ? error.response?.data.message
                : error instanceof Error
                  ? error.message
                  : "An error occurred while submitting your application. Please try again."}
            </p>
          </div>
        </div>
      )}

      <Button
        size={"sm"}
        type="submit"
        disabled={isPending}
        className="flex items-center"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "SUBMIT"
        )}
      </Button>

      {isPending && (
        <p className="text-sm text-gray-600">
          Please wait while we upload your resume and submit your application...
        </p>
      )}
    </form>
  );
}
