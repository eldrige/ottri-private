import Select from "@/components/ui/Select";
import { scheduleOptions } from "../../formData";
import { DateInput } from "@/components/ui/DateInput";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";
import { TimeSlot } from "../../types";
import { useMemo } from "react";

export default function ScheduleStep({ timeSlots }: { timeSlots: TimeSlot[] }) {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<OrderFormValues>();

  const selectedDate = watch("preferredDate");
  const selectedTimeWindow = watch("timeWindow");

  const handleDateChange = (date: Date) => {
    setValue("preferredDate", date, { shouldValidate: true });
  };

  const handleTimeWindowChange = (option: { value: string; label: string }) => {
    setValue("timeWindow", option.value, { shouldValidate: true });
  };

  const processedData = useMemo(() => {
    const grouped: Record<string, number> = {};
    timeSlots.forEach((item) => {
      const date = new Date(item.date);
      const dateKey = date.toISOString().split("T")[0];
      if (grouped[dateKey]) {
        grouped[dateKey] += item.instances;
      } else {
        grouped[dateKey] = item.instances;
      }
    });

    return grouped;
  }, [timeSlots]);

  return (
    <>
      <h3 className="text-heading-4">Choose Date And Time</h3>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <DateInput
            timeSlots={processedData}
            label="Preferred Date"
            value={selectedDate}
            onChange={handleDateChange}
            error={errors.preferredDate?.message as string}
          />
        </div>
        <div>
          <Select
            label="Time window"
            options={scheduleOptions}
            placeholder="Select a time"
            value={
              selectedTimeWindow
                ? scheduleOptions.find(
                    (opt) => opt.value === selectedTimeWindow
                  )
                : undefined
            }
            onChange={handleTimeWindowChange}
            error={errors.timeWindow?.message}
          />
        </div>
      </div>
    </>
  );
}
