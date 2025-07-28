"use client";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CardIcon from "@/components/icons/CardIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import PawPrintIcon from "@/components/icons/PawPrintIcon";
import RewardStars from "@/components/icons/RewardStars";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

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


export default function StepsViewer({currStep, setCurrStep}: {currStep: number, setCurrStep: Dispatch<SetStateAction<number>>}) {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const navStep = (stepNum: number) => {
    if (stepNum >= currStep) return

    setCurrStep(stepNum)
  }

  useEffect(() => {
    stepsRef.current[currStep]?.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth"
    });
  }, [currStep]);

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      <div className="min-w-max">
        <div className="flex justify-between gap-6">
          {
            STEPS.map((step, idx) => {
              const selected = currStep >= idx;
              return (
                <div key={idx} onClick={() => navStep(idx)} ref={el => { stepsRef.current[idx] = el; }} className="flex flex-col items-center">
                  <span className={cn("p-2 rounded-full border transition-colors duration-300", selected ? "bg-primary-700 border-bg-primary-700 text-white" : "text-black/25 border-black/25")}>
                    <step.Icon size={16} className="*:size-4" />
                  </span>
                  <p className={`mt-2 font-nunito-sans text-caption min-w-fit text-nowrap ${!selected ? "text-black/25" : ""}`}>{step.text}</p>
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
    </div>
  );
}
