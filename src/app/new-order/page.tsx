"use client";
import CheckCircleBroken from "@/components/icons/CheckCircleBroken";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepsViewer from "./_components/StepsViewer";

// Step components
import ServiceTypeStep from "./_components/steps/ServiceTypeStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormValues } from "./schema";
import { addOnOptions, specificTypes, squareFootageOptions } from "./formData";
import PropertyDetailsStep from "./_components/steps/PropertyDetailsStep";
import AddOnsStep from "./_components/steps/AddOnsStep";

export default function NewOrderPage() {
  const [currStep, setCurrStep] = useState(2);

  // Set up react-hook-form
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      serviceType: "",
      specificType: "",
      serviceAddress: "",
      useSameForBilling: false,
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      addOns: [],
      otherService: "",
    }
  });

  const { watch, handleSubmit, trigger, formState: { errors } } = methods;
  const initRender = useRef(true);

  // Watch form values for summary display
  const formValues = watch();

  // Check if current step has validation errors
  const currentStepHasErrors = () => {
    switch (currStep) {
      case 0:
        return !!errors.serviceType || !!errors.specificType;
      case 1:
        return !!errors.serviceAddress || !!errors.bedrooms || !!errors.bathrooms || !!errors.squareFootage;
      default:
        return false;
    }
  };

  // Validate the current step and update stepValidation state
  const validateCurrentStep = useCallback(async () => {
    let isValid = false;

    switch (currStep) {
      case 0:
        isValid = await trigger(['serviceType', 'specificType']);
        break;
      case 1:
        isValid = await trigger(['serviceAddress', 'bedrooms', 'bathrooms', 'squareFootage']);
        break;
      // Add more cases for additional steps
      default:
        isValid = true;
    }

    return isValid;
  }, [trigger, currStep]);

  // Run validation when form values change
  useEffect(() => {
    if (initRender) {
      initRender.current = false;
      return;
    }
    validateCurrentStep();
  }, [formValues.serviceType, formValues.specificType, formValues.serviceAddress, 
    formValues.bedrooms, formValues.bathrooms, formValues.squareFootage, 
    validateCurrentStep]);

  // Calculate price based on form values
  const calculatePrice = () => {
    let basePrice = 0;
    const specificType = formValues.specificType;

    // Set base price based on specific type
    basePrice += specificTypes.find(s => s.id === specificType)?.priceFrom || 0;

    // Add price adjustments based on property details
    if (formValues.bedrooms) {
      // Add $20 per bedroom after the first
      const bedroomCount = formValues.bedrooms === "4+" ? 4 : parseInt(formValues.bedrooms);
      if (bedroomCount > 1) {
        basePrice += (bedroomCount - 1) * 20;
      }
    }

    if (formValues.bathrooms) {
      // Add $25 per bathroom after the first
      const bathroomCount = formValues.bathrooms === "4+" ? 4 : parseInt(formValues.bathrooms);
      if (bathroomCount > 1) {
        basePrice += (bathroomCount - 1) * 25;
      }
    }

    // Add prices for selected add-ons
    if (formValues.addOns && formValues.addOns.length > 0) {
      formValues.addOns.forEach(addonId => {
        const addon = addOnOptions.find(a => a.id === addonId);
        if (addon) {
          basePrice += addon.price;
        }
      });
    }
    return basePrice;
  };

  const estimatedPrice = calculatePrice();

  // Navigation functions
  const goToNextStep = async () => {
    const isValid = await validateCurrentStep();

    if (isValid && currStep < 7) {
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
  };

  // Render the current step
  const renderCurrentStep = () => {
    switch (currStep) {
      case 0:
        return <ServiceTypeStep />;
      case 1:
        return <PropertyDetailsStep />;
      case 2:
        return <AddOnsStep />;
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
        <h1 className="text-heading-3 lg:text-heading-2.5 text-center lg:text-start">Book Your Cleaning Service</h1>

        <StepsViewer currStep={currStep} setCurrStep={setCurrStep} />

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
                  variant="default-outline"
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
                  className={`disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25 ${currentStepHasErrors() ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
                >
                  Next
                </Button>
              </div>
            </div>

            <div className='lg:bg-white rounded-2xl lg:shadow-custom-light p-4 space-y-8'>
              <h4 className="text-heading-5">Booking Summary</h4>

              <div className="space-y-4 text-caption">
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
                {formValues.bedrooms &&
                  <p className="text-caption flex justify-between">
                    Bedrooms:
                    <span>{formValues.bedrooms === "4+" ? "4+" : `${formValues.bedrooms}`}</span>
                  </p>
                }
                {formValues.bathrooms &&
                  <p className="text-caption flex justify-between">
                    Bathrooms:
                    <span>{formValues.bathrooms === "4+" ? "4+" : `${formValues.bathrooms}`}</span>
                  </p>
                }
                {formValues.squareFootage &&
                  <p className="text-caption flex justify-between">
                    Square Footage:
                    <span>{squareFootageOptions.find(opt => opt.value === formValues.squareFootage)?.label || formValues.squareFootage}</span>
                  </p>
                }
                {formValues.addOns && formValues.addOns.length > 0 && (
                  <div className="text-caption space-y-2">
                    <p className="mb-2">Add-Ons:</p>
                    {formValues.addOns.map((addonId) => {
                      const addon = addOnOptions.find(a => a.id === addonId);
                      return (
                        <p key={addonId} className="flex justify-between pl-4">
                          {addon?.name}
                          <span>${addon?.price}</span>
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

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
                  variant="default-outline"
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
                  className={`disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25 ${currentStepHasErrors() ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
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