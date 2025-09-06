import figure2 from "@/assets/landing-section3-figure2.jpg";
import figure3 from "@/assets/landing-section3-figure3.jpg";
import ourTeamFigure1 from "@/assets/ourteam-figure1.jpg";
import ourTeamFigure2 from "@/assets/ourteam-figure2.jpg";
import ourTeamFigure3 from "@/assets/ourteam-figure3.jpg";
import ourTeamFigure4 from "@/assets/ourteam-figure4.jpg";
import ourTeamFigure5 from "@/assets/ourteam-figure5.jpg";
import ourTeamFigure6 from "@/assets/ourteam-figure6.jpg";
import howweworkFigure1 from "@/assets/howwework-figure1.jpg";
import howweworkFigure2 from "@/assets/howwework-figure2.jpg";
import howweworkFigure3 from "@/assets/howwework-figure3.jpg";
import howweworkFigure4 from "@/assets/howwework-figure4.jpg";
import howweworkFigure5 from "@/assets/howwework-figure5.jpg";
import howweworkFigure6 from "@/assets/howwework-figure6.jpg";
import RewardStars from "@/components/icons/RewardStars";
import ReloadIcon from "@/components/icons/ReloadIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import { Service, TeamMember, HowWeWork } from "./types";
import {
  CalendarIcon,
  CreditCardIcon,
  MessageSquareIcon,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";

export const servicesData: Service[] = [
  {
    id: 1,
    coverSrc: howweworkFigure1,
    Icon: RewardStars,
    title: "Commercial Cleaning",
    subtitle: "Tailored cleaning solutions for businesses of all sizes.",
    services: [
      "Office Cleaning",
      "Club House and Halls",
      "Eateries and Kitchens"
    ],
    priceFrom: 89,
    pricingDetails: [
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4"
      },
      {
        size: "3-4 bedrooms",
        priceRange: "129-169",
        timeRange: "4-5"
      },
      {
        size: "1-2 Bedrooms",
        priceRange: "169-229",
        timeRange: "5-6"
      }
    ],
    duration: "3-5",
    mostPopular: false,
    process: [
      "Pre-cleaning walkthrough and assessment",
      "Room-by-room systematic deep cleaning",
      "Quality check with detailed checklist",
      "Final walkthrough with customer",
      "Photo documentation of completed work"
    ]
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
        timeRange: "3-4"
      },
      {
        size: "3-4 bedrooms",
        priceRange: "129-169",
        timeRange: "4-5"
      },
      {
        size: "1-2 Bedrooms",
        priceRange: "169-229",
        timeRange: "5-6"
      }
    ],
    duration: "3-5",
    mostPopular: true,
    process: [
      "Pre-cleaning walkthrough and assessment",
      "Room-by-room systematic deep cleaning",
      "Quality check with detailed checklist",
      "Final walkthrough with customer",
      "Photo documentation of completed work"
    ]
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
      "Make beds and tidy rooms"
    ],
    priceFrom: 89,
    pricingDetails: [
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4"
      },
      {
        size: "3-4 bedrooms",
        priceRange: "129-169",
        timeRange: "4-5"
      },
      {
        size: "1-2 Bedrooms",
        priceRange: "89-109",
        timeRange: "3-4"
      }
    ],
    duration: "3-5",
    mostPopular: false,
    process: [
      "Pre-cleaning walkthrough and assessment",
      "Room-by-room systematic deep cleaning",
      "Quality check with detailed checklist",
      "Final walkthrough with customer",
      "Photo documentation of completed work"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Jonas Cubb",
    role: "Founder, Cleaner",
    numberOfRantings: 245,
    averageRatings: 4.9,
    experience: 8,
    location: "Downtown $ city Center",
    specialities: [
      "Deep cleaning",
      "Move-in/Move-out",
      "Deep cleaning",
      "Move-in/Move-out"
    ],
    coverSrc: ourTeamFigure1
  },
  {
    id: 2,
    name: "Jonas Cubb",
    role: "Founder, Cleaner",
    numberOfRantings: 245,
    averageRatings: 4.9,
    experience: 8,
    location: "Downtown $ city Center",
    specialities: [
      "Deep cleaning",
      "Move-in/Move-out",
      "Deep cleaning",
      "Move-in/Move-out"
    ],
    coverSrc: ourTeamFigure2
  },
  {
    id: 3,
    name: "Jonas Cubb",
    role: "Founder, Cleaner",
    numberOfRantings: 245,
    averageRatings: 4.9,
    experience: 8,
    location: "Downtown $ city Center",
    specialities: [
      "Deep cleaning",
      "Move-in/Move-out",
      "Deep cleaning",
      "Move-in/Move-out"
    ],
    coverSrc: ourTeamFigure3
  },

  {
    id: 4,
    name: "Jonas Cubb",
    role: "Founder, Cleaner",
    numberOfRantings: 245,
    averageRatings: 4.9,
    experience: 8,
    location: "Downtown $ city Center",
    specialities: [
      "Deep cleaning",
      "Move-in/Move-out",
      "Deep cleaning",
      "Move-in/Move-out"
    ],
    coverSrc: ourTeamFigure4
  },

  {
    id: 5,
    name: "Jonas Cubb",
    role: "Founder, Cleaner",
    numberOfRantings: 245,
    averageRatings: 4.9,
    experience: 8,
    location: "Downtown $ city Center",
    specialities: [
      "Deep cleaning",
      "Move-in/Move-out",
      "Deep cleaning",
      "Move-in/Move-out"
    ],
    coverSrc: ourTeamFigure5
  },

  {
    id: 6,
    name: "Jonas Cubb",
    role: "Founder, Cleaner",
    numberOfRantings: 245,
    averageRatings: 4.9,
    experience: 8,
    location: "Downtown $ city Center",
    specialities: [
      "Deep cleaning",
      "Move-in/Move-out",
      "Deep cleaning",
      "Move-in/Move-out"
    ],
    coverSrc: ourTeamFigure6
  }
];

