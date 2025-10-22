import { TimeSlotFormDataType } from "@/lib/types";

export const getSlotBody = (formData: Partial<TimeSlotFormDataType>) => ({
  startTime: Number(formData.startTime?.split(":")[0]) || undefined,
  endTime: Number(formData.startTime?.split(":")[0]) + 2 || undefined, // Assuming 2-hour slots
  instances: Number(formData.maxCapacity) || undefined,
  serviceIds: formData.serviceIds || undefined,
  weekDays: formData.daysOfWeek || undefined,
  isActive: formData.isActive || undefined
});
