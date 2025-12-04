import { UserData } from "@/lib/types";
import { ServiceAddOn } from "../(landings)/booking/new/types";

export interface BookingsResponse {
  limit: number;
  page: number;
  total: number;
  data: Booking[];
}

export interface MapBookingsResponse {
  total: number;
  data: Pick<
    Booking,
    "id" | "displayId" | "status" | "customer" | "guest" | "location"
  >[];
}

export enum BookingStatusLabels {
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  PENDING = "Pending",
  INPROGRESS = "In Progress"
}

export interface Booking {
  id: number;
  displayId: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "INPROGRESS";
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
  location?: {
    type: string;
    coordinates: number[];
  };
  guest?: Omit<PersonalInformation, "stripeCustomerId" | "userId"> & {
    email: string;
  };
  addOns: ServiceAddOn[];
  entryMethod: string;
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

export interface ServiceType {
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
  specialties: string[];
  serviceAreas: ServiceArea[];
  qualifications: string[];
  location: null;
  stats: CleanerStats;
}

export interface AddCleanerForm {
  profile: string;
  description: string;
  quote: string;
  address: string;
  preference: string;
  languages: string[];
  specialties: string[];
  serviceAreasIds: number[];
  qualifications: string[];
  email: string;
  experience: string;
  fullName: string;
  phoneNumber: string;
}

interface CleanerStats {
  totalBookings: number;
  completedBookings: number;
  averageCompletionRate: number;
  averageRating: number;
}

// Service Areas

export interface ServiceArea {
  id: number;
  popular: boolean;
  isActive: boolean;
  name: string;
  nickName: string;
  basePrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  services: unknown[];
  location: SALocation;
}

interface SALocation {
  type: string;
  coordinates: number[][][];
}

// BookingStats
export interface BookingStats {
  totalBookings: number;
  statusBreakdown: {
    COMPLETED: number;
    CANCELLED: number;
    PENDING: number;
    INPROGRESS: number;
  };
  totalRevenue: number;
  baseRevenue: number;
  totalTips: number;
}

// Applications
export interface JobApplicationType {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  coverLetter: string;
  cvLink: string;
  status: JobApplicationStatus;
  jobPositionId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

enum JobApplicationStatus {
  PENDING,
  APPROVED,
  REJECTED
}
