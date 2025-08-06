import { z } from "zod";

export const orderFormSchema = z.object({
  // Step 1
  serviceType: z.string().min(1, "Service type is required"),
  specificServiceType: z.string().min(1, "Specific cleaning type is required"),
  // Step 2
  serviceAddress: z.string().min(1, "Service address is required"),
  useSameForBilling: z.boolean().optional(),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
  // Step 3
  addOns: z.array(z.string()).optional(),
  otherService: z.string().optional(),
  // Step 4
  petType: z.string(),
  petInstructions: z.string().optional(),
  // Step 5
  accessMethod: z.string(),
  accessInstructions: z.string().optional(),
  // Step 6
  preferredDate: z.date(),
  timeWindow: z.string(),
  // Step 7
  tipAmount: z.number().min(0, "Tip amount cannot be negative").optional(),
  tipPercentage: z.number().min(0).optional(),
  // Step 8
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required")
  }),
  billingInfo: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip code is required")
  }),
  paymentMethodId: z.string().optional()
  // stripePaymentId: string
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
