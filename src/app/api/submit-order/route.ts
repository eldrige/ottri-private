import { NextResponse } from "next/server";
import { OrderFormValues } from "@/app/booking/new/schema";
import Stripe from "stripe";
import {
  calculateAddOnsPrice,
  calculateServicesPrice,
  calculateTotal
} from "../../../utils/priceCalculation";
import axios from "axios";

// Initialize Stripe with your SECRET key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil"
});

// Extend the type to include the paymentMethodId we added
interface OrderRequest extends OrderFormValues {
  paymentMethodId: string;
}

export async function POST(request: Request) {
  try {
    const { paymentMethodId, ...orderData }: OrderRequest =
      await request.json();

    // Calculate the total amount using the same logic as the form
    const totalAmount = calculateTotal(orderData);

    // 1. Process the payment with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true, // This attempts to charge the card immediately
      automatic_payment_methods: { enabled: true, allow_redirects: "never" }
      // customer: ""
    });

    const servicesPrice = calculateServicesPrice(orderData);
    const addOnsPrice = calculateAddOnsPrice(orderData);

    const bodyObj = {
      servicesPrice: servicesPrice,
      addOnsPrice: addOnsPrice,
      tax: (servicesPrice + addOnsPrice) * 0.08,
      timeSlotId: 9,
      addOnIds: [],
      createAccount: false,
      fullName: orderData.fullName,
      phoneNumber: orderData.phoneNumber,
      address: orderData.serviceAddress,
      tip: orderData.tipAmount,
      otherAddOns: orderData.otherService,
      pets: orderData.petType,
      email: orderData.email,
      petsInstructions: orderData.petInstructions,
      // date: orderData.preferredDate,
      // timeSlot: orderData.timeWindow,
      serviceId: 1,
      serviceTypeId: 2,
      bedrooms: orderData.bedrooms,
      bathrooms: orderData.bathrooms,
      approximateSquareFootage: +orderData.squareFootage,
      stripePaymentIntentId: paymentIntent.id,
      stripeCustomerId: null,
      entryInstructions: orderData.accessInstructions,
      password: null,
      country: orderData.country,
      state: orderData.state,
      zipCode: orderData.zipCode,
      city: orderData.city,
      currency: "USD"
    };
    console.log(bodyObj);

    const response = await axios
      .post("http://172.30.19.171:3000/api/v1/bookings", bodyObj)
      .catch((i) => {
        console.log(i.response);
        throw i;
      });
    console.log(response);

    const newOrderId =
      "ORD-" + response.data.displayId.slice(0, 9).toUpperCase();

    // 3. Return a success response
    return NextResponse.json({
      success: true,
      orderId: newOrderId,
      message: "Order submitted successfully"
    });
  } catch (error) {
    // Handle different types of errors
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Stripe.errors.StripeCardError) {
      // Card was declined
      errorMessage = error.message;
    } else if (error instanceof Error) {
      console.error("Error submitting order:", error);
      errorMessage = "Order submission failed due to a server error.";
    }

    return NextResponse.json(
      {
        error: { message: errorMessage }
      },
      { status: 400 }
    ); // Use 400 for client-side errors like card
  }
}
