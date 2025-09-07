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

export type User = Profile & {
  personalInformation: {
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
  cleaners: {
    id: number;
    name: string;
    image: string | null;
  }[];
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
