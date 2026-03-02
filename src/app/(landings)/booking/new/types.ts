export interface PreflightType {
  services: ServiceType[];
  serviceAreas: unknown[];
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
  instances: number;
  endDate: null;
  isTemplate: boolean;
  templateId: null;
  isActive: boolean;
  weekDays: number[];
  slots: Record<string, number>;
  services: Omit<ServiceType, "serviceTypes" | "serviceAddOn">[];
}

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  serviceTypes: SpecificType[];
  serviceAddOn: ServiceAddOn[];
}

export interface ServiceAddOn {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  serviceId: number;
}

interface SpecificType {
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

export interface ArticleType {
  id: number;
  title: string;
  isFeatured: boolean;
  excerpt: string;
  category: string;
  thumbnail: string;
  author: string;
  isPublished: boolean;
  content: string;
  tags: string[];
  publicationDate: string;
  publisherId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  publisher: {
    id: number;
    personalInformation: null;
  };
  readingTime: number;
  status: "PUBLISHED" | "SCHEDULED" | "DRAFT";
  views?: number;
}

export interface NewArticleType {
  isFeatured: boolean;
  tags: string[];
  title: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  author: string;
  isPublished: boolean;
  content: string;
  publicationDate: string;
}
