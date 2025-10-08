"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import RewardStars from "@/components/icons/RewardStars";
import { cn } from "@/lib/utils";
import ClockIcon from "@/components/icons/ClockIcon";
import ReloadIcon from "@/components/icons/ReloadIcon";
import { Badge } from "@/components/ui/Badge";
import BoxIcon from "@/components/icons/BoxIcon";
import { Button } from "@/components/ui/Button";

export default function LandingSection5() {
  // Add state for the carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  const serviceCards = [
    {
      Icon: RewardStars,
      title: "One-Time Deep Clean",
      subtitle:
        "Perfect for special occasions, moving, or when you need that extra sparkle.",
      services: [
        "All rooms included",
        "Inside appliances",
        "Detailed cleaning",
        "Move-in ready"
      ],
      priceFrom: 89,
      duration: "3-5",
      mostPopular: false,
      buttonText: "Book one-time deep cleaning"
    },
    {
      Icon: ReloadIcon,
      title: "Recurring Cleaning",
      subtitle:
        "Regular maintenance cleaning to keep your home consistently fresh and tidy.",
      services: [
        "Weekly, bi-weekly, or monthly",
        "Consistent team",
        "Priority booking",
        "20% savings"
      ],
      priceFrom: 69,
      duration: "2-8",
      mostPopular: true,
      buttonText: "Book recurring cleaning"
    },
    {
      Icon: BoxIcon,
      title: "Move-In / Move-Out",
      subtitle:
        "Comprehensive cleaning for transitions. Get your deposit back or welcome home in style.",
      services: [
        "Empty home cleaning",
        "All surfaces sanitized",
        "Inside all appliances",
        "Satisfaction guaranteed"
      ],
      priceFrom: 149,
      duration: "4-6",
      mostPopular: false,
      buttonText: "Book a move-in/move-out cleaning"
    }
  ];

  // Functions to handle next and previous slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + serviceCards.length) % serviceCards.length
    );
  };

  return (
    <section className="pb-4 pt-8 lg:py-24 space-y-8">
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="text-heading-3 lg:text-heading-2">
          Choose Your Perfect Cleaning Service
        </h2>
        <p className="text-subtitle text-surface-500 max-w-[832px]">
          From one-time deep cleans to regular maintenance, we have the right
          solution for every home and budget.
        </p>
        <Link className="text-primary-500 ml-auto flex" href="/services">
          View more <ArrowRight />
        </Link>
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-x-8">
        {serviceCards.map((card, index) => (
          <ServiceCard key={index} {...card} />
        ))}
      </div>
      {/* Mobile carousel  */}
      <div className="lg:hidden space-y-4">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {serviceCards.map((card, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <ServiceCard {...card} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1">
          {serviceCards.map((_, index) => (
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
            disabled={currentSlide === serviceCards.length - 1}
            className={cn(
              "*:h-6 *:w-6 transition-colors",
              currentSlide === serviceCards.length - 1
                ? "text-secondary-700/30"
                : "text-primary-700 cursor-pointer"
            )}
            onClick={nextSlide}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-subtitle bg-surface-50 py-4 px-4 text-center">
        <p className="text-surface-500 tracking-wide">
          Not sure which service you need? Our cleaning experts are here to help
          you choose the perfect option for your home.
        </p>
        <Link
          className="text-primary-700 font-medium flex gap-4 justify-center mt-4"
          href="#"
        >
          Get personal recommendations
          <ArrowRight className="hidden lg:block" />
        </Link>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  subtitle: string;
  services: string[];
  priceFrom: number;
  duration: string;
  mostPopular?: boolean;
  Icon: ({
    className
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
  buttonText: string;
};

function ServiceCard({
  Icon,
  mostPopular,
  title,
  subtitle,
  services,
  priceFrom,
  duration,
  buttonText
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-black/10 space-y-4",
        mostPopular && "border-primary-700"
      )}
    >
      {mostPopular && (
        <div className="absolute top-0 left-4 -translate-y-1/2">
          <Badge size="sm">Most popular</Badge>
        </div>
      )}
      <div className="space-y-4 px-6 py-10">
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
        <ul className="list-disc text-surface-700 marker:text-primary-700 list-inside space-y-4">
          {services.slice(0, 4).map((service) => (
            <li className="flex items-center" key={service}>
              <span className="block w-2 h-2 rounded-full bg-primary-700 mr-2" />
              {service}
            </li>
          ))}
        </ul>

        <hr className="text-black/10" />

        <div className="flex items-center justify-between">
          <h5 className="text-heading-5 text-secondary-700">
            <span className="text-primary-700">$</span> From ${priceFrom}
          </h5>
          <p className="text-surface-500 flex items-center gap-3">
            <ClockIcon />
            {duration} Hours
          </p>
        </div>
        <Link href="/booking/new">
          <Button
            size="xs"
            variant={mostPopular ? "default" : "default-outline"}
            className="w-full px-2"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
