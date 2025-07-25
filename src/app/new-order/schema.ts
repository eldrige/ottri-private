import { z } from "zod";

export const orderFormSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  specificType: z.string().min(1, "Specific cleaning type is required"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;