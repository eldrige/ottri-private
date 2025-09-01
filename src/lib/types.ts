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
