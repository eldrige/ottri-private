import React from "react";
import ourTeamFigure1 from "@/assets/ourteam-figure1.jpg";
import ourTeamFigure2 from "@/assets/ourteam-figure2.jpg";
import ourTeamFigure3 from "@/assets/ourteam-figure3.jpg";
import ourTeamFigure4 from "@/assets/ourteam-figure4.jpg";
import ourTeamFigure5 from "@/assets/ourteam-figure5.jpg";
import ourTeamFigure6 from "@/assets/ourteam-figure6.jpg";
import Image from "next/image";

export default function OurTeamSection1() {
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Featured Team Members
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Our most experienced and highly-rated cleaning professionals
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div
          className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
        >
          <Image
            className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
            src={ourTeamFigure1}
            alt={` cover`}
          />
        </div>
        <div
          className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
        >
          <Image
            className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
            src={ourTeamFigure2}
            alt={` cover`}
          />
        </div>
        <div
          className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
        >
          <Image
            className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
            src={ourTeamFigure3}
            alt={` cover`}
          />
        </div>
        <div
          className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
        >
          <Image
            className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
            src={ourTeamFigure4}
            alt={` cover`}
          />
        </div>
        <div
          className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
        >
          <Image
            className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
            src={ourTeamFigure5}
            alt={` cover`}
          />
        </div>
        <div
          className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
        >
          <Image
            className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
            src={ourTeamFigure6}
            alt={` cover`}
          />
        </div>
      </div>
    </section>
  );
}
