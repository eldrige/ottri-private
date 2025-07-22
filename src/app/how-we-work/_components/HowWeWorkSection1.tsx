import { howWeWorkData } from "@/lib/sampleData";
import { HowWeWork } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function HowWeWorkSection1() {
  return (
    <section className="pb-10 md:pb-20">
      <div className="flex flex-col gap-5 md:gap-20">
        {howWeWorkData.map((elem) => (
          <HowWeWorkCard key={elem.id} {...elem} />
        ))}
      </div>
    </section>
  );
}

function HowWeWorkCard({
  id,
  title,
  img,
  Icon,
  content,
  steps,
}: Pick<HowWeWork, "Icon" | "id" | "img" | "title" | "content" | "steps">) {
  return (
    <div
      className={`
        flex flex-col
        ${
          id % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
        }  lg:*:flex-1 gap-8 justify-center items-center"
      `}
    >
      <div className="flex justify-center flex-col gap-5">
        <div className="flex gap-4 items-center">
          <button className="bg-primary-700 text-white font-semibold px-3.75 text-center flex items-center justify-center py-2 rounded-full">
            {id}
          </button>
          <Icon className="size-8 text-primary-700" />
        </div>
        <h2 className="text-heading-3">{title}</h2>
        <p className="text-surface-700">{content}</p>
        <ul className="text-surface-700 marker:text-primary-700 space-y-4">
          {steps.map((step, id) => (
            <li className="flex items-center" key={id}>
              <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-53.25 md:h-[526px]">
        <Image
          className="w-full h-full object-cover rounded-2xl"
          src={img}
          alt="Landing Section2 Figure"
        />
      </div>
    </div>
  );
}
