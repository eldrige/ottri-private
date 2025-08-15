import { Badge } from "@/components/ui/Badge";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClockIcon from "@/components/icons/ClockIcon";
import { servicesData } from "@/lib/sampleData";
import { Service } from "@/lib/types";

export default function ServicesSection2() {
  return (
    <section className=" md:px-26 pb-10 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, idx) => (
          <ServiceCard
            key={idx}
            id={service.id}
            coverSrc={service.coverSrc}
            Icon={service.Icon}
            services={service.services}
            priceFrom={89}
            duration="3-5"
            title={service.title}
            subtitle={service.subtitle}
            {...(service.mostPopular ? { mostPopular: true } : {})}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  id,
  coverSrc,
  Icon,
  mostPopular,
  title,
  subtitle,
  services,
  priceFrom,
  duration
}: Omit<Service, "pricingDetails" | "process">) {
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
        className="rounded-t-lg aspect-[2/1] w-full object-cover"
        src={coverSrc}
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
          <Icon />
        </div>
        <h4 className="text-heading-4 text-secondary-700">{title}</h4>
        <p className="text-base text-surface-700">{subtitle}</p>
        <div className="lg:hidden space-y-4">
          <ul className="text-surface-700 marker:text-primary-700 space-y-4">
            {services.slice(0, 3).map((service) => (
              <li className="flex items-center" key={service}>
                <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
                {service}
              </li>
            ))}
            <span className="text-primary-700">
              +{services.slice(3).length} more features
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
