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
// import { addOnOptions } from "../formData";
import PropertyDetailsStep from "./steps/PropertyDetailsStep";
import AddOnsStep from "./steps/AddOnsStep";
import PetInfoStep from "./steps/PetInfoStep";
import AccessStep from "./steps/AccessStep";
import ScheduleStep from "./steps/ScheduleStep";
import TipStep from "./steps/TipStep";
import PaymentStep from "./steps/PaymentStep";
import { calculateBasePrice } from "@/utils/priceCalculation";
import { PreflightType } from "../types";

export default function ClientForm({
  preflight
}: {
  preflight: PreflightType;
}) {
  const [currStep, setCurrStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  // Set up react-hook-form
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      serviceType: null,
      specificServiceType: null,
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
    // setValue,
    handleSubmit,
    trigger,
    formState: { errors },
    setError
  } = methods;
  const processPaymentRef = useRef(() => Promise.resolve(""));

  const initRender = useRef(true);

  // Watch form values for summary display
  const formValues = watch();

  console.log({ preflight, formValues });

  // Check if current step has validation errors
  const currentStepHasErrors = () => {
    switch (currStep) {
      case 0:
        return (
          !!errors.serviceType ||
          !!errors.specificServiceType ||
          !!errors.frequency
        );
      case 1:
        return (
          !!errors.serviceAddress ||
          !!errors.bedrooms ||
          !!errors.bathrooms ||
          !!errors.squareFootage
        );
      case 2:
        return !!errors.otherService;
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
          !!errors.fullName ||
          !!errors.phoneNumber ||
          !!errors.email ||
          !!errors.country ||
          !!errors.state ||
          !!errors.city ||
          !!errors.zipCode
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
        isValid = await trigger([
          "serviceType",
          "specificServiceType",
          "frequency"
        ]);
        break;
      case 1:
        isValid = await trigger([
          "serviceAddress",
          "bedrooms",
          "bathrooms",
          "squareFootage"
        ]);
        break;
      case 2:
        if (formValues.addOns.some((i) => i.name.toLowerCase() === "others")) {
          if (formValues.otherService) isValid = true;
          else
            setError("otherService", {
              message: "Please specify the other service needed"
            });
        } else isValid = true;
        break;
      case 5:
        isValid = await trigger(["timeWindow", "preferredDate"]);
        break;
      case 7:
        isValid = await trigger([
          "fullName",
          "phoneNumber",
          "email",
          "country",
          "state",
          "city",
          "zipCode"
        ]);
        break;
      // Add more cases for additional steps
      default:
        isValid = true;
    }

    return isValid;
  }, [trigger, setError, currStep, formValues.addOns, formValues.otherService]);

  // Run validation when form values change
  useEffect(() => {
    if (initRender) {
      initRender.current = false;
      return;
    }
    validateCurrentStep();
  }, [
    formValues.serviceType,
    formValues.specificServiceType,
    formValues.frequency,
    formValues.serviceAddress,
    formValues.bedrooms,
    formValues.bathrooms,
    formValues.squareFootage,
    formValues.otherService,
    formValues.petType,
    formValues.petInstructions,
    formValues.fullName,
    formValues.phoneNumber,
    formValues.email,
    formValues.country,
    formValues.state,
    formValues.city,
    formValues.zipCode,
    validateCurrentStep
  ]);

  // Calculate price based on form values
  const calculatePrice = () => {
    return calculateBasePrice(formValues);
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
    console.log(errors, formValues);
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
        return <ServiceTypeStep services={preflight.services} />;
      case 1:
        return <PropertyDetailsStep />;
      case 2:
        return (
          formValues.serviceType?.serviceAddOn && (
            <AddOnsStep serviceAddOns={formValues.serviceType.serviceAddOn} />
          )
        );
      case 3:
        return <PetInfoStep />;
      case 4:
        return <AccessStep />;
      case 5:
        return <ScheduleStep timeSlots={preflight.timeSlots} />;
      case 6:
        return <TipStep totalPrice={estimatedPrice} />;
      case 7:
        return <PaymentStep processPaymentRef={processPaymentRef} />;
      default:
        return <ServiceTypeStep services={preflight.services} />;
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
                <span className="capitalize">
                  {(formValues.serviceType
                    ? formValues.serviceType.name.split(" ")[0]
                    : null) || "Not selected"}
                </span>
              </p>
              {formValues.specificServiceType && (
                <p className="text-caption flex justify-between">
                  Specific Type:
                  <span className="capitalize">
                    {(formValues.specificServiceType
                      ? formValues.specificServiceType.name.split(" ")[0]
                      : null) || "Not selected"}
                  </span>
                </p>
              )}
              {formValues.frequency && (
                <p className="text-caption flex justify-between">
                  Frequency:
                  <span className="capitalize">{formValues.frequency}</span>
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
                  {formValues.addOns.map((addon) => {
                    // const addon = addOnOptions.find((a) => a.id === addonId);
                    return (
                      <p
                        key={addon.id}
                        className="flex justify-between pl-4 capitalize"
                      >
                        {addon.name}
                        <span>${addon.price}</span>
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
