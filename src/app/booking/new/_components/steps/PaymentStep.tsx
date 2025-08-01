"use client";
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import paypalLogo from "@/assets/order-paypal-logo.png";
import googleLogo from "@/assets/order-google-logo.png";
import appleLogo from "@/assets/order-apple-logo.png";
import { useFormContext } from 'react-hook-form';
import { OrderFormValues } from '@/app/booking/new/schema';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

// Load Stripe outside of component to avoid recreating on re-renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentStepProps {
  processPaymentRef: React.MutableRefObject<() => Promise<boolean | string>>;
}

// This is the inner component that will be wrapped with Elements
function CheckoutForm({ processPaymentRef }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { register } = useFormContext<OrderFormValues>();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);


  useEffect(() => {
    processPaymentRef.current = async () => {
      if (!stripe || !elements) {
        setPaymentError('Stripe has not initialized. Please try again.');
        return false;
      }

      setProcessing(true);
      setPaymentError(null);

      try {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          setPaymentError('Card information not found.');
          setProcessing(false);
          return false;
        }

        // Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          setPaymentError(error.message || 'An error occurred processing your card.');
          setProcessing(false);
          return false;
        }

        // Add the payment method ID to the form data
        // We're not calling the API here, just saving the ID for the parent component
        setProcessing(false);
        return paymentMethod.id
      } catch (err) {
        console.error('Payment processing error:', err);
        setPaymentError('An unexpected error occurred. Please try again.');
        setProcessing(false);
        return false;
      }
    };
  }, [stripe, elements, processPaymentRef]);


  return (
    <>
      <h3 className="text-heading-4">Personal & Payment Information</h3>

      <div>
        <h4 className='text-subtitle font-medium text-primary-700'>Personal Information</h4>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
          <Input
            label='Full Name'
            placeholder='Enter text...'
            {...register('personalInfo.fullName')}
          />
          <Input
            label='Phone Number'
            placeholder='Enter text...'
            {...register('personalInfo.phoneNumber')}
          />
          <Input
            label='Email Address'
            placeholder='Enter text...'
            {...register('personalInfo.email')}
          />
          <Input
            label='Service Address'
            placeholder='Enter text...'
            {...register('serviceAddress')}
          />
        </div>
      </div>

      <div>
        <h4 className='text-subtitle font-medium text-primary-700'>Payment Information</h4>
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {/* Replace credit card fields with Stripe Card Element */}
          <div className="rounded bg-white">
            <label className="block mb-3 text-sm">Card Details</label>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                    padding: "16px"
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <Input
              label='Country'
              placeholder='Enter here...'
              {...register('billingInfo.country')}
            />
            <Input
              label='State'
              placeholder='Enter here...'
              {...register('billingInfo.state')}
            />
            <Input
              label='City'
              placeholder='Enter here...'
              {...register('billingInfo.city')}
            />
            <Input
              label='Billing Zip Code'
              placeholder='12345'
              {...register('billingInfo.zipCode')}
            />
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="text-red-500 mt-2">{paymentError}</div>
      )}

      {processing && (
        <div className="text-blue-500 mt-2">Processing payment...</div>
      )}

      <div className='flex items-center justify-center gap-8 h-7 *:h-full *:object-contain'>
        <Image alt='PayPal Logo' src={paypalLogo} />
        <Image alt='Google Pay Logo' src={googleLogo} />
        <Image alt='Apple Pay Logo' src={appleLogo} />
      </div>

      <label className='flex items-center gap-2'>
        <input className='accent-primary-700 caret-primary-700 text-white size-4' type='checkbox' />
        Create account for easy booking next time
      </label>
    </>
  );
}

// Wrapper component that provides Stripe Elements
export default function PaymentStep(props: PaymentStepProps) {
  // const { watch } = useFormContext<OrderFormValues>();
  // const totalAmount = watch('totalAmount') || 0;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
