import { z } from "zod";

// Reusable schemas for nested types
export const specificTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  currency: z.string(),
  serviceId: z.number()
});

export const serviceAddOnSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  type: z.string(),
  serviceId: z.number()
});

export const serviceTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  popular: z.boolean(),
  serviceTypes: z.array(specificTypeSchema),
  serviceAddOn: z.array(serviceAddOnSchema)
});

export const orderFormSchema = z.object({
  // Step 1
  serviceType: serviceTypeSchema.nullable().refine((data) => !!data, {
    message: "Service type is required"
  }),
  specificServiceType: specificTypeSchema.nullable().refine((data) => !!data, {
    message: "Specific cleaning type is required"
  }),
  frequency: z.string().min(1, "Frequency is required"),
  // Step 2
  serviceAddress: z.string().min(1, "Service address is required"),
  useSameForBilling: z.boolean().optional(),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
  // Step 3
  // addOns: z.array(z.string()),
  addOns: z.array(serviceAddOnSchema),
  otherService: z.string().optional(),
  // Step 4
  petType: z.string(),
  petInstructions: z.string().optional(),
  // Step 5
  accessMethod: z.string(),
  accessInstructions: z.string().optional(),
  // Step 6
  preferredDate: z
    .date()
    .nullable()
    .refine((data) => !!data, { message: "Preferred date is required" }),
  timeWindow: z
    .string()
    .nullable()
    .refine((data) => !!data, { message: "Time window is required" }),
  // Step 7
  tipAmount: z.number().min(0, "Tip amount cannot be negative").optional(),
  tipPercentage: z.number().min(0).optional(),
  // Step 8
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  billingAddress: z.string().min(1, "Billing address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  paymentMethodId: z.string().optional()
  // stripePaymentId: string
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
export type SpecificTypeSchema = z.infer<typeof specificTypeSchema>;
export type ServiceAddOnSchema = z.infer<typeof serviceAddOnSchema>;
export type ServiceTypeSchema = z.infer<typeof serviceTypeSchema>;
