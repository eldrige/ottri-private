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
  slots: Record<string, number>;
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
