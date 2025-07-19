import { StaticImageData } from "next/image";

export type PricingDetail = {
  size: string;
  priceRange: string;
  timeRange: string;
};

export interface Service {
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
