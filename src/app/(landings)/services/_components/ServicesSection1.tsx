import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export default function ServicesSection1() {
  return (
    <section className="pt-12 pb-8 lg:py-24 gap-x-2.5 gap-y-8">
      <div className="text-center w-full flex flex-col justify-center items-center space-y-4">
        <Badge className="w-fit" variant="default" mode="outline">
          Our Services
        </Badge>
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Professional Cleaning Services for Every Need
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          From regular maintenance to specialized deep cleans, we offer
          comprehensive cleaning solutions tailored to your specific
          requirements.
        </p>
        <Link href="/booking/new">
          <Button className="py-3 px-5 text-md">Book a cleaning now</Button>
        </Link>
      </div>
    </section>
  );
}
