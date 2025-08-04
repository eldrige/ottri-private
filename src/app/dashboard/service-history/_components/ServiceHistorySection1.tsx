import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import React from "react";

export default function ServiceHistorySection1() {
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div>
        <h1 className="flex items-center gap-2.5 font-semibold text-2xl">
          Service History
        </h1>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          View your past cleaning appointments and reviews
        </h3>
      </div>
      <Button
        className="md:flex hidden gap-2 px-4 py-2 text-body text-white items-center h-fit"
        size={"xs"}
      >
        <Download />
        Export PDF
      </Button>
    </section>
  );
}
