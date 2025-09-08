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
import { TeamMember, HowWeWork } from "./types";
import {
  CalendarIcon,
  CreditCardIcon,
  MessageSquareIcon,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";

export const ourProcesses = [
  "Pre-cleaning walkthrough and assessment",
  "Room-by-room systematic deep cleaning",
  "Quality check with detailed checklist",
  "Final walkthrough with customer",
  "Photo documentation of completed work"
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
