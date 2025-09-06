import Select from "@/components/ui/Select";
// import { scheduleOptions } from "../../formData";
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

  const handleDateChange = (date: Date | undefined) => {
    console.log({ date });
    setValue("preferredDate", date || null, { shouldValidate: true });

    setValue("timeWindow", null);
  };

  const handleTimeWindowChange = (option: { value: string; label: string }) => {
    setValue("timeWindow", option.value, { shouldValidate: true });
  };

  const processedData = useMemo(() => {
    const grouped: Record<string, number> = {};

    timeSlots.forEach((item) => {
      Object.entries(item.slots).forEach((entry) => {
        if (entry[1] > 0) return;
        if (grouped[entry[0]]) grouped[entry[0]] += 1;
        else grouped[entry[0]] = 1;
      });
    });

    const unavailableDates = new Set(
      Object.entries(grouped)
        .filter((i) => i[1] === timeSlots.length)
        .map((i) => i[0])
    );

    const availableWeekdays = new Set(timeSlots.flatMap((i) => i.weekDays));

    return { unavailableDates, availableWeekdays };
  }, [timeSlots]);
  console.log(processedData);

  const availableWindows = useMemo(() => {
    if (!selectedDate) return [];
    const timeWindows = timeSlots
      .filter((i) => {
        const dateDay = selectedDate.getDay();
        if (!i.weekDays.includes(dateDay)) return false;

        const slotCount = i.slots[selectedDate.toISOString().split("T")[0]];
        console.log({ slotCount, i });
        return typeof slotCount !== "number" || slotCount > 0;
      })
      .sort((a, b) => a.startTime - b.startTime)
      .map((i) => ({
        label: `${i.startTime % 12 || 12}:00 ${i.startTime < 12 ? "AM" : "PM"} - ${i.endTime % 12 || 12}:00 ${i.endTime < 12 ? "AM" : "PM"}`,
        value: i.id.toString()
      }));

    return timeWindows;
  }, [selectedDate, timeSlots]);

  return (
    <>
      <h3 className="text-heading-4">Choose Date And Time</h3>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <DateInput
            unavailableDates={processedData.unavailableDates}
            availableWeekdays={processedData.availableWeekdays}
            label="Preferred Date"
            value={selectedDate}
            onChange={handleDateChange}
            error={errors.preferredDate?.message as string}
          />
        </div>
        <div>
          <Select
            label="Time window"
            options={availableWindows}
            placeholder="Select a time"
            value={
              // selectedTimeWindow
              availableWindows
                ? availableWindows.find(
                    (opt) => opt.value === selectedTimeWindow
                  )
                : undefined
            }
            onChange={handleTimeWindowChange}
            error={errors.timeWindow?.message}
            disabled={!selectedDate}
          />
        </div>
      </div>
    </>
  );
}
