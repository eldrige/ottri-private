import { Badge } from "@/components/ui/Badge";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import figure1 from "@/assets/landing-section3-figure1.jpg";
import figure2 from "@/assets/landing-section3-figure2.jpg";
import figure3 from "@/assets/landing-section3-figure3.jpg";
import RewardStars from "@/components/icons/RewardStars";
import ReloadIcon from "@/components/icons/ReloadIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesSection2() {
  return (
    <section className="px-26 pb-10 space-y-8">
      <div className="grid grid-cols-3 gap-x-8">
        <ServiceCard
          coverSrc={figure1}
          Icon={RewardStars}
          title="Commercial Cleaning"
          subtitle="Tailored cleaning solutions for businesses of all sizes."
        />
        <ServiceCard
          mostPopular
          coverSrc={figure2}
          Icon={ReloadIcon}
          title="Residential Cleaning"
          subtitle="Making homes sparkle and shine with our top-tier services."
        />
        <ServiceCard
          coverSrc={figure3}
          Icon={BoxIcon}
          title="Post Construction Cleaning"
          subtitle="We excel in post-construction cleaning to make your space ready for use."
        />
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  subtitle: string;
  coverSrc: StaticImageData;
  mostPopular?: boolean;
  Icon: ({
    className,
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
  link?: string;
};

function ServiceCard({
  coverSrc,
  Icon,
  mostPopular,
  title,
  subtitle,
  link,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between pb-6 gap-4 rounded-lg border-2 border-black/10",
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
      <div className="space-y-4 px-6">
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
      </div>
      <div className="flex items-center justify-center w-full">
        <Link className="text-primary-500 flex" href={link || "/services"}>
          View more <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
