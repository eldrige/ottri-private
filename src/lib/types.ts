import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import { RefAttributes } from "react";

export interface DecodedJWT {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  numberOfRantings: number;
  averageRatings: number;
  experience: number;
  location: string;
  specialties: string[];
  coverSrc: StaticImageData;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  data: UserData;
}

export interface UserData {
  id: number;
  email: string;
  role: string;
  signUpMethod: string;
  settingsData: unknown;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  personalInformation: PersonalInformation;
  settings: Settings;
}

interface Settings {
  language: string;
  timezone: string;
  currency: string;
  bookingReminder: boolean;
  promotionalEmails: boolean;
  twoFactorAuth: boolean;
  shareMyLocation: boolean;
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

export interface ServiceBooked {
  serviceName: string;
  cleanerName: string;
  cleanerImage?: StaticImageData;
  price?: number;
  date: string;
  time: string;
  review?: string;
  location: string;
  state: "complete" | "scheduled" | "in-progress" | "pending" | "cancelled";
  rating: number;
}
export interface HowWeWork {
  id: number;
  title: string;
  img: StaticImageData;
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    | (({
        className
      }: {
        className?: string | undefined;
      }) => React.JSX.Element);
  content: string;
  steps: string[];
}

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

export interface TimeSlotFormDataType {
  startTime: string | null;
  maxCapacity: number | null;
  serviceIds: number[];
  daysOfWeek: number[];
  isActive: boolean;
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
