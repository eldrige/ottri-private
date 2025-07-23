import { Button } from "@/components/ui/Button";
import React from "react";

export default function OurTeamSection3() {
  return (
    <section className="py-12 mt-8 mb-16 md:my-24 flex flex-col items-center gap-4">
      <div className="text-secondary-700 text-center">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Ready to Meet Your Cleaner?
        </h2>
        <p className="text-subtitle text-base max-w-6xl mx-auto mb-2">
          Book your service today and get matched with the perfect cleaning
          professional for your needs
        </p>
      </div>
      <div className="flex w-full md:w-fit flex-col *:text-nowrap *:flex-1 sm:flex-row gap-4">
        <Button className="border-primary-700 border-2" size="xs">
          Book Your Cleaning
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
