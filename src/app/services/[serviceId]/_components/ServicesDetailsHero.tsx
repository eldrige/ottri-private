import ClockIcon from "@/components/icons/ClockIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Service } from "@/lib/types";

type ServicesDetailsHeroProps = Pick<
  Service,
  "title" | "priceFrom" | "duration" | "coverSrc"
>;

export default function ServicesDetailsHero({
  name: title,
  priceFrom,
  duration,
  coverImage: coverSrc
}: ServicesDetailsHeroProps) {
  return (
    <section className="pt-16 pb-8">
      <div className="pt-8 flex flex-col gap-8 md:gap-12">
        <HeroTop name={title} />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-6">
            <HeroLeftSide priceFrom={priceFrom} duration={duration} />
          </div>
          <div className="flex-7">
            <HeroRightSide coverImage={coverSrc} name={title} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroTop({ name: title }: Pick<ServicesDetailsHeroProps, "title">) {
  return (
    <>
      <Link
        href="/services"
        className="text-primary-500 text-lg mr-auto items-center gap-4 flex"
      >
        <ArrowLeft size={24} /> Back to all services
      </Link>
      <h1 className="text-heading-3 text-primary-700 md:text-heading-1 text-center md:text-start">
        {title}
      </h1>
    </>
  );
}
function HeroLeftSide({
  priceFrom,
  duration
}: Pick<ServicesDetailsHeroProps, "priceFrom" | "duration">) {
  return (
    <div className="md:my-15.5 flex flex-col gap-6">
      <div className="flex flex-col gap-4 text-center md:text-start">
        <h1 className="text-heading-3 text-secondary-700 md:text-heading-2 ">
          Book in Minutes
        </h1>
        <p className="text-surface-500 text-subtitle tracking-wide">
          Perfect for special occasions or seasonal cleaning
        </p>
        <p className="text-surface-500 text-subtitle tracking-wide">
          Our most comprehensive cleaning service that tackles every corner of
          your home with meticulous attention to detail. Ideal for spring
          cleaning, before hosting events, or when you want that extra level of
          sparkle.
        </p>
      </div>
      <hr className="text-black/20" />
      <div className="flex justify-between md:px-5">
        <InfoCard
          Icon={<DollarIcon />}
          title="Starting price"
          value={`From $${priceFrom}`}
        />
        <InfoCard
          Icon={<ClockIcon className="text-primary-700" />}
          value={`${duration} Hours`}
          title={"Duration"}
        />

        <InfoCard
          Icon={<Users className="text-primary-700" />}
          value={"2-3 Cleaners"}
          title={"Team size"}
        />
      </div>
      <hr className="text-black/20" />
      <div className="flex flex-col sm:flex-row gap-x-8 gap-y-4">
        <Button className="border-primary-700 border-2" size="xs">
          Book this service
        </Button>
        <Button size="xs" variant="secondary-outline">
          Get custom quote
        </Button>
      </div>
    </div>
  );
}
function HeroRightSide({
  coverImage: coverSrc,
  name: title
}: Pick<ServicesDetailsHeroProps, "coverSrc" | "title">) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-7 flex ">
        <Image
          className="rounded-lg aspect-[2/1] w-full object-cover"
          src={coverSrc}
          alt={`${title}'s cover`}
        />
      </div>
      <div className="grid grid-cols-3 *:flex-1 w-full flex-2 gap-x-2 self-end ">
        <Image
          className="rounded-lg aspect-[2/1] w-full object-cover"
          src={coverSrc}
          alt={`${title}'s cover`}
        />
        <Image
          className="rounded-lg aspect-[2/1] w-full object-cover"
          src={coverSrc}
          alt={`${title}'s cover`}
        />
        <Image
          className="rounded-lg aspect-[2/1] w-full object-cover"
          src={coverSrc}
          alt={`${title}'s cover`}
        />
      </div>
    </div>
  );
}

type InfoCardProps = {
  Icon: React.JSX.Element;
  value: string;
  title: string;
};

function InfoCard({ Icon, value, title }: InfoCardProps) {
  return (
    <div className="flex items-center px-0 w-fit flex-col">
      {Icon}
      <h5 className="text-[16px] md:text-lg font-medium text-secondary-700">
        {value}
      </h5>
      <p className="text-surface-500 text-[14px] md:text-[16px]  tracking-wide">
        {title}
      </p>
    </div>
  );
}
