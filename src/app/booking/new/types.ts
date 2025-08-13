export interface PreflightType {
  services: Service[];
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

interface Service {
  id: number;
  name: string;
  description: string;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  serviceTypes: ServiceType[];
  serviceAddOn: ServiceAddOn[];
}

interface ServiceAddOn {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
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
