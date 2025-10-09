import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import React from "react";
import { FormDataType } from "../types";
import { cn } from "@/lib/utils";

interface SlotFormProps {
  formData: FormDataType;
  setField: (field: keyof FormDataType, value: unknown) => void;
}

const serviceTypesOptions = [
  "All Services",
  "Deep Clean",
  "Office Clean",
  "Regular Clean",
  "Move-in/Move-out Clean",
  "Post-construction Clean"
];

const daysOfWeekOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SlotForm({ formData, setField }: SlotFormProps) {
  const toggleCheckbox = (key: keyof FormDataType, value: string) => {
    if (key === "serviceTypes" || key === "daysOfWeek") {
      const newArr = formData[key].includes(value)
        ? formData[key].filter((i) => i !== value)
        : [...formData[key], value];

      setField(key, newArr);
    }
  };
  return (
    <div className="space-y-8 text-secondary-900">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Input
            label="Start Time*"
            type="number"
            placeholder="--/--"
            className="py-2.5"
            value={formData.startTime || ""}
            onChange={(e) => setField("startTime", e.target.value)}
          />
          <p className="mt-2 text-tiny text-secondary-700/70">
            Slot will be 9:00 AM - 11:00 AM
          </p>
        </div>
        <div>
          <Input
            label="Max Capacity"
            type="number"
            className="py-2.5"
            placeholder="0"
            value={formData.maxCapacity || ""}
            onChange={(e) => setField("maxCapacity", e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="text-caption">Service Type*</p>
        <div className="mt-3 flex items-start gap-4 flex-wrap flex-col md:flex-row">
          {serviceTypesOptions.map((op) => {
            const isDis =
              op !== "All Services" &&
              formData.serviceTypes.includes("All Services");
            return (
              <span key={op} className={isDis ? "opacity-50" : ""}>
                <Checkbox
                  onChange={() => toggleCheckbox("serviceTypes", op)}
                  checked={formData.serviceTypes.includes(op)}
                  label={op}
                  accent="secondary"
                  disabled={isDis}
                />
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-caption">Days of the week*</p>
        <div className="mt-3 flex items-start gap-4 flex-wrap">
          {daysOfWeekOptions.map((option) => (
            <Checkbox
              key={option}
              label={option}
              accent="secondary"
              onChange={() => toggleCheckbox("daysOfWeek", option)}
              checked={formData.daysOfWeek.includes(option)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => setField("activeSlot", !formData.activeSlot)}
        className="flex items-center gap-4"
      >
        <div
          className={cn(
            "w-8 h-4.5 p-0.5 rounded-full flex transition-all *:transition-all relative box-content",
            formData.activeSlot
              ? "bg-secondary-700 *:left-full *:-translate-x-full"
              : "bg-secondary-700/15 *:left-0 *:translate-x-0"
          )}
        >
          <div className="h-full aspect-square bg-white rounded-full relative" />
        </div>
        <p className="text-caption">Active slot</p>
      </button>
    </div>
  );
}
