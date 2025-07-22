import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import { RefAttributes } from "react";

export type PricingDetail = {
  size: string;
  priceRange: string;
  timeRange: string;
};

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  services: string[];
  priceFrom: number;
  duration: string;
  coverSrc: StaticImageData;
  pricingDetails: PricingDetail[];
  mostPopular?: boolean;
  process: string[];
  Icon: ({
    className,
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
}

export interface HowWeWork {
  id: number;
  title: string;
  img: StaticImageData;
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    | (() => React.JSX.Element);
  content: string;
  steps: string[];
}
