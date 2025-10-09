"use client";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SlotForm from "../_components/SlotForm";
import { FormDataType } from "../types";

export default function NewSlotPage() {
  const [formData, setFormData] = useState<FormDataType>(() => ({
    startTime: null,
    maxCapacity: null,
    services: [],
    daysOfWeek: [],
    isActive: false
  }));

  const setField = (field: keyof FormDataType, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6">
      <div className="hidden lg:flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Bookings</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-6">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-6 lg:gap-8">
          <Link
            href={"/admin/bookings/manage"}
            className="flex items-center gap-2 font-medium text-sm"
          >
            <ArrowLeftIcon className="text-secondary-700 size-5" />
            Back to booking
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6 w-full">
        <h4 className="text-heading-5">New Slot</h4>
        <SlotForm formData={formData} setField={setField} />
        <div className="flex gap-8 *:flex-1 mt-auto">
          <Button variant={"secondary"} size={"xs"}>
            Create Slot
          </Button>
        </div>
      </div>
    </main>
  );
}
