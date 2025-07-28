import { Building2, HomeIcon, Shield, Trees } from "lucide-react";

// Step 1
export const serviceTypes = [
  {
    id: "residential",
    name: "Residential Cleaning",
    Icon: HomeIcon,
  },
  {
    id: "commercial",
    name: "Commercial Cleaning",
    Icon: Building2,
  },
  {
    id: "outdoor",
    name: "Outdoor Cleaning",
    Icon: Trees,
  },
  {
    id: "specialized",
    name: "Specialized Services",
    Icon: Shield,
  },
];

export const specificTypes = [
  {
    id: "one-time",
    name: "One-Time Deep Cleaning",
    subtitle: "Perfect for special occasions or seasonal cleaning",
    priceFrom: 89,
  },
  {
    id: "recurring",
    name: "Recurring Cleaning",
    subtitle: "Regular maintenance cleaning",
    priceFrom: 89,
  },
  {
    id: "move-in-out",
    name: "Move-in/Move-out Cleaning",
    subtitle: "Comprehensive cleaning for transition",
    priceFrom: 120,
  },
  {
    id: "post-construction",
    name: "Post-Construction Cleaning",
    subtitle: "Cleaning for after construction",
    priceFrom: 149,
  },
];

// Step 2

export const bedroomOptions = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4+", label: "4+ Bedrooms" },
];
export const bathroomOptions = [
  { value: "1", label: "1 Bathroom" },
  { value: "2", label: "2 Bathrooms" },
  { value: "3", label: "3 Bathrooms" },
  { value: "4+", label: "4+ Bathrooms" },
];

export const squareFootageOptions = [
  { value: "500", label: "Up to 500 sq ft" },
  { value: "1000", label: "500-1000 sq ft" },
  { value: "1500", label: "1000-1500 sq ft" },
  { value: "2000", label: "1500-2000 sq ft" },
  { value: "2500+", label: "2500+ sq ft" },
];
