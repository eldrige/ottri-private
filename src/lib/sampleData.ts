import figure1 from "@/assets/landing-section3-figure1.jpg";
import figure2 from "@/assets/landing-section3-figure2.jpg";
import figure3 from "@/assets/landing-section3-figure3.jpg";
import RewardStars from "@/components/icons/RewardStars";
import ReloadIcon from "@/components/icons/ReloadIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import { HowWeWork, Service } from "./types";
import { CalendarIcon } from "lucide-react";

export const servicesData: Service[] = [
  {
    id: 1,
    coverSrc: figure1,
    Icon: RewardStars,
    title: "Commercial Cleaning",
    subtitle: "Tailored cleaning solutions for businesses of all sizes.",
    services: [
      "Office Cleaning",
      "Club House and Halls",
      "Eateries and Kitchens",
    ],
    priceFrom: 89,
    pricingDetails: [
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4",
      },
      {
        size: "3-4 bedrooms",
        priceRange: "129-169",
        timeRange: "4-5",
      },
      {
        size: "1-2 Bedrooms",
        priceRange: "169-229",
        timeRange: "5-6",
      },
    ],
    duration: "3-5",
    mostPopular: false,
    process: [
      "Pre-cleaning walkthrough and assessment",
      "Room-by-room systematic deep cleaning",
      "Quality check with detailed checklist",
      "Final walkthrough with customer",
      "Photo documentation of completed work",
    ],
  },
  {
    id: 2,
    coverSrc: figure2,
    Icon: ReloadIcon,
    title: "Residential Cleaning",
    subtitle: "Making homes sparkle and shine with our top-tier services.",
    services: ["Move in / Move outs", "Spring cleaning", "Junk Removal"],
    priceFrom: 89,
    pricingDetails: [
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4",
      },
      {
        size: "3-4 bedrooms",
        priceRange: "129-169",
        timeRange: "4-5",
      },
      {
        size: "1-2 Bedrooms",
        priceRange: "169-229",
        timeRange: "5-6",
      },
    ],
    duration: "3-5",
    mostPopular: true,
    process: [
      "Pre-cleaning walkthrough and assessment",
      "Room-by-room systematic deep cleaning",
      "Quality check with detailed checklist",
      "Final walkthrough with customer",
      "Photo documentation of completed work",
    ],
  },
  {
    id: 3,
    coverSrc: figure3,
    Icon: BoxIcon,
    title: "Post Construction Cleaning",
    subtitle:
      "We excel in post-construction cleaning to make your space ready for use.",
    services: [
      "All rooms thoroughly cleaned and organized",
      "Inside appliances (oven, fridge, microwave, dishwasher)",
      "Baseboards, window sills, and door frames",
      "Light fixtures and ceiling fans dusted",
      "Cabinet fronts and handles sanitized",
      "Bathroom deep scrub with grout cleaning",
      "Dust all surfaces and furniture",
      "Empty all trash and replace liners",
      "Make beds and tidy rooms",
    ],
    priceFrom: 89,
    pricingDetails: [
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4",
      },
      {
        size: "3-4 bedrooms",
        priceRange: "129-169",
        timeRange: "4-5",
      },
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4",
      },
    ],
    duration: "3-5",
    mostPopular: false,
    process: [
      "Pre-cleaning walkthrough and assessment",
      "Room-by-room systematic deep cleaning",
      "Quality check with detailed checklist",
      "Final walkthrough with customer",
      "Photo documentation of completed work",
    ],
  },
];

export const howWeWorkData: HowWeWork[] = [
  {
    id: 1,
    title: "Book in Minutes",
    content:
      "Choose your service, select date & time, and provide home details through our simple 8-step booking process.",
    index: 1,
    img: figure1,
    Icon: CalendarIcon,
    steps: [
      "Select service type and frequency",
      "Specify home size and special requests",
      "Choose convenient time slots",
      "Add any special instructions",
    ],
  },
];
