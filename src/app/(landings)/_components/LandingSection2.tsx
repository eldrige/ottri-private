import Image from "next/image";
import React from "react";
import figure from "@/assets/landing-section2-figure.jpg";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function LandingSection2() {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-y-8 pb-8 pt-18 lg:py-24">
      <div className="max-h-[60dvh] flex-1 lg:mr-[3%] rounded-lg lg:rounded-4xl overflow-hidden aspect-[14/18] lg:aspect-[20/18]">
        <Image
          className="object-cover h-full"
          src={figure}
          alt="Landing Section2 Figure"
        />
      </div>
      <div className="flex-1 flex flex-col items-center lg:items-start justify-center gap-6">
        <Badge variant="default" mode="outline">
          About Ottri
        </Badge>
        <h2 className="text-heading-3 lg:text-heading-2 text-center lg:text-start">
          Elevating Cleanliness And Comfort
        </h2>
        <p className="text-surface-500 text-subtitle">
          We are a Kentucky-based organization providing all types of janitorial
          services including deep cleaning, standard cleaning, daily cleaning,
          new construction cleaning, terminal cleaning, move-out/move-in
          cleaning and specialized event cleaning.
        </p>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
          <Button size="xs">See how we work</Button>
          <Button size="xs" variant="secondary-outline">
            Meet our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
