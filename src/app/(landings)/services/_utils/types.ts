import { StaticImageData } from "next/image";

export interface Service {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  serviceAddOn: ServiceAddOn[];
  serviceTypes: serviceType[];
  supportingImages: string[];
  cleaningChecklist: string[];
  popular: boolean;
  priceFrom: number;
  coverImage: StaticImageData;
  pricingDetails: PricingDetail[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

type PricingDetail = {
  id: number;
  criteria: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  duration: string;
  serviceId: number;
};

type ServiceAddOn = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type serviceType = {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
