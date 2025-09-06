import { Button } from "@/components/ui/Button";
import React from "react";

export default function HowWeWorkSection4() {
  return (
    <section className="py-12 px-6 md:px-0 bg-secondary-700 mt-8 mb-16 md:my-24 flex flex-col items-center gap-4">
      <div className="text-center text-white">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Ready to Experience the Ottri Difference?
        </h2>
        <p className="text-subtitle text-surface-300 text-base max-w-6xl mx-auto mb-2">
          See how easy professional home cleaning can be. Book your first
          service today.
        </p>
      </div>
      <div className="flex w-full md:w-fit flex-col *:text-nowrap *:flex-1 sm:flex-row gap-4">
        <Button className="border-primary-700 border-2" size="xs">
          Book Now
        </Button>
        <Button
          size="xs"
          className="text-primary-700 bg-white"
          variant="secondary-outline"
        >
          Explore our services
        </Button>
      </div>
    </section>
  );
}
