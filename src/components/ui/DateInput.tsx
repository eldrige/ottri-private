import React, { useState, forwardRef } from "react";
import { addMonths, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import CalendarIcon from "@/components/icons/CalendarIcon";
import "react-day-picker/dist/style.css";
// import { TimeSlot } from "@/app/booking/new/types";

interface DateInputProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  labelClassName?: string;
  containerClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  // timeSlots: Record<string, number>;
  timeSlots: string[];
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      value,
      onChange,
      labelClassName = "font-medium text-base text-secondary-700",
      containerClassName = "",
      placeholder = "mm/dd/yy",
      disabled = false,
      error,
      timeSlots,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(
      value
    );

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      if (onChange) {
        onChange(date);
      }
      setIsOpen(false);
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle manual input if needed
    // This is a simplified implementation
    // In a real component, you would validate and parse the input
    // };

    return (
      <div className={`${containerClassName}`}>
        {label && (
          <label className={`block mb-2 text-sm font-normal ${labelClassName}`}>
            {label}
          </label>
        )}
        <div className="relative">
          <div className="flex relative items-center">
            <input
              type="text"
              className={`w-full py-3 px-4 rounded-lg bg-gray-50 border ${
                error ? "border-error" : "border-gray-200"
              } text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-700/30`}
              placeholder={placeholder}
              disabled={disabled}
              value={selectedDate ? format(selectedDate, "MM/dd/yy") : ""}
              // onChange={handleInputChange}
              onClick={() => setIsOpen(true)}
              readOnly
              ref={ref}
              {...props}
            />
            <button
              type="button"
              className="absolute right-2 p-2 text-gray-500"
              onClick={() => setIsOpen(!isOpen)}
              tabIndex={-1}
            >
              <CalendarIcon className="size-5" />
            </button>
          </div>

          {isOpen && (
            <div className="absolute z-50 mt-1 bg-white shadow-lg rounded-lg border border-gray-200">
              <DayPicker
                timeZone="America/Kentucky/Louisville"
                disabled={(date) => {
                  if (date < new Date()) return true;

                  if (date > addMonths(new Date(), 3)) return true;

                  const dateKey = date.toISOString().split("T")[0];
                  return timeSlots.includes(dateKey);
                }}
                mode="single"
                selected={selectedDate || undefined}
                onSelect={handleDateSelect}
                autoFocus
                className="p-3"
                classNames={{
                  today: "text-secondary-700 font-bold",
                  selected: `bg-primary-700 text-white rounded-lg`,
                  chevron: "fill-primary-700"
                }}
              />
            </div>
          )}
        </div>
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

export { DateInput };
