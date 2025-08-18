export interface PreflightType {
  services: ServiceType[];
  serviceAreas: unknown[];
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: number;
  templateId: number;
  date: string;
  startTime: number;
  endTime: number;
  instances: number;
  freeInstances: number;
  repetition: string;
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
