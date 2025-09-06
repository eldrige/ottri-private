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
  customer: Customer | Customer2 | null;
  serviceType: ServiceType;
  cleaners: string[];
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

interface Customer2 {
  id: number;
  email: string;
  password: string;
  refreshToken: null;
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
