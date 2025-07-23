"use client";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CardIcon from "@/components/icons/CardIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import PawPrintIcon from "@/components/icons/PawPrintIcon";
import RewardStars from "@/components/icons/RewardStars";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowLeft, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const STEPS = [
  { text: "Service Type", Icon: RewardStars },
  { text: "Property Details", Icon: HomeIcon },
  { text: "Add-Ons", Icon: DollarIcon },
  { text: "Pet Info", Icon: PawPrintIcon },
  { text: "Access", Icon: LocationIcon },
  { text: "Schedule", Icon: CalendarIcon },
  { text: "Tip", Icon: MoneyIcon },
  { text: "Payment", Icon: CardIcon },
];

export default function NewOrderPage() {
  const [currStep, setCurrStep] = useState(0);
  return (
    <main className="container mx-auto px-6 mt-2.5 py-8 text-secondary-700 ">
      <Link className="text-primary-700 text-subtitle flex gap-4" href="/services">
        <ArrowLeft />
        Back to all services
      </Link>

      <div className="mt-8 space-y-8">
        <h1 className="text-heading-2.5">Book Your Cleaning Service</h1>

        <div>
          <div className="flex justify-between">
            {
              STEPS.map((step, idx) => {
                const selected = currStep >= idx;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <span className={cn("p-2 rounded-full border", selected ? "bg-primary-700 border-bg-primary-700 text-white" : "text-black/25 border-black/25")}>
                      <step.Icon size={16} className="*:size-4" />
                    </span>
                    <p className={`mt-2 font-nunito-sans text-caption ${!selected ? "text-black/25" : ""}`}>{step.text}</p>
                  </div>
                );
              })
            }
          </div>
          <div className="w-full mt-2 rounded-full overflow-hidden">
            <div className="bg-secondary-700 h-2.5 transition-[width] duration-300"
              style={{ width: `${((currStep + 1) / 8) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <Button disabled={currStep <= 0} onClick={() => setCurrStep(prev => prev - 1)}>Previous</Button>
          <Button disabled={currStep >= 7 } onClick={() => setCurrStep(prev => prev + 1)}>Next</Button>
        </div>
      </div>
    </main>
  );
}
