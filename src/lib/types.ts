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
    className
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  numberOfRantings: number;
  averageRatings: number;
  experience: number;
  location: string;
  specialities: string[];
  coverSrc: StaticImageData;
}

export interface Article {
  id: number;
  isFeatured: boolean;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  readingTime: number;
  publicationDate: string;
  tags: string[];
  publisherId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  status: "published" | "scheduled" | "draft";
}
