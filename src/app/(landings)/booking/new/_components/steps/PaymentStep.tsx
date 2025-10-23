"use client";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import paypalLogo from "@/assets/order-paypal-logo.png";
import googleLogo from "@/assets/order-google-logo.png";
import appleLogo from "@/assets/order-apple-logo.png";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "@/app/(landings)/booking/new/schema";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import AddressInput from "../AddressInput";
import PasswordStrengthChecker from "./PasswordStrengthChecker";

// Load Stripe outside of component to avoid recreating on re-renders
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface PaymentStepProps {
  processPaymentRef: React.MutableRefObject<() => Promise<boolean | string>>;
  isUser: boolean;
}

// This is the inner component that will be wrapped with Elements
function CheckoutForm({ processPaymentRef, isUser }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    formState: { errors },
    trigger,
    watch,
    setValue
  } = useFormContext<OrderFormValues>();
  const billingAddress = watch("billingAddress");
  const isAdmin = watch("isAdmin");
  const [createAccount, setCreateAccount] = useState(false);

  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false
  });

  // Update password criteria when password changes
  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  }, [password]);

  useEffect(() => {
    processPaymentRef.current = async () => {
      if (!stripe || !elements) {
        setPaymentError("Stripe has not initialized. Please try again.");
        return false;
      }

      // Validate personal and billing info first
      const isPersonalInfoValid = await trigger([
        "fullName",
        "phoneNumber",
        "email"
      ]);
      const isBillingInfoValid = await trigger([
        "country",
        "state",
        "city",
        "zipCode"
      ]);

      // Add validation for password fields if creating account
      let isPasswordValid = true;
      if (createAccount) {
        isPasswordValid = await trigger(["password", "confirmPassword"]);
      }

      if (
        !isPersonalInfoValid ||
        !isBillingInfoValid ||
        (createAccount && !isPasswordValid)
      ) {
        setPaymentError(
          "Please fill in all required fields and complete card information."
        );
        return false;
      }

      if (isAdmin) {
        return true;
      }

      if (!cardComplete) {
        setPaymentError("Please complete card information.");
        return false;
      }

      setProcessing(true);
      setPaymentError(null);

      try {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          setPaymentError("Card information not found.");
          setProcessing(false);
          return false;
        }

        // Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement
        });

        if (error) {
          setPaymentError(
            error.message || "An error occurred processing your card."
          );
          setProcessing(false);
          return false;
        }

        // Add the payment method ID to the form data
        // We're not calling the API here, just saving the ID for the parent component
        setProcessing(false);
        return paymentMethod.id;
      } catch (err) {
        console.error("Payment processing error:", err);
        setPaymentError("An unexpected error occurred. Please try again.");
        setProcessing(false);
        return false;
      }
    };
  }, [
    stripe,
    elements,
    processPaymentRef,
    trigger,
    cardComplete,
    createAccount,
    isAdmin
  ]);

  return (
    <>
      <h3 className="text-heading-4">Personal & Payment Information</h3>

      <div>
        <h4 className="text-subtitle font-medium text-primary-700">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Input
            label="Full Name"
            placeholder="Enter text..."
            {...register("fullName")}
            error={errors.fullName?.message}
            required
          />
          <Input
            label="Phone Number"
            placeholder="Enter text..."
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
            required
          />
          <Input
            label="Email Address"
            placeholder="Enter text..."
            {...register("email")}
            error={errors.email?.message}
            required
            disabled={isUser && !isAdmin}
            className="disabled:opacity-50"
          />
          <AddressInput
            label="Billing Address"
            value={billingAddress}
            onChange={(value) => {
              if (value)
                setValue("billingAddress", value, { shouldValidate: true });
              else setValue("billingAddress", "", { shouldValidate: true });
            }}
            placeholder="Start typing your address"
            error={errors.billingAddress?.message}
            required
          />
        </div>
      </div>

      <div>
        <h4 className="text-subtitle font-medium text-primary-700">
          Payment Information
        </h4>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {isAdmin ? (
            <p className="text-info text-center">Logged in as admin</p>
          ) : (
            <div className="rounded bg-white">
              <label className="block mb-3 text-sm">
                Card Details<span className="text-red-500">*</span>
              </label>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4"
                      },
                      padding: "16px"
                    },
                    invalid: {
                      color: "#9e2146"
                    }
                  }
                }}
                onChange={(e) => setCardComplete(e.complete)}
              />
              {!cardComplete && (
                <p className="text-xs text-red-500 mt-1">
                  Card information is required
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Country"
              placeholder="Enter here..."
              {...register("country")}
              error={errors.country?.message}
              required
            />
            <Input
              label="State"
              placeholder="Enter here..."
              {...register("state")}
              error={errors.state?.message}
              required
            />
            <Input
              label="City"
              placeholder="Enter here..."
              {...register("city")}
              error={errors.city?.message}
              required
            />
            <Input
              label="Billing Zip Code"
              placeholder="12345"
              {...register("zipCode")}
              error={errors.zipCode?.message}
              required
            />
          </div>
        </div>
      </div>

      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}

      {processing && (
        <div className="text-blue-500 mt-2">Processing payment...</div>
      )}

      <div className="flex items-center justify-center gap-8 h-7 *:h-full *:object-contain">
        <Image alt="PayPal Logo" src={paypalLogo} />
        <Image alt="Google Pay Logo" src={googleLogo} />
        <Image alt="Apple Pay Logo" src={appleLogo} />
      </div>

      {!isUser && (
        <label className="flex items-center gap-2">
          <input
            className="accent-primary-700 caret-primary-700 text-white size-4"
            type="checkbox"
            checked={createAccount}
            onChange={(e) => {
              setCreateAccount(e.target.checked);
              setValue("createAccount", e.target.checked);
            }}
          />
          Create account for easy booking next time
        </label>
      )}

      {createAccount && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: createAccount ? "Password is required" : false,
                onChange: (e) => {
                  setPassword(e.target.value);
                  trigger("confirmPassword");
                  trigger("password");
                }
              })}
              error={!!errors.password?.message}
              required={createAccount}
            />
            <PasswordStrengthChecker criteria={passwordCriteria} />
          </div>
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: createAccount ? "Please confirm your password" : false,
              validate: createAccount
                ? (value) =>
                    value === watch("password") || "Passwords do not match"
                : undefined,
              onChange: () => {
                trigger("password");
                trigger("confirmPassword");
              }
            })}
            error={errors.confirmPassword?.message}
            required={createAccount}
          />
        </div>
      )}
    </>
  );
}

// Wrapper component that provides Stripe Elements
export default function PaymentStep(props: PaymentStepProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
