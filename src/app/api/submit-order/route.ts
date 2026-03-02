/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { NextResponse } from "next/server";
import { OrderFormValues } from "@/app/(landings)/booking/new/schema";
import Stripe from "stripe";
import {
  calculateAddOnsPrice,
  calculateServicesPrice,
  calculateTax
} from "../../../utils/priceCalculation";
import { serverRequest } from "@/lib/serverRequest";
import { User } from "@/app/dashboard/_utils/types";
import { setAuthCookies } from "@/lib/auth";

// Extend the type to include the stripeConfirmationTokenId and admin booking flag
interface OrderRequest extends OrderFormValues {
  stripeConfirmationTokenId?: string;
  isAdminBooking?: boolean;
}

export async function POST(request: Request) {
  try {
    const {
      stripeConfirmationTokenId,
      isAdminBooking,
      ...orderData
    }: OrderRequest = await request.json();

    // Get user profile info
    const userRes = await serverRequest("auth/profile").catch(() => undefined);

    const user = userRes?.data as User | undefined;

    // Calculate the total amount using the same logic as the form
    const servicesPrice = calculateServicesPrice(orderData);
    const addOnsPrice = calculateAddOnsPrice(orderData);

    let customerId =
      user?.role === "USER"
        ? user.personalInformation?.stripeCustomerId
        : undefined;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: { message: "Server configuration error." } },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    // Create customer if user logging in
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: orderData.email,
        name: orderData.fullName
      });
      customerId = customer.id;
    }

    // if (!isAdminBooking) {
    //   // Process the payment with Stripe
    //   paymentIntent = await stripe.paymentIntents.create({
    //     amount: Math.round(totalAmount * 100), // Amount in cents
    //     currency: "usd",
    //     payment_method: stripeConfirmationTokenId,
    //     confirm: true, // This attempts to charge the card immediately
    //     automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    //     customer: customerId
    //   });

    //   console.log(paymentIntent);
    // }

    const bodyObj = {
      cleaningFrequency: orderData.frequency || null,
      servicesPrice: servicesPrice,
      addOnsPrice: addOnsPrice,
      tax: calculateTax(servicesPrice + addOnsPrice),
      timeSlotId: Number(orderData.timeWindow),
      addOnIds: orderData.addOns?.map((i) => i.id) || [],
      fullName: orderData.fullName,
      phoneNumber: orderData.phoneNumber,
      address: orderData.serviceAddress,
      tip: orderData.tipAmount || 0,
      otherAddOns: orderData.otherService || null,
      pets: orderData.petType || "no-pets",
      email: orderData.email,
      petsInstructions: orderData.petInstructions || "",
      date: orderData.preferredDate,
      serviceId: orderData.serviceType?.id,
      serviceTypeId: orderData.specificServiceType?.id,
      bedrooms: orderData.bedrooms,
      bathrooms: orderData.bathrooms,
      approximateSquareFootage: orderData.squareFootage,
      stripeConfirmationTokenId: stripeConfirmationTokenId || undefined,
      stripeCustomerId: customerId,
      entryMethod: orderData.accessMethod,
      entryInstructions: orderData.accessInstructions || "",
      country: orderData.country || "US", // Default values for admin bookings
      state: orderData.state || "",
      zipCode: orderData.zipCode || "12345",
      city: orderData.city || "",
      currency: "USD",
      createAccount: orderData.createAccount || false,
      password: orderData.password || null,
      lng: orderData.lng || null,
      lat: orderData.lat || null
    };
    console.log(bodyObj);

    console.time("time");
    const apiResponse = await serverRequest("bookings", "POST", bodyObj).catch(
      (i) => {
        console.log(i.response.data);
        throw i;
      }
    );
    console.timeEnd("time");
    console.log(apiResponse);

    const newOrderId =
      "ORD-" + apiResponse.data.displayId.slice(0, 9).toUpperCase();

    // 3. Return a success response
    const response = NextResponse.json({
      success: true,
      orderId: newOrderId,
      message: "Order submitted successfully"
    });

    console.log(apiResponse.data);

    if (orderData.createAccount && !isAdminBooking) {
      const data = apiResponse.data as {
        userSession: { accessToken: string; refreshToken: string };
      };
      setAuthCookies(response.cookies, data.userSession);
    }

    return response;
  } catch (error: any) {
    // Handle different types of errors
    let errorMessage = "An unknown error occurred.";
    let errorCode = 400;

    if (error instanceof Stripe.errors.StripeCardError) {
      // Card was declined
      errorMessage = error.message;
      errorCode = error.statusCode || 400;
    } else {
      console.error("Error submitting order:", error);

      errorMessage = error.response?.data?.message || "Error creating booking";
      errorCode = error.response?.data?.statusCode || 500;
    }

    return NextResponse.json(
      {
        message: errorMessage
      },
      { status: errorCode }
    );
  }
}
