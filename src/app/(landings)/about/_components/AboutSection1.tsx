import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import React from "react";
import figure1 from "@/assets/about-section1-figure.png";
import figure1Mobile from "@/assets/about-section1-figureMobile.png";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection1() {
  return (
    <section className="pt-12 pb-8 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-x-2.5 gap-y-8">
      <div className="space-y-6 self-center">
        <Badge
          className="w-fit mx-auto lg:mx-0"
          variant="default"
          mode="outline"
        >
          About Ottri
        </Badge>
        <h1 className="text-heading-3 md:text-heading-2 text-center lg:text-start">
          Cleaning Homes, Building Trust, Creating Community
        </h1>
        <p className="text-surface-500 text-subtitle tracking-wide">
          We are a Kentucky-based organization providing all types of janitorial
          services including deep cleaning, standard cleaning, daily cleaning,
          new construction cleaning, terminal cleaning, move-out/move-in
          cleaning and specialized event cleaning.
        </p>
        <div className="flex flex-col sm:flex-row gap-x-8 gap-y-4">
          <Link href="/how-we-work">
            <Button size="xs">See how we work</Button>
          </Link>
          <Link href="/our-team">
            <Button size="xs" variant="secondary-outline">
              Meet our Team
            </Button>
          </Link>
        </div>
      </div>
      <figure className="">
        <Image
          className="ml-auto hidden lg:block"
          src={figure1}
          alt="Hero Figure"
        />
        <Image
          className="lg:hidden w-full scale-110"
          src={figure1Mobile}
          alt="Hero Figure"
        />
      </figure>
    </section>
  );
}
