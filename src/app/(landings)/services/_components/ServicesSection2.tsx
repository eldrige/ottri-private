"use server";
import { Badge } from "@/components/ui/Badge";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, RotateCwIcon, Sparkle } from "lucide-react";
import ClockIcon from "@/components/icons/ClockIcon";
import { Service } from "../_utils/types";
import ourTeamFigure2 from "@/assets/ourteam-figure2.jpg";
import { getServices } from "@/lib/api/services";
import BoxIcon from "@/components/icons/BoxIcon";

export default async function ServicesSection2() {
  const services = await getServices();
  return (
    <section className=" md:px-26 pb-10 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services && services.length > 0 ? (
          services.map((service) => {
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
              <ServiceCard
                key={service.id}
                id={service.id}
                coverImage={service.coverImage || ourTeamFigure2}
                serviceAddOn={service.serviceAddOn}
                priceFrom={priceFrom}
                duration={`${durationStart}-${durationEnd}`}
                name={service.name}
                description={service.description.slice(0, 80)}
                popular={service.popular}
              />
            );
          })
        ) : (
          <div className="col-span-3 text-center w-full">No Services</div>
        )}
      </div>
    </section>
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
  id,
  coverImage,
  popular: mostPopular,
  name: title,
  description,
  serviceAddOn: serviceAddsOn,
  priceFrom,
  duration
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between gap-4 rounded-lg border-2 border-black/10",
        mostPopular && "border-primary-700"
      )}
    >
      {mostPopular && (
        <div className="absolute top-0 left-4 -translate-y-1/2">
          <Badge size="sm">Most popular</Badge>
        </div>
      )}
      <Image
        className="rounded-t-lg aspect-2/1 w-full object-cover"
        src={coverImage}
        alt={`${title}'s cover`}
      />
      <div className="space-y-4 flex flex-col justify-between h-full px-6">
        <div
          className={cn(
            "w-10 aspect-square rounded-lg flex items-center justify-center",
            mostPopular
              ? "text-white bg-primary-700"
              : "text-primary-700 bg-surface-500/5"
          )}
        >
          {mostPopular ? (
            <RotateCwIcon />
          ) : id % 2 === 0 ? (
            <BoxIcon />
          ) : (
            <Sparkle />
          )}
        </div>
        <h4 className="text-heading-4 text-secondary-700">{title}</h4>
        <p className="text-base text-surface-700">{description}</p>
        <div className="lg:hidden space-y-4">
          <ul className="text-surface-700 marker:text-primary-700 space-y-4">
            {serviceAddsOn.slice(0, 3).map((service) => (
              <li className="flex items-center" key={service.id}>
                <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
                {service.name}
              </li>
            ))}
            <span className="text-primary-700">
              +{serviceAddsOn.length - 3} more features
            </span>
          </ul>

          <hr className="text-black/10" />

          <div className="flex items-center pb-10.5">
            <div className="space-y-4">
              <h5 className="text-heading-5 text-secondary-700">
                <span className="text-primary-700">$</span> From ${priceFrom}
              </h5>
              <p className="text-surface-500 flex items-center gap-3">
                <ClockIcon />
                {duration} Hours
              </p>
            </div>
            <Link className=" ml-auto" href={`/services/${id}`}>
              <ArrowRight className="text-primary-700" />
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full">
        <Link
          className="text-primary-500 pb-4 flex gap-4"
          href={`/services/${id}`}
        >
          View more <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
