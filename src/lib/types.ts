import { StaticImageData } from "next/image";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  numberOfRantings: number;
  averageRatings: number;
  experience: number;
  location: string;
  specialities: string[];
  coverSrc: StaticImageData;
}
