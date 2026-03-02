import React from "react";

export default function ServicesDetailsSection3({
  process
}: {
  process: string[];
}) {
  return (
    <section className="pb-12 md:py-24 gap-16 flex flex-col">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Our Process
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          How we deliver exceptional one-time deep clean
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col  max-w-xl items-center w-full gap-3 justify-center">
          {process.map((elem, _index) => (
            <ProcessCard key={_index} title={elem} idx={_index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ title, idx }: { title: string; idx: number }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full gap-4 items-center">
        <div className="bg-primary-700 font-medium px-4 py-2 text-white rounded-full">
          {idx}
        </div>
        <div className="flex flex-col  gap-4">
          <p className="text-surface-500">{title}</p>
          <hr className="text-black/15 w-full" />
        </div>
      </div>
    </div>
  );
}
