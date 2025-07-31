"use client";

import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import React, { useState } from 'react';
import paypalLogo from "@/assets/order-paypal-logo.png";
import googleLogo from "@/assets/order-google-logo.png";
import appleLogo from "@/assets/order-apple-logo.png";
import { useFormContext } from 'react-hook-form';
import { OrderFormValues } from '@/app/new-order/schema';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

// Load Stripe outside of component to avoid recreating on re-renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// This is the inner component that will be wrapped with Elements
function CheckoutForm({ totalAmount }: { totalAmount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, formState: { errors } } = useFormContext<OrderFormValues>();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaymentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setProcessing(true);
    
    try {
      // Create a payment method using the card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;
      
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      
      if (error) {
        setPaymentError(error.message || 'An error occurred with your payment');
        setProcessing(false);
        return;
      }
      
      // Send payment method ID to your server
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Math.round(totalAmount * 100), // Convert to cents for Stripe
        }),
      });
      
      const paymentResult = await response.json();
      
      if (paymentResult.error) {
        setPaymentError(paymentResult.error.message);
      } else {
        setPaymentError(null);
        setSucceeded(true);
        // Continue with form submission or show confirmation
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setPaymentError('An unexpected error occurred');
    }
    
    setProcessing(false);
  };

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

      {succeeded && (
        <div className="text-green-500 mt-2">Payment successful!</div>
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
export default function PaymentStep() {
  const { watch } = useFormContext<OrderFormValues>();
  const totalAmount = watch('totalAmount') || 0;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
}
