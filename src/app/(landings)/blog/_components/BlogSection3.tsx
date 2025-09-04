import { Button } from "@/components/ui/Button";
import React from "react";

export default function BlogSection3() {
  return (
    <section className="py-6 mt-4 mb-8 md:my-12 flex flex-col items-center gap-4">
      <div className="text-secondary-700 text-center">
        <h2 className="text-heading-2.5 font-semibold">
          Ready for a Professional Clean?
        </h2>
        <p className="text-subtitle text-base max-w-6xl mx-auto mb-2">
          {`While you're learning new tips, let our experts handle the heavy lifting.`}
        </p>
      </div>
      <div className="flex w-full md:w-fit flex-col *:text-nowrap *:flex-1 sm:flex-row gap-4">
        <Button className="border-primary-700 border-2" size="xs">
          Book Your Cleaning
        </Button>
        <Button
          size="xs"
          className="text-secondary-700 border-secondary-700"
          variant="secondary-outline"
        >
          Explore our services
        </Button>
      </div>
    </section>
  );
}
