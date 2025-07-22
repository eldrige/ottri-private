import { howWeWorkData } from "@/lib/sampleData";
import { HowWeWork } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function HowWeWorkSection1() {
  return (
    <section>
      <div>
        {howWeWorkData.map((elem) => (
          <HowWeWorkCard key={elem.id} {...elem} />
        ))}
      </div>
    </section>
  );
}

function HowWeWorkCard({
  index,
  title,
  img,
  Icon,
  content,
  steps,
}: Pick<HowWeWork, "Icon" | "index" | "img" | "title" | "content" | "steps">) {
  return (
    <div className={" flex *:flex-1 gap-6 items-center"}>
      <div className="flex border-0 flex-col gap-5">
        <div className="flex gap-4 items-center">
          <button className="bg-primary-700 text-white font-semibold px-4.25 py-2 rounded-full">
            {index}
          </button>
          <Icon className="size-8 text-primary-700" />
        </div>
        <h2 className="text-heading-3">{title}</h2>
        <p>{content}</p>
        <ul className="text-surface-700 marker:text-primary-700 space-y-4">
          {steps.map((step, index) => (
            <li className="flex items-center" key={index}>
              <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex h-[526px]">
        <Image
          className="w-full object-cover rounded-2xl"
          src={img}
          alt="Landing Section2 Figure"
        />
      </div>
    </div>
  );
}
