"use client";
import CheckCircleBroken from "@/components/icons/CheckCircleBroken";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepsViewer from "./_components/StepsViewer";

// Step components
import ServiceTypeStep from "./_components/steps/ServiceTypeStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormValues } from "./schema";
import { specificTypes } from "./formData";

export default function NewOrderPage() {
  const [currStep, setCurrStep] = useState(0);

  // Set up react-hook-form
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      serviceType: "",
      specificType: "",
    }
  });

  const { watch, handleSubmit } = methods;

  // Watch form values for summary display
  const formValues = watch();

  // Calculate price based on form values
  const calculatePrice = () => {
    let basePrice = 0;
    const specificType = formValues.specificType;

    // Set base price based on specific type
    basePrice += specificTypes.find(s => s.id === specificType)?.priceFrom || 0;

    // You can add additional logic based on service type or other factors

    return basePrice;
  };

  const estimatedPrice = calculatePrice();

  // Navigation functions
  const goToNextStep = () => {
    if (currStep < 7) {
      setCurrStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currStep > 0) {
      setCurrStep(prev => prev - 1);
    }
  };

  // Form submission
  const onSubmit = (data: OrderFormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission, e.g. API call
  };

  // Render the current step
  const renderCurrentStep = () => {
    switch (currStep) {
      case 0:
        return <ServiceTypeStep />;
      // Add cases for other steps
      default:
        return <ServiceTypeStep />;
    }
  };

  return (
    <main className="container max-w-5xl mx-auto px-6 mt-2.5 py-8 text-secondary-700">
      <Link className="text-primary-700 text-subtitle flex gap-4" href="/services">
        <ArrowLeft />
        Back to all services
      </Link>

      <div className="mt-8 space-y-8">
        <h1 className="text-heading-2.5">Book Your Cleaning Service</h1>

        <StepsViewer currStep={currStep} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid lg:grid-cols-3 gap-x-8 items-start">
            <div className="lg:col-span-2 lg:bg-white rounded-2xl lg:shadow-custom-light space-y-6 lg:px-8 py-8">
              {/* Current step content */}
              {renderCurrentStep()}

              <hr className="text-surface-500/10" />

              {/* Desktop step buttons */}
              <div className="hidden lg:flex justify-between lg:col-span-2">
                <Button
                  type="button"
                  size="xs"
                  disabled={currStep <= 0}
                  onClick={goToPreviousStep}
                  className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="xs"
                  disabled={currStep >= 7}
                  onClick={goToNextStep}
                  className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
                >
                  Next
                </Button>
              </div>
            </div>

            <div className='lg:bg-white rounded-2xl lg:shadow-custom-light p-4 space-y-8'>
              <h4 className="text-heading-5">Booking Summary</h4>
              <p className="text-caption flex justify-between">
                Service Type:
                <span>{(formValues.serviceType ? formValues.serviceType[0].toUpperCase() + formValues.serviceType.slice(1) : null) || "Not selected"}</span>
              </p>
              {formValues.specificType &&
                <p className="text-caption flex justify-between">
                  Specific Type:
                  <span>{(formValues.specificType ? formValues.specificType[0].toUpperCase() + formValues.specificType.slice(1) : null) || "Not selected"}</span>
                </p>
              }
              <hr className="text-surface-500/10" />
              <p className="text-caption flex justify-between">
                Subtotal: <span>${estimatedPrice.toString().padStart(2, "0")}</span>
              </p>
              <hr className="text-surface-500/10" />
              <p className="text-caption font-medium flex justify-between">
                Total: <span className="text-primary-700">${estimatedPrice.toString().padStart(2, "0")}</span>
              </p>

              <ul className="p-4 space-y-3">
                <li className="flex gap-2 text-label font-normal items-center text-surface-500">
                  <CheckCircleBroken className="text-primary-700" />
                  Satisfaction Guaranteed
                </li>
                <li className="flex gap-2 text-label font-normal items-center text-surface-500">
                  <CheckCircleBroken className="text-primary-700" />
                  Insured and bonded cleaners
                </li>
                <li className="flex gap-2 text-label font-normal items-center text-surface-500">
                  <CheckCircleBroken className="text-primary-700" />
                  All supplies included
                </li>
              </ul>

              {/* Mobile step buttons */}
              <div className="flex lg:hidden justify-between">
                <Button
                  type="button"
                  size="xs"
                  disabled={currStep <= 0}
                  onClick={goToPreviousStep}
                  className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="xs"
                  disabled={currStep >= 7}
                  onClick={goToNextStep}
                  className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}