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
  servicesPrice: number;
  addOnsPrice: number;
  tip: number;
  tax: number;
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
  customerId: null;
  serviceTypeId: number;
  timeSlotId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  customer: null;
  serviceType: BookingSpecificType;
  cleaners: BookingCleanerType[];
  review: null;
  location: null;
  price: number;
  timeSlot: TimeSlotType;
}

interface TimeSlotType {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
  instances: number;
  repetition: string;
  freeInstances: number;
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
  service: BookingServiceType;
}

interface BookingServiceType {
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
