"use client";
import CheckCircleBroken from "@/components/icons/CheckCircleBroken";
import { Button } from "@/components/ui/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepsViewer from "./StepsViewer";

// Step components
import ServiceTypeStep from "./steps/ServiceTypeStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormValues } from "../schema";
import { addOnOptions, specificTypes } from "../formData";
import PropertyDetailsStep from "./steps/PropertyDetailsStep";
import AddOnsStep from "./steps/AddOnsStep";
import PetInfoStep from "./steps/PetInfoStep";
import AccessStep from "./steps/AccessStep";
import ScheduleStep from "./steps/ScheduleStep";
import TipStep from "./steps/TipStep";
import PaymentStep from "./steps/PaymentStep";

export default function ClientForm() {
  const [currStep, setCurrStep] = useState(0);
  const [processing, setProcessing] = useState(false);

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
      petType: "no-pets",
      petInstructions: "",
      accessMethod: "home",
      accessInstructions: "",
      preferredDate: undefined,
      timeWindow: undefined,
      tipAmount: 0,
      tipPercentage: 0,
      paymentMethodId: ""
    }
  });

  const {
    watch,
    handleSubmit,
    trigger,
    formState: { errors }
  } = methods;
  const processPaymentRef = useRef(() => Promise.resolve(""));

  const initRender = useRef(true);

  // Watch form values for summary display
  const formValues = watch();

  // Check if current step has validation errors
  const currentStepHasErrors = () => {
    switch (currStep) {
      case 0:
        return !!errors.serviceType || !!errors.specificType;
      case 1:
        return (
          !!errors.serviceAddress ||
          !!errors.bedrooms ||
          !!errors.bathrooms ||
          !!errors.squareFootage
        );
      case 2:
        // Add-ons step has no required fields
        return false;
      case 3:
        // Pet info step has no required fields
        return false;
      case 4:
        // Access step has no required fields by default
        return false;
      case 5:
        return !!errors.preferredDate || !!errors.timeWindow;
      case 6:
        // Tip step - no required fields by default
        return false;
      case 7:
        return (
          !!errors.personalInfo?.fullName ||
          !!errors.personalInfo?.phoneNumber ||
          !!errors.personalInfo?.email ||
          !!errors.billingInfo?.country ||
          !!errors.billingInfo?.state ||
          !!errors.billingInfo?.city ||
          !!errors.billingInfo?.zipCode
        );
      default:
        return false;
    }
  };

  // Validate the current step and update stepValidation state
  const validateCurrentStep = useCallback(async () => {
    let isValid = false;

    switch (currStep) {
      case 0:
        isValid = await trigger(["serviceType", "specificType"]);
        break;
      case 1:
        isValid = await trigger([
          "serviceAddress",
          "bedrooms",
          "bathrooms",
          "squareFootage"
        ]);
        break;
      case 5:
        isValid = await trigger(["timeWindow", "preferredDate"]);
        break;
      case 7:
        isValid = await trigger([
          "personalInfo.fullName",
          "personalInfo.phoneNumber",
          "personalInfo.email",
          "billingInfo.country",
          "billingInfo.state",
          "billingInfo.city",
          "billingInfo.zipCode"
        ]);
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
  }, [
    formValues.serviceType,
    formValues.specificType,
    formValues.serviceAddress,
    formValues.bedrooms,
    formValues.bathrooms,
    formValues.squareFootage,
    validateCurrentStep
  ]);

  // Calculate price based on form values
  const calculatePrice = () => {
    let basePrice = 0;
    const specificType = formValues.specificType;

    // Set base price based on specific type
    basePrice +=
      specificTypes.find((s) => s.id === specificType)?.priceFrom || 0;

    // Add price adjustments based on property details
    if (formValues.bedrooms) {
      // Add $20 per bedroom after the first
      const bedroomCount =
        formValues.bedrooms === "4+" ? 4 : parseInt(formValues.bedrooms);
      if (bedroomCount > 1) {
        basePrice += (bedroomCount - 1) * 20;
      }
    }

    if (formValues.bathrooms) {
      // Add $25 per bathroom after the first
      const bathroomCount =
        formValues.bathrooms === "4+" ? 4 : parseInt(formValues.bathrooms);
      if (bathroomCount > 1) {
        basePrice += (bathroomCount - 1) * 25;
      }
    }

    // Add prices for selected add-ons
    if (formValues.addOns && formValues.addOns.length > 0) {
      formValues.addOns.forEach((addonId) => {
        const addon = addOnOptions.find((a) => a.id === addonId);
        if (addon) {
          basePrice += addon.price;
        }
      });
    }
    return basePrice;
  };

  // Calculate the total with tip included
  const calculateTotal = () => {
    const basePrice = calculatePrice();
    const tipAmount = formValues.tipAmount || 0;

    return basePrice + tipAmount;
  };

  const estimatedPrice = calculatePrice();
  const totalWithTip = calculateTotal();

  // Navigation functions
  const goToNextStep = async () => {
    const isValid = await validateCurrentStep();

    if (isValid && currStep < 7) {
      setCurrStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currStep > 0) {
      setCurrStep((prev) => prev - 1);
    }
  };

  // Form submission
  const onSubmit = async (data: OrderFormValues) => {
    setProcessing(true);

    // First validate all payment fields
    const isPaymentStepValid = await validateCurrentStep();

    if (!isPaymentStepValid) {
      setProcessing(false);
      return;
    }

    // For the payment step, we need to process the payment first
    let paymentMethodId = formValues.paymentMethodId || "";

    if (currStep === 7 && !paymentMethodId) {
      // Process the payment
      const result = await processPaymentRef.current();

      if (!result) {
        // Payment failed, don't proceed
        setProcessing(false);
        return;
      }

      paymentMethodId = result.toString();
    }

    // Process the final form submission
    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, paymentMethodId })
      });

      const result = await response.json();

      if (result.success) {
        // Handle successful submission
        // e.g., redirect to confirmation page
        window.location.href = `/booking/confirmation?orderId=${result.orderId}`;
      } else {
        // Handle error
        alert(result.error?.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }

    setProcessing(false);
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
      case 3:
        return <PetInfoStep />;
      case 4:
        return <AccessStep />;
      case 5:
        return <ScheduleStep />;
      case 6:
        return <TipStep totalPrice={estimatedPrice} />;
      case 7:
        return <PaymentStep processPaymentRef={processPaymentRef} />;
      default:
        return <ServiceTypeStep />;
    }
  };

  return (
    <div className="mt-8 space-y-8 w-full">
      <h1 className="text-heading-3 lg:text-heading-2.5 text-center lg:text-start">
        Book Your Cleaning Service
      </h1>

      <StepsViewer currStep={currStep} setCurrStep={setCurrStep} />

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-x-8 items-start w-full"
        >
          <div className="w-full max-w-full lg:col-span-2 lg:bg-white rounded-2xl lg:shadow-custom-light space-y-6 lg:px-8 py-8">
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

              {currStep !== 7 ? (
                <Button
                  type="button"
                  size="xs"
                  disabled={currStep >= 7}
                  onClick={goToNextStep}
                  className={`disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25 ${
                    currentStepHasErrors()
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={processing}
                  type="button" // Changed from "submit" to "button"
                  size="xs"
                  onClick={handleSubmit(onSubmit)} // Explicitly handle submission
                  className={`disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25 ${currentStepHasErrors() ? "bg-gray-300 cursor-not-allowed" : ""}`}
                >
                  Complete Booking
                </Button>
              )}
            </div>
          </div>

          <div className="lg:bg-white rounded-2xl lg:shadow-custom-light p-4 space-y-8">
            <h4 className="text-heading-5">Booking Summary</h4>

            <div className="space-y-4 text-caption">
              <p className="text-caption flex justify-between">
                Service Type:
                <span>
                  {(formValues.serviceType
                    ? formValues.serviceType[0].toUpperCase() +
                      formValues.serviceType.slice(1)
                    : null) || "Not selected"}
                </span>
              </p>
              {formValues.specificType && (
                <p className="text-caption flex justify-between">
                  Specific Type:
                  <span>
                    {(formValues.specificType
                      ? formValues.specificType[0].toUpperCase() +
                        formValues.specificType.slice(1)
                      : null) || "Not selected"}
                  </span>
                </p>
              )}
              {formValues.bedrooms && (
                <p className="text-caption flex justify-between">
                  Bedrooms:
                  <span>
                    {formValues.bedrooms === "4+"
                      ? "4+"
                      : `${formValues.bedrooms}`}
                  </span>
                </p>
              )}
              {formValues.bathrooms && (
                <p className="text-caption flex justify-between">
                  Bathrooms:
                  <span>
                    {formValues.bathrooms === "4+"
                      ? "4+"
                      : `${formValues.bathrooms}`}
                  </span>
                </p>
              )}
              {/* {formValues.squareFootage &&
                  <p className="text-caption flex justify-between">
                    Square Footage:
                    <span>{squareFootageOptions.find(opt => opt.value === formValues.squareFootage)?.label || formValues.squareFootage}</span>
                  </p>
                } */}
              {formValues.addOns && formValues.addOns.length > 0 && (
                <div className="text-caption space-y-2">
                  <p className="mb-2">Add-Ons:</p>
                  {formValues.addOns.map((addonId) => {
                    const addon = addOnOptions.find((a) => a.id === addonId);
                    return (
                      <p key={addonId} className="flex justify-between pl-4">
                        {addon?.name}
                        <span>${addon?.price}</span>
                      </p>
                    );
                  })}
                </div>
              )}
              {/* {formValues.tipAmount !== undefined && formValues.tipAmount > 0 && (
                  <p className="text-caption flex justify-between">
                    Tip:
                    <span>${formValues.tipAmount.toFixed(2)}</span>
                  </p>
                )} */}
            </div>

            <hr className="text-surface-500/10" />
            <p className="text-caption flex justify-between">
              Subtotal:{" "}
              <span>${estimatedPrice.toString().padStart(2, "0")}</span>
            </p>
            <hr className="text-surface-500/10" />
            <p className="text-caption font-medium flex justify-between">
              Total:{" "}
              <span className="text-primary-700">
                ${totalWithTip.toFixed(2)}
              </span>
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
              {currStep !== 7 ? (
                <Button
                  type="button"
                  size="xs"
                  disabled={currStep >= 7}
                  onClick={goToNextStep}
                  className={`disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25 ${
                    currentStepHasErrors()
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={processing}
                  type="button" // Changed from "submit" to "button"
                  size="xs"
                  onClick={handleSubmit(onSubmit)} // Explicitly handle submission
                  className={`disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25 ${currentStepHasErrors() ? "bg-gray-300 cursor-not-allowed" : ""}`}
                >
                  Complete Booking
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
