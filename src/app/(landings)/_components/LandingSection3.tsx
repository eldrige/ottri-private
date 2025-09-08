import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getServices } from "../services/_utils/queries";
import LandingSection3Services from "./LandingSection3Services";

export default async function LandingSection3() {
  const services = await getServices();
  return (
    <section className="py-24 space-y-8">
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="text-heading-3 lg:text-heading-2">
          Some Janitorial Services
        </h2>
        <p className="text-subtitle text-surface-500 max-w-[832px]">
          From one-time deep cleans to regular maintenance, we have the right
          solution for every home and budget.
        </p>
        <Link className="text-primary-500 ml-auto flex" href="/services">
          View more <ArrowRight />
        </Link>
      </div>
      <LandingSection3Services
        services={services.length > 3 ? services.slice(0, 3) : services}
      />
      <div className="max-w-5xl mx-auto text-subtitle bg-surface-50 py-4 px-4 text-center">
        <p className="text-surface-500 tracking-wide">
          Not sure which service you need? Our cleaning experts are here to help
          you choose the perfect option for your home.
        </p>
        <Link
          className="text-primary-700 font-medium flex gap-4 justify-center mt-4"
          href="#"
        >
          Get personal recommendations
          <ArrowRight className="hidden lg:block" />
        </Link>
      </div>
    </section>
  );
}
