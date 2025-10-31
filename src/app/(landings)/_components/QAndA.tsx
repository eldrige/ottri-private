"use client";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition
} from "@headlessui/react";

export default function QAndA({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={cn(
            "flex flex-col p-3 rounded-lg max-w-3xl mx-auto border transition duration-200 border-surface-500/10",
            !open
              ? "bg-white text-secondary-700"
              : "bg-secondary-700 text-white"
          )}
        >
          <DisclosureButton className="flex justify-between items-start w-full text-left focus:outline-none">
            <p className="font-medium">{question}</p>
            <div
              className={`cursor-pointer ${open ? "text-white" : "text-surface-500"}`}
            >
              {open ? <Minus size={24} /> : <Plus size={24} />}
            </div>
          </DisclosureButton>

          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DisclosurePanel className="pt-4">
              <p className="max-w-xl text-caption tracking-wider">{answer}</p>
            </DisclosurePanel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}
