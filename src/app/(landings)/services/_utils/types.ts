import { PricingDetail } from "@/lib/types";
import { StaticImageData } from "next/image";

/*
{
  "id": 1,
  "name": "residential cleaning",
  "description": "Perfect for special occasions or seasonal cleaning\n\nOur most comprehensive cleaning service that tackles every corner of your home with meticulous attention to detail. Ideal for spring cleaning, before hosting events, or when you want that extra level of sparkle.",
  "coverImage": null,
  "supportingImages": [],
  "cleaningChecklist": [
    "all rooms thoroughly cleaned and organized",
    "inside appliances (oven, fridge, microwave, dishwasher)",
    "baseboards, window sills, and door frames",
    "light fixtures and ceiling fans dusted",
    "cabinet fronts and handles sanitized",
    "bathroom deep scrub with grout cleaning",
    "kitchen deep clean including backsplash",
    "vacuum and mop all floors",
    "dust all surfaces and furniture",
    "empty all trash and replace liners",
    "make beds and tidy rooms",
    "dust all surfaces and furniture"
  ],
  "popular": true,
  "createdAt": "2025-08-08T21:14:17.727Z",
  "updatedAt": "2025-08-08T21:14:17.727Z",
  "deletedAt": null,
  "serviceTypes": [
    {
      "id": 3,
      "name": "move-in/move-out cleaning",
      "description": "Comprehensive cleaning for transition",
      "basePrice": 120,
      "currency": "usd",
      "serviceId": 1,
      "createdAt": "2025-08-08T21:20:34.687Z",
      "updatedAt": "2025-08-08T21:20:34.687Z",
      "deletedAt": null
    },
  ],
  "serviceAddOn": [
    {
      "id": 2,
      "name": "inside oven",
      "description": "string",
      "price": 25,
      "type": "STANDARD",
      "serviceId": 1,
      "createdAt": "2025-08-08T21:15:36.291Z",
      "updatedAt": "2025-08-08T21:15:36.291Z",
      "deletedAt": null
    },
  ],
  "pricingDetails": [
    {
      "id": 5,
      "criteria": "5+ bedrooms",
      "minPrice": 169,
      "maxPrice": 299,
      "currency": "usd",
      "duration": "5-6 hours",
      "serviceId": 1
    }
  ]
}
 */

export interface Service {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  services: string[];
  priceFrom: number;
  duration: string;
  coverImage: StaticImageData;
  pricingDetails: PricingDetail[];
  mostPopular?: boolean;
  process: string[];
  Icon: ({
    className
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
}
