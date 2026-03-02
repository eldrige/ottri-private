"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import StarIcon from "@/components/icons/StarIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCleanersQuery } from "@/app/admin/(authed)/_services/queries";
import { Cleaner } from "@/app/admin/types";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";

export default function OurTeamSection1() {
  const { data: cleaners, error } = useCleanersQuery({});

  const [currentSlide, setCurrentSlide] = useState(0);

  // if (!cleaners) return null

  const nextSlide = () => {
    if (!cleaners) return;
    setCurrentSlide((prev) => (prev + 1) % cleaners.length);
  };

  const prevSlide = () => {
    if (!cleaners) return;
    setCurrentSlide((prev) => (prev - 1 + cleaners.length) % cleaners.length);
  };

  if (error || cleaners?.length === 0) return null;

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
      <div className="hidden lg:grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {!cleaners &&
          [1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="aspect-[9/11]" />
          ))}
        {cleaners?.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
      {/* Mobile carousel  */}
      <div className="lg:hidden space-y-4">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {!cleaners && <Skeleton className="w-full aspect-[9/16]" />}
            {cleaners?.map((member, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <TeamMemberCard key={member.id} member={member} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1">
          {cleaners?.map((_, index) => (
            <span
              key={index}
              className={cn(
                "w-3 h-3 rounded-full cursor-pointer",
                currentSlide === index ? "bg-primary-700" : "bg-surface-200/60"
              )}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        {cleaners && (
          <div className="flex justify-center gap-4">
            <button
              disabled={currentSlide === 0}
              className={cn(
                "*:h-6 *:w-6 transition-colors",
                currentSlide === 0
                  ? "text-secondary-700/30"
                  : "text-primary-700 cursor-pointer"
              )}
              onClick={prevSlide}
            >
              <ArrowLeft />
            </button>
            <button
              disabled={currentSlide === cleaners.length - 1}
              className={cn(
                "*:h-6 *:w-6 transition-colors",
                currentSlide === cleaners.length - 1
                  ? "text-secondary-700/30"
                  : "text-primary-700 cursor-pointer"
              )}
              onClick={nextSlide}
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

interface TeamMemberCardProps {
  member: Cleaner;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md group">
      {/* Background Image */}
      <Image
        src={member.profile}
        width={400}
        height={500}
        alt={`${member.fullName}'s profile image`}
        className="w-full aspect-[2/2.5] object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay */}
      <div
        className="
          absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 
          opacity-0 group-hover:opacity-100
          md:transition-opacity duration-300
          flex flex-col justify-end p-4
          md:pointer-events-none
          md:group-hover:pointer-events-auto
          md:group-hover:opacity-100
          md:group-hover:translate-y-0
          md:hidden sm:hidden
        "
      />

      {/* Mobile: always show overlay */}
      <div
        className="
          absolute inset-0 bg-gradient-to-t gap-4 from-black via-black/70 to-black/30
          flex flex-col justify-end p-6 md:p-8
          opacity-100
          md:opacity-0 md:group-hover:opacity-100
        "
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-heading-3 md:text-heading-2 font-normal">
            {member.fullName}
          </h3>
          <p className="text-white text-subtitle capitalize">
            {member.user.role.toLowerCase()}
          </p>

          <div className="flex *:flex *:gap-1.25 *:items-center items-center gap-4 mt-2 text-white text-[16px]">
            <div>
              <StarIcon />
              <span>{`${member.stats.averageRating} (${member.stats.totalBookings})`}</span>
            </div>
            <div className="capitalize">
              <ClockIcon className="text-primary-700" />
              <span>{member.experience}</span>
            </div>
          </div>

          {member.serviceAreas.length > 0 && (
            <div className="flex gap-1.25 items-center">
              <LocationIcon className="text-primary-700" />
              <p className="text-white text-[16px]">
                {member.serviceAreas.map((i) => i.name).join(", ")}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {/* Specialties */}
          <h1 className="text-[17.8px] text-white">Specialities</h1>
          <div className="flex gap-2 *:text-nowrap flex-nowrap">
            {member.specialties.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="bg-white/30 text-white px-2 py-1 rounded-lg text-xs"
              >
                {spec}
              </span>
            ))}
            {member.specialties.length > 2 && (
              <span className="bg-white/30 text-white px-1.25 py-1 rounded-lg text-xs">
                +{member.specialties.length - 2}
              </span>
            )}
          </div>
        </div>
        <Link href={`/our-team/${member.id}`}>
          <Button
            size={"sm"}
            className="w-full text-[16px] font-medium cursor-pointer border-primary-700"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
