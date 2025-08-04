import { Button } from "@/components/ui/Button";
import React from "react";

export default function ServicesDetailsSection5() {
  return (
    <section className="py-8 my-8 md:my-16 flex flex-col items-center gap-4">
      <div className="text-center text-secondary-700">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Ready to Book One-Time Deep Clean?
        </h2>
        <p className="text-subtitle text-base max-w-6xl mx-auto mb-2">
          Schedule your service today and experience the Ottri difference.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="border-primary-700 border-2" size="xs">
          Book one-time Cleaning
        </Button>
        <Button size="xs" variant="secondary-outline">
          Explore our services
        </Button>
      </div>
    </section>
  );
}
