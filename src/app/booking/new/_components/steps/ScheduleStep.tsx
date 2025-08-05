import Select from "@/components/ui/Select";
import { scheduleOptions } from "../../formData";
import { DateInput } from "@/components/ui/DateInput";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";

export default function ScheduleStep() {
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
  console.log(!!selectedTimeWindow);
  return (
    <>
      <h3 className="text-heading-4">Choose Date And Time</h3>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <DateInput
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
