import { UserData } from "@/lib/types";

export interface BookingsResponse {
  limit: number;
  page: number;
  total: number;
  data: Booking[];
}

export interface Booking {
  id: number;
  displayId: string;
  status: "DRAFT" | "PENDING" | "CONFIRMED" | "COMPLETED" | "FAILED";
  servicesPrice: number;
  addOnsPrice: number;
  tip: number;
  tax: number;
  currency: string;
  otherAddOns: string;
  cleaningFrequency: null;
  bedrooms: string;
  bathrooms: string;
  approximateSquareFootage: string;
  address: string;
  mapLocation: null;
  stripePaymentIntentId: string;
  pets: string;
  petsInstructions: string;
  entryInstructions: string;
  customerEmail: null | string;
  customerId: null | number;
  serviceTypeId: number;
  timeSlotId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  customer: Customer | null;
  serviceType: ServiceType;
  cleaners: Cleaner[];
  review: null;
  timeSlot: TimeSlot;
  price: number;
}

interface TimeSlot {
  id: number;
  date: string;
  endDate: null;
  isTemplate: boolean;
  startTime: number;
  endTime: number;
  instances: number;
  weekDays: number[];
  isActive: boolean;
  templateId: number;
}

interface ServiceType {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

interface Customer {
  id: number;
  email: string;
  password: string;
  refreshToken: string;
  passwordResetToken: null;
  role: string;
  signUpMethod: string;
  settingsData: SettingsData;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  personalInformation: PersonalInformation;
}

interface PersonalInformation {
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
  deletedAt: null;
}

interface SettingsData {
  unknown: unknown;
}

export interface ServiceOption {
  id: number;
  name: string;
  description: string;
  coverImage: null;
  supportingImages: string[];
  cleaningChecklist: string[];
  popular: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  serviceTypes: ServiceType[];
  serviceAddOn: ServiceAddOn[];
  pricingDetails: PricingDetail[];
}

interface PricingDetail {
  id: number;
  criteria: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  duration: string;
  serviceId: number;
}

interface ServiceAddOn {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  serviceId: number;
  createdAt: string;
  updatedAt: null | string;
  deletedAt: null;
}

interface ServiceType {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

// Cleaner Type
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
  mapLocation: null;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  user: UserData;
  specialities: ServiceOption[];
  serviceAreas: string[];
  qualifications: string[];
  location: null;
  stats: Stats;
}

interface Stats {
  totalBookings: number;
  completedBookings: number;
  averageCompletionRate: number;
  averageRating: number;
}
