import { howWeWorkData } from "@/lib/sampleData";
import { HowWeWork } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function HowWeWorkSection1() {
  return (
    <section className="py-8 lg:py-24">
      <div className="flex flex-col gap-24">
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
          id % 2 == 0 ? "lg:flex-row-reverse" : "lg:flex-row"
        }  lg:*:flex-1 gap-8 justify-center items-center"
      `}
    >
      <div className="flex justify-center lg:py-19.5 flex-col gap-6">
        <div className="flex gap-4 items-center">
          <button className="relative bg-primary-700 text-white font-semibold text-center flex items-center justify-center p-5 rounded-full">
            <p className="absolute top-[16%] text-center w-full text-xl">
              {id}
            </p>
          </button>
          <Icon className="size-8 text-primary-700" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-heading-3">{title}</h2>
          <p className="text-surface-700 text-left pr-5">{content}</p>
        </div>
        <ul className="text-surface-700 marker:text-primary-700 space-y-4">
          {steps.map((step, id) => (
            <li className="flex items-center" key={id}>
              <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <Image
          className="w-full h-full aspect-[2/1] object-cover rounded-lg md:rounded-4xl"
          src={img}
          alt="Landing Section2 Figure"
        />
      </div>
    </div>
  );
}
