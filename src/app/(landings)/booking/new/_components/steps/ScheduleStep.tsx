// import { scheduleOptions } from "../../formData";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";
import { TimeSlot } from "../../types";
import DateTimeSlotsFields from "@/components/common/DateTimeSlotsFIelds";

export default function ScheduleStep({ timeSlots }: { timeSlots: TimeSlot[] }) {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<OrderFormValues>();

  const selectedDate = watch("preferredDate");
  const selectedTimeWindow = watch("timeWindow");

  const handleSelectedDate = (date: Date | null) => {
    setValue("preferredDate", date, { shouldValidate: true });

    setValue("timeWindow", null);
  };

  const handleSelectedTimeWindow = (value: string | null) => {
    setValue("timeWindow", value, { shouldValidate: true });
  };

  return (
    <>
      <h3 className="text-heading-4">Choose Date And Time</h3>

      <DateTimeSlotsFields
        selectedDate={selectedDate}
        selectedTimeWindow={selectedTimeWindow}
        handleSelectedDate={handleSelectedDate}
        handleSelectedTimeWindow={handleSelectedTimeWindow}
        timeSlots={timeSlots}
        errorSelectedDate={errors.preferredDate?.message}
        errorSelectedTimeWindow={errors.timeWindow?.message}
      />
    </>
  );
}