export const howWeWorkData: HowWeWork[] = [
  {
    id: 1,
    title: "Book in Minutes",
    content:
      "Choose your service, select date & time, and provide home details through our simple 8-step booking process.",
    img: howweworkFigure2,
    Icon: CalendarIcon,
    steps: [
      "Select service type and frequency",
      "Specify home size and special requests",
      "Choose convenient time slots",
      "Add any special instructions"
    ]
  },
  {
    id: 2,
    title: "We Match You",
    content:
      "We assigns the best available cleaner(s) based on your location, preferences, and service requirements.",
    img: howweworkFigure1,
    Icon: UserCheck,
    steps: [
      "Background-checked professionals only",
      "Skill-matched to your specific needs",
      "Local cleaners for faster service",
      "Consistent team for recurring bookings"
    ]
  },
  {
    id: 3,
    title: "Stay Connected",
    content:
      "Receive confirmation, cleaner details, and real-time updates. Communicate directly through our platform.",
    img: howweworkFigure3,
    Icon: MessageSquareIcon,
    steps: [
      "Booking confirmation within 2 hours",
      "Cleaner profile and arrival time",
      "Live tracking on cleaning day",
      "Direct messaging capability"
    ]
  },
  {
    id: 4,
    title: "Professional Cleaning",
    content:
      "Your cleaner arrives with supplies and equipment, following our comprehensive checklist for consistent quality.",
    img: howweworkFigure4,
    Icon: BroomSparkleIcon,
    steps: [
      "Eco-friendly supplies included",
      "Detailed room-by-room cleaning",
      "Quality assurance checklist",
      "Respectful of your home and time"
    ]
  },
  {
    id: 5,
    title: "Quality Check",
    content:
      "Post-cleaning quality review, photos for verification, and immediate feedback collection to ensure satisfaction.",
    img: howweworkFigure5,
    Icon: ShieldCheck,
    steps: [
      "Before/after documentation",
      "Quality checklist completion",
      "Customer satisfaction survey",
      "Issues resolved immediately"
    ]
  },
  {
    id: 6,
    title: "Easy Payment",
    content:
      "Automatic secure payment processing with transparent pricing. Tips can be added digitally for your cleaner.",
    img: howweworkFigure6,
    Icon: CreditCardIcon,
    steps: [
      "Contactless payment processing",
      "Transparent pricing breakdown",
      "Optional tipping feature",
      "Receipts and invoices provided"
    ]
  }
];
