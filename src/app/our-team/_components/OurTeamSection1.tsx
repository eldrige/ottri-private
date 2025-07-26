import React from "react";
import Image, { StaticImageData } from "next/image";
import { teamMembers } from "@/lib/sampleData";

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
        {teamMembers.map((teamMember) => (
          <TeamMemberCard key={teamMember.id} src={teamMember.coverSrc} />
        ))}
      </div>
    </section>
  );
}

function TeamMemberCard({ src }: { src: StaticImageData }) {
  return (
    <div
      className={`relative h-fit cursor-pointer rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
    >
      <Image
        className="rounded-lg aspect-[2/2.5] object-cover hover:scale-105 transition-transform duration-300 w-full"
        src={src}
        alt={` cover`}
      />
    </div>
  );
}
