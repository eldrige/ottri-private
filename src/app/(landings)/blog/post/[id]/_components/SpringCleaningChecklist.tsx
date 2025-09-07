import { ShieldCheckIcon } from "lucide-react";
import React from "react";

export default function SpringCleaningChecklist() {
  const springCleaningChecklist = [
    "Remove cobwebs from corners and ceiling fans",
    "Clean windows inside and out",
    "Organize closets and storage areas",
    "Wash or replace air filters",
    "Dust all surfaces from top to bottom",
    "Vacuum and mop all floors",
    "Deep clean appliances inside and out",
    "Declutter and donate unused items"
  ];
  return (
    <div className="bg-surface-100/15 flex flex-col gap-6 rounded-lg p-8">
      <div className="flex gap-2 items-center text-primary-700">
        <ShieldCheckIcon className="size-8" />
        <h3 className="text-2xl text-secondary-700 font-medium font-poppins">
          Spring Cleaning Checklist
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4">
          {springCleaningChecklist.slice(0, 4).map((elem, idx) => (
            <ListElement key={idx} title={elem} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {springCleaningChecklist.slice(4).map((elem, idx) => (
            <ListElement key={idx} title={elem} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ListElement({ title }: { title: string }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-primary-700 p-2 rounded-full">
        <div className=" w-full h-full">
          <ShieldCheckIcon className="text-white size-4" />
        </div>
      </div>
      <p className="text-surface-500">{title}</p>
    </div>
  );
}
