import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export default function OurTeamHero() {
  return (
    <section className="py-8 lg:py-24 space-y-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <Badge className="w-fit" variant="default" mode="outline">
          Our Team
        </Badge>
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Meet Our Professional Cleaning Team
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Every Ottri cleaner is carefully selected, thoroughly trained, and
          committed to delivering exceptional service. Get to know the
          professionals who make your home sparkle.
        </p>
        <div className="flex w-full md:w-fit flex-col *:text-nowrap *:flex-1 sm:flex-row gap-4">
          <Link href="/booking/new">
            <Button className="border-primary-700 border-2" size="xs">
              Book a cleaning
            </Button>
          </Link>
          <Link href="#hiring-standards">
            <Button
              size="xs"
              className="text-secondary-700 border-secondary-700"
              variant="secondary-outline"
            >
              How we hire
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
