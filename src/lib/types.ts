import { StaticImageData } from "next/image";

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

export interface ServiceBooked {
  serviceName: string;
  cleanerName: string;
  cleanerImage?: StaticImageData;
  price?: number;
  date: string;
  time: string;
  review: string;
  location: string;
  state: "complete" | "scheduled" | "in-progress" | "pending" | "cancelled";
  rating: number;
}
