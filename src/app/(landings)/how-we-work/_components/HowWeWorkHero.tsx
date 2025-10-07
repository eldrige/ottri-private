import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export default function HowWeWorkHero() {
  return (
    <section className="py-8 lg:py-24 space-y-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <Badge className="w-fit" variant="default" mode="outline">
          How We Work
        </Badge>
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          From Booking to Sparkling Clean in 8 Simple Steps
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Our streamlined process makes getting professional cleaning service as
          easy as ordering takeout. Here&apos;s exactly how it works.
        </p>
        <Link href="/booking/new">
          <Button className="py-3 px-5 text-md">
            Start your first booking
          </Button>
        </Link>
      </div>
    </section>
  );
}
