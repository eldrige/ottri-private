import figure1 from "@/assets/landing-section3-figure1.jpg";
import figure2 from "@/assets/landing-section3-figure2.jpg";
import figure3 from "@/assets/landing-section3-figure3.jpg";
import RewardStars from "@/components/icons/RewardStars";
import ReloadIcon from "@/components/icons/ReloadIcon";
import BoxIcon from "@/components/icons/BoxIcon";
import { Service } from "./types";

export const servicesData: Service[] = [
  {
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
    duration: "3-5",
    mostPopular: false,
  },
  {
    coverSrc: figure2,
    Icon: ReloadIcon,
    title: "Residential Cleaning",
    subtitle: "Making homes sparkle and shine with our top-tier services.",
    services: ["Move in / Move outs", "Spring cleaning", "Junk Removal"],
    priceFrom: 89,
    duration: "3-5",
    mostPopular: true,
  },
  {
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
    duration: "3-5",
    mostPopular: false,
  },
];
