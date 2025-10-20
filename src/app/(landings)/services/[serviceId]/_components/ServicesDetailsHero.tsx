import ClockIcon from "@/components/icons/ClockIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Service } from "../../_utils/types";

type ServicesDetailsHeroProps = Pick<
  Service,
  "name" | "coverImage" | "description" | "supportingImages"
> & {
  duration: string;
  priceFrom: string;
};

export default function ServicesDetailsHero({
  name: title,
  priceFrom,
  duration,
  description,
  coverImage: coverSrc,
  supportingImages
}: ServicesDetailsHeroProps) {
  return (
    <section className="pt-16 pb-8">
      <div className="pt-8 flex flex-col gap-8 md:gap-12">
        <HeroTop name={title} />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-6">
            <HeroLeftSide
              description={description}
              priceFrom={priceFrom}
              duration={duration}
            />
          </div>
          <div className="flex-7">
            <HeroRightSide
              coverImage={coverSrc}
              name={title}
              supportingImages={supportingImages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroTop({ name }: Pick<ServicesDetailsHeroProps, "name">) {
  return (
    <>
      <Link
        href="/services"
        className="text-primary-500 text-lg mr-auto items-center gap-4 flex"
      >
        <ArrowLeft size={24} /> Back to all services
      </Link>
      <h1 className="text-heading-3 text-primary-700 md:text-heading-1 text-center md:text-start capitalize">
        {name}
      </h1>
    </>
  );
}
function HeroLeftSide({
  priceFrom,
  duration,
  description
}: Pick<ServicesDetailsHeroProps, "priceFrom" | "duration" | "description">) {
  return (
    <div className="md:my-15.5 flex flex-col gap-6">
      <div className="flex flex-col gap-4 text-center md:text-start">
        <h1 className="text-heading-3 text-secondary-700 md:text-heading-2 ">
          Book in Minutes
        </h1>
        <p className="text-surface-500 text-subtitle tracking-wide">
          {description.slice(0, 50)}
        </p>
        <p className="text-surface-500 text-subtitle tracking-wide">
          {description.slice(50)}
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
        <Link href="/booking/new">
          <Button className="border-primary-700 border-2" size="xs">
            Book this service
          </Button>
        </Link>
        <Link href="/#quote-calculator">
          <Button size="xs" variant="secondary-outline">
            Get custom quote
          </Button>
        </Link>
      </div>
    </div>
  );
}
function HeroRightSide({
  coverImage: coverSrc,
  name: title,
  supportingImages
}: Pick<ServicesDetailsHeroProps, "coverImage" | "name" | "supportingImages">) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-7 flex ">
        <Image
          className="rounded-lg aspect-[2/1] w-full object-cover"
          src={coverSrc}
          alt={`${title}'s cover`}
          width={680}
          height={445}
        />
      </div>
      <div className="grid grid-cols-3 *:flex-1 w-full flex-2 gap-x-2 self-end ">
        {supportingImages.map((image, index) => (
          <Image
            key={index}
            className="rounded-lg aspect-[2/1] w-full object-cover"
            src={image}
            alt={`${title}'s cover`}
            width={680}
            height={445}
          />
        ))}
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
