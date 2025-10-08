import Select from "@/components/ui/Select";
// import { scheduleOptions } from "../../formData";
import { DateInput } from "@/components/ui/DateInput";
import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { useMemo } from "react";

interface DateTimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedDate: Date | null;
  selectedTimeWindow: string | null;
  handleSelectedDate: (date: Date | null) => void;
  handleSelectedTimeWindow: (date: string | null) => void;
  errorSelectedDate?: string;
  errorSelectedTimeWindow?: string;
}

export default function DateTimeSlotsFields({
  timeSlots,
  selectedDate,
  selectedTimeWindow,
  handleSelectedDate,
  handleSelectedTimeWindow,
  errorSelectedDate,
  errorSelectedTimeWindow
}: DateTimeSlotsProps) {
  const handleDateChange = (date: Date | undefined) => {
    // setValue("preferredDate", date || null, { shouldValidate: true });
    handleSelectedDate(date || null);

    // setValue("timeWindow", null);
    handleSelectedTimeWindow(null);
  };

  const handleTimeWindowChange = (option: { value: string; label: string }) => {
    // setValue("timeWindow", option.value, { shouldValidate: true });
    handleSelectedTimeWindow(option.value);
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

  const availableWindows = useMemo(() => {
    if (!selectedDate) return [];
    const timeWindows = timeSlots
      .filter((i) => {
        const dateDay = selectedDate.getDay();
        if (!i.weekDays.includes(dateDay)) return false;

        const slotCount = i.slots[selectedDate.toISOString().split("T")[0]];
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
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <DateInput
          unavailableDates={processedData.unavailableDates}
          availableWeekdays={processedData.availableWeekdays}
          label="Preferred Date"
          value={selectedDate}
          onChange={handleDateChange}
          error={errorSelectedDate}
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
              ? availableWindows.find((opt) => opt.value === selectedTimeWindow)
              : undefined
          }
          onChange={handleTimeWindowChange}
          disabled={!selectedDate}
          error={errorSelectedTimeWindow}
        />
      </div>
    </div>
  );
}
