import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const { paymentMethodId, amount } = await request.json();

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount, // amount in cents
      currency: 'usd',
      confirmation_method: 'manual',
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      // Payment was successful
      return NextResponse.json({ success: true });
    } else if (paymentIntent.status === 'requires_action') {
      // 3D Secure authentication required
      return NextResponse.json({ 
        requires_action: true, 
        payment_intent_client_secret: paymentIntent.client_secret 
      });
    } else {
      // Payment failed
      return NextResponse.json({ 
        error: { message: 'Payment failed' } 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ 
      error: { message: 'Payment processing error' } 
    }, { status: 500 });
  }
}