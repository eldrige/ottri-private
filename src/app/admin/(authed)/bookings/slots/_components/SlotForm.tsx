import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import { FormDataType } from "../types";
import { cn } from "@/lib/utils";
import { useServicesQuery } from "../../../_services/queries";

interface SlotFormProps {
  formData: FormDataType;
  setField: (field: keyof FormDataType, value: unknown) => void;
}

const daysOfWeekOptions = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 0 }
];

export default function SlotForm({ formData, setField }: SlotFormProps) {
  const { data: services } = useServicesQuery();
  const [checkAll, setCheckAll] = useState(false);

  if (!services) return null;

  const serviceTypesOptions = [
    // {label: "All Services", value: "all"},
    ...services.map((ser) => ({
      label: ser.name,
      value: ser.id
    }))
  ];

  const toggleCheckbox = (key: keyof FormDataType, value: number) => {
    if (key === "serviceIds" || key === "daysOfWeek") {
      const newArr = formData[key].includes(value)
        ? formData[key].filter((i) => i !== value)
        : [...formData[key], value];

      setField(key, newArr);
    }
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setCheckAll(false);
      setField("serviceIds", []);
    } else {
      setCheckAll(true);
      setField(
        "serviceIds",
        services.map((i) => i.id)
      );
    }
  };

  return (
    <div className="space-y-8 text-secondary-900">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Input
            label="Start Time*"
            type="time"
            placeholder="--/--"
            className="py-2.5 selection:text-secondary-700"
            value={formData.startTime || ""}
            onChange={(e) =>
              setField("startTime", e.target.value.replace(/\d+$/, "00"))
            }
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
          <span>
            <Checkbox
              onChange={handleCheckAll}
              checked={checkAll}
              label={"All Services"}
              accent="secondary"
            />
          </span>
          {serviceTypesOptions.map((op) => {
            return (
              <span
                key={op.value}
                className={`capitalize ${checkAll ? "opacity-50" : ""}`}
              >
                <Checkbox
                  onChange={() => toggleCheckbox("serviceIds", op.value)}
                  checked={formData.serviceIds.includes(Number(op.value))}
                  label={op.label}
                  accent="secondary"
                  disabled={checkAll}
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
              key={option.value}
              label={option.label}
              accent="secondary"
              onChange={() => toggleCheckbox("daysOfWeek", option.value)}
              checked={formData.daysOfWeek.includes(option.value)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => setField("isActive", !formData.isActive)}
        className="flex items-center gap-4"
      >
        <div
          className={cn(
            "w-8 h-4.5 p-0.5 rounded-full flex transition-all *:transition-all relative box-content",
            formData.isActive
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
