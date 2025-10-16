import { Building2, HomeIcon, Shield, Trees } from "lucide-react";

// Step 1
export const serviceTypes = [
  {
    id: "residential",
    name: "Residential Cleaning",
    Icon: HomeIcon,
    apiId: "residential cleaning"
  },
  {
    id: "commercial",
    name: "Commercial Cleaning",
    Icon: Building2,
    apiId: "commercial cleaning"
  },
  {
    id: "outdoor",
    name: "Outdoor Cleaning",
    Icon: Trees,
    apiId: "outdoor cleaning"
  },
  {
    id: "specialized",
    name: "Specialized Services",
    Icon: Shield,
    apiId: "specialized services"
  }
];

export const specificTypes = [
  {
    id: "one-time",
    name: "One-Time Deep Cleaning",
    subtitle: "Perfect for special occasions or seasonal cleaning",
    priceFrom: 89,
    apiId: "one-time deep cleaning"
  },
  {
    id: "recurring",
    name: "Recurring Cleaning",
    subtitle: "Regular maintenance cleaning",
    priceFrom: 89,
    apiId: "recurring cleaning"
  },
  {
    id: "move-in-out",
    name: "Move-in/Move-out Cleaning",
    subtitle: "Comprehensive cleaning for transition",
    priceFrom: 120,
    apiId: "move-in/move-out cleaning"
  },
  {
    id: "post-construction",
    name: "Post-Construction Cleaning",
    subtitle: "Cleaning for after construction",
    priceFrom: 149,
    apiId: "post-construction cleaning"
  }
];

export const frequencies = [
  { label: "One-time", value: "" },
  { label: "Monthly (Save 10%)", value: "MONTHLY" },
  { label: "Bi-weekly (Save 15%)", value: "BIWEEKLY" },
  { label: "Weekly (Save 10%)", value: "WEEKLY" }
];

// Step 2

export const bedroomOptions = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4+", label: "4+ Bedrooms" }
];
export const bathroomOptions = [
  { value: "1", label: "1 Bathroom" },
  { value: "2", label: "2 Bathrooms" },
  { value: "3", label: "3 Bathrooms" },
  { value: "4+", label: "4+ Bathrooms" }
];

export const squareFootageOptions = [
  { value: "500", label: "Up to 500 sq ft" },
  { value: "1000", label: "500-1000 sq ft" },
  { value: "1500", label: "1000-1500 sq ft" },
  { value: "2000", label: "1500-2000 sq ft" },
  { value: "2500+", label: "2500+ sq ft" }
];

// Step 3

export const addOnOptions = [
  { id: "inside-oven", name: "Inside Oven", price: 25, apiId: "inside oven" },
  {
    id: "inside-refrigerator",
    name: "Inside Refrigerator",
    price: 10,
    apiId: "inside refrigerator"
  },
  {
    id: "basement-cleaning",
    name: "Basement Cleaning",
    price: 20,
    apiId: "basement cleaning"
  },
  {
    id: "interior-windows",
    name: "Interior Windows",
    price: 15,
    apiId: "interior windows"
  },
  {
    id: "under-carpet",
    name: "Under Carpet",
    price: 20,
    apiId: "under carpet"
  },
  { id: "others", name: "Others", price: 20, apiId: "others" }
];

// Step 4 - Pet Info
export const petTypeOptions = [
  { id: "no-pets", name: "No Pets" },
  { id: "dogs", name: "Dog(s)" },
  { id: "cats", name: "Cat(s)" },
  { id: "both", name: "Both dogs and cats" }
];

// Step 5 - Access
export const accessOptions = [
  { id: "HOME", name: "I'll be home" },
  { id: "HIDDENKEY", name: "Key under mat/hidden" },
  { id: "DOORCODE", name: "Door code" },
  { id: "OTHER", name: "Other" }
];

// Step 6 - Schedule
export const scheduleOptions = [
  { value: "08-10", label: "8:00 AM - 10:00 AM" },
  { value: "10-12", label: "10:00 AM - 12:00 PM" },
  { value: "12-14", label: "12:00 PM - 2:00 PM" },
  { value: "14-16", label: "2:00 PM - 4:00 PM" },
  { value: "16-18", label: "4:00 PM - 6:00 PM" }
];
