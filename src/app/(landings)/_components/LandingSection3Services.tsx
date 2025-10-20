"use client";
import {
  ArrowLeft,
  ArrowRight,
  BoxIcon,
  RotateCwIcon,
  Sparkle
} from "lucide-react";
import Image from "next/image";
import ourTeamFigure2 from "@/assets/ourteam-figure1.jpg";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ClockIcon from "@/components/icons/ClockIcon";
import { Badge } from "@/components/ui/Badge";
import { Service } from "../services/_utils/types";
import Link from "next/link";

export default function LandingSection3Services({
  services
}: {
  services: Service[];
}) {
  // Add state for the carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="space-y-8">
      <div className="hidden lg:grid grid-cols-3 gap-x-8">
        {services.map((service) => {
          const priceFrom = Math.min(
            ...service.pricingDetails.map((detail) => detail.minPrice)
          );

          const durationsArray = service.pricingDetails.map(
            (detail) => detail.duration
          );

          const durationStart = Math.min(
            ...durationsArray.map((elem) => Number(elem.split("-")[0]))
          );

          const durationEnd = Math.max(
            ...durationsArray.map((elem) =>
              Number(elem.split("-")[1].split(" ")[0])
            )
          );
          return (
            <div key={service.id} className="w-full h-full flex-shrink-0">
              <ServiceCard
                key={service.id}
                priceFrom={priceFrom}
                duration={`${durationStart}-${durationEnd}`}
                id={service.id}
                coverImage={service.coverImage || ourTeamFigure2}
                popular={service.popular}
                name={service.name}
                description={service.description.slice(0, 100)}
                serviceAddOn={service.serviceAddOn}
              />
            </div>
          );
        })}
      </div>
      {/* Mobile carousel  */}
      <div className="lg:hidden space-y-4">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {services.map((service) => {
              const priceFrom = Math.min(
                ...service.pricingDetails.map((detail) => detail.minPrice)
              );

              const durationsArray = service.pricingDetails.map(
                (detail) => detail.duration
              );

              const durationStart = Math.min(
                ...durationsArray.map((elem) => Number(elem.split("-")[0]))
              );

              const durationEnd = Math.max(
                ...durationsArray.map((elem) =>
                  Number(elem.split("-")[1].split(" ")[0])
                )
              );
              return (
                <div key={service.id} className="w-full flex-shrink-0">
                  <ServiceCard
                    key={service.id}
                    priceFrom={priceFrom}
                    duration={`${durationStart}-${durationEnd}`}
                    id={service.id}
                    coverImage={service.coverImage || ourTeamFigure2}
                    popular={service.popular}
                    name={service.name}
                    description={service.description.slice(0, 10)}
                    serviceAddOn={service.serviceAddOn}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center gap-1">
          {services.map((_, index) => (
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
            disabled={currentSlide === services.length - 1}
            className={cn(
              "*:h-6 *:w-6 transition-colors",
              currentSlide === services.length - 1
                ? "text-secondary-700/30"
                : "text-primary-700 cursor-pointer"
            )}
            onClick={nextSlide}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

type ServiceCardProps = Pick<
  Service,
  | "id"
  | "coverImage"
  | "popular"
  | "name"
  | "description"
  | "serviceAddOn"
  | "priceFrom"
> & { priceFrom: number; duration: string };

function ServiceCard({
  coverImage,
  id,
  popular,
  name,
  description,
  serviceAddOn,
  priceFrom,
  duration
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col my-5 justify-between gap-4 rounded-lg border-2 border-black/10",
        popular && "border-primary-700"
      )}
    >
      {popular && (
        <div className="absolute top-0 left-4 -translate-y-1/2">
          <Badge size="sm">Most popular</Badge>
        </div>
      )}
      <Image
        className="rounded-t-lg aspect-[2/1] w-full object-cover"
        src={coverImage}
        alt={`${name}'s cover`}
      />
      <div className="space-y-4 px-6">
        <div
          className={cn(
            "w-10 aspect-square rounded-lg flex items-center justify-center",
            popular
              ? "text-white bg-primary-700"
              : "text-primary-700 bg-surface-500/5"
          )}
        >
          {popular ? (
            <RotateCwIcon />
          ) : id % 2 === 0 ? (
            <BoxIcon />
          ) : (
            <Sparkle />
          )}
        </div>
        <h4 className="text-heading-4 text-secondary-700 capitalize">{name}</h4>
        <p className="text-base text-surface-700">{description}</p>
        <ul className="text-surface-700 marker:text-primary-700 space-y-4">
          {serviceAddOn.slice(0, 3).map((service) => (
            <li className="flex items-center" key={service.id}>
              <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
              {service.name}
            </li>
          ))}
          <span className="text-primary-700">
            +{serviceAddOn.length} more features
          </span>
        </ul>

        <hr className="text-black/10" />

        <div className="flex items-center pb-10.5">
          <div className="space-y-4">
            <h5 className="text-heading-5 text-secondary-700 text-nowrap">
              <span className="text-primary-700">$</span> From ${priceFrom}
            </h5>
            <p className="text-surface-500 flex text-nowrap items-center gap-3">
              <ClockIcon />
              {duration} Hours
            </p>
          </div>
          <Link className="flex justify-end w-full" href={`/services/${id}`}>
            <ArrowRight className="text-primary-700 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
