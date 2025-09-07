import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import { RefAttributes } from "react";

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
  settingsData: undefined;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  personalInformation: null;
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
    | (() => React.JSX.Element);
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
