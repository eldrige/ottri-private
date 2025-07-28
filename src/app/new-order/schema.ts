import { z } from "zod";

export const orderFormSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  specificType: z.string().min(1, "Specific cleaning type is required"),
  serviceAddress: z.string().min(1, "Service address is required"),
  useSameForBilling: z.boolean().optional(),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;