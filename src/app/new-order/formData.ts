import { Building2, HomeIcon, Shield, Trees } from "lucide-react";

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
