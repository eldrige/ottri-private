import { z } from "zod";

export const orderFormSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  specificType: z.string().min(1, "Specific cleaning type is required"),
  serviceAddress: z.string().min(1, "Service address is required"),
  useSameForBilling: z.boolean().optional(),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
  addOns: z.array(z.string()).optional(),
  otherService: z.string().optional(),
  petType: z.string(),
  petInstructions: z.string().optional(),
  accessMethod: z.string(),
  accessInstructions: z.string().optional(),
  preferredDate: z.date().optional(),
  timeWindow: z.string().optional(),
  tipAmount: z.number().min(0, "Tip amount cannot be negative").optional(),
  tipPercentage: z.number().min(0).optional(),

  // Add personal and billing info
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
  }).optional(),
  billingInfo: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  }).optional(),
  paymentMethodId: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;