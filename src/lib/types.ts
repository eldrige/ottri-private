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

// Booking

export interface BookingType {
  id: number;
  displayId: string;
  status: string;
  price: number;
  tip: number;
  currency: string;
  notes: string;
  bedrooms: string;
  bathrooms: string;
  approximateSquareFootage: number;
  address: string;
  mapLocation: null;
  stripePaymentIntentId: string;
  pets: string;
  petsInstructions: string;
  entryInstructions: string;
  date: string;
  customerId: null;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  customer: null;
  serviceTypes: BookingSpecificType[];
  cleaner: BookingCleanerType[];
  location: null;
}

interface BookingSpecificType {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  service: ServiceType;
}

interface ServiceType {
  id: number;
  name: string;
  description: string;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

interface BookingCleanerType {
  id: string;
}
