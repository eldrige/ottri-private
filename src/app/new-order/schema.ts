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
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;