import { Cleaner } from "@/app/admin/types";

export interface Profile {
  id: number;
  email: string;
  role: string;
  signUpMethod: string;
  settingsData: Record<string, string>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  settings: {
    language: string;
    timezone: string;
    currency: string;
    bookingReminder: boolean;
    promotionalEmails: boolean;
    twoFactorAuth: boolean;
    shareMyLocation: boolean;
  };
}

export type User = {
  id: number;
  email: string;
  role: string;
  signUpMethod: string;
  settingsData: Record<string, string>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  settings: {
    language: string;
    timezone: string;
    currency: string;
    bookingReminder: boolean;
    promotionalEmails: boolean;
    twoFactorAuth: boolean;
    shareMyLocation: boolean;
  };
  personalInformation?: {
    id: number;
    fullName: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    zipCode: string;
    city: string;
    stripeCustomerId: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};

export interface Cleaner {
  id: number;
  profile: string;
  fullName: string;
  phoneNumber: string;
  description: string;
  quote: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  experience: string;
  address: string;
  preference: string;
  languages: string[];
  mapLocation: string | null;
  specialties: string[];
  qualifications: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  location: string | null;
}

export interface Booking {
  id: number;
  displayId: string;
  status: "PENDING" | "INPROGRESS" | "COMPLETED" | "CANCELLED";
  servicesPrice: number;
  addOnsPrice: number;
  tip: number;
  tax: number;
  currency: string;
  otherAddOns: string;
  cleaningFrequency: number | null;
  bedrooms: string | null;
  bathrooms: string | null;
  approximateSquareFootage: number | null;
  address: string;
  mapLocation: string | null;
  stripePaymentIntentId: string;
  pets: string;
  petsInstructions: string;
  entryInstructions: string;
  customerEmail: string | null;
  customerId: number;
  serviceTypeId: number;
  timeSlotId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customer: User;
  serviceType: {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    currency: string;
    serviceId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  };
  cleaners: Cleaner[];
  timeSlot: {
    id: number;
    date: string;
    endDate: string | null;
    isTemplate: boolean;
    startTime: number;
    endTime: number;
    instances: number;
    weekDays: number[];
    isActive: boolean;
    templateId: number;
  };
  review: Review | null;
  location: string | null;
  price: number;
}

export interface Review {
  id: number;
  comment: string;
  isFeatured: boolean;
  rating: number;
  completionRate: number;
  reviewerId: number;
  bookingId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
