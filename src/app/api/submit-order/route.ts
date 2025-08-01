import { NextResponse } from 'next/server';
import { OrderFormValues } from '@/app/booking/new/schema';
import Stripe from 'stripe';

// Initialize Stripe with your SECRET key.
// IMPORTANT: Keep your secret key in .env.local and never expose it to the frontend.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

// Extend the type to include the paymentMethodId we added
interface OrderRequest extends OrderFormValues {
  paymentMethodId: string;
}

export async function POST(request: Request) {
  try {
    const { paymentMethodId, ...orderData }: OrderRequest = await request.json();
    const totalAmount = 100/* Recalculate the total amount on the server for security */

    // 1. Process the payment with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true, // This attempts to charge the card immediately
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    });

    // If paymentIntent.status is not 'succeeded', the payment failed.
    // The `create` call will throw an error for card failures if `confirm: true` is set.

    // 2. If payment was successful, save the order to your database
    // (Your database logic would go here)
    // e.g., const savedOrder = await db.orders.create({ ...orderData, stripePaymentId: paymentIntent.id });
    const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // 3. Return a success response
    return NextResponse.json({
      success: true,
      orderId: newOrderId,
      message: 'Order submitted successfully',
    });

  } catch (error) {
    // Handle different types of errors
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Stripe.errors.StripeCardError) {
      // Card was declined
      errorMessage = error.message;
    } else if (error instanceof Error) {
      console.error('Error submitting order:', error);
      errorMessage = 'Order submission failed due to a server error.';
    }
    
    return NextResponse.json({
      error: { message: errorMessage }
    }, { status: 400 }); // Use 400 for client-side errors like card
  }
}