import { Cleaner } from "@/app/admin/types";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import React from "react";
import CleanerProfile from "./_components/CleanerProfile";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  ShieldCheck,
  StarIcon
} from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

const certificationsAndQualifications = [
  "Certified Professional Cleaner (CPC)",
  "First Aid and CPR Certified",
  "Specialized Carpet Cleaning Training"
];

const reviews = [
  {
    rating: 5,
    reviewer: "Jane Doe",
    date: "2025-08-15",
    review: "Excellent service! My home has never been cleaner."
  },
  {
    rating: 5,
    reviewer: "Jennifer L.",
    date: "2025-08-15",
    review:
      "Maria is absolutely incredible! She transformed our home before our holiday party. Every detail was perfect, and she even organized areas we didn't ask for. Highly recommend!"
  }
];

async function ServicesDetailsPage({
  params
}: {
  params: Promise<{ cleanerId: string }>;
}) {
  const { cleanerId } = await params;

  const cleaner = (await axiosInstance(`/cleaners/${cleanerId}/profile`))
    .data as Cleaner;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <Link
          href={"/our-team"}
          className="text-lg text-primary-700 flex items-center gap-4"
        >
          <ArrowLeftIcon className="size-6" />
          Back to Our Team
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-20">
        <CleanerProfile cleaner={cleaner} />
        <div className="col-span-2 space-y-10">
          <div className="space-y-2 pt-12">
            <h3 className="text-3xl text-secondary-700 font-nunito-sans font-semibold">
              About {cleaner.fullName.split(" ")[0]}
            </h3>
            <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
              {cleaner.description}
            </p>
            <div className="p-8 bg-surface-50">
              <p className=" text-surface-500 text-base max-w-6xl mx-auto">
                {`"${cleaner.quote}"`}
              </p>
            </div>
          </div>
          <div className="space-y-2 pt-12">
            <h3 className=" text-secondary-700 text-heading-3 font-nunito-sans font-semibold">
              Availability & Booking
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <AvailabilityBookingsCard
                title="Availability"
                Icon={ClockIcon}
                description={"Monday - Friday: 8AM - 6PM, Saturday: 9AM - 4PM"}
              />
              <AvailabilityBookingsCard
                title="Booking Preference"
                Icon={CalendarIcon}
                description={cleaner.preference}
              />
              <AvailabilityBookingsCard
                title="Response Time"
                Icon={ChatIcon}
                description={"Within 2 hours"}
              />
              <AvailabilityBookingsCard
                title="Service Areas"
                Icon={LocationIcon}
                description={"Downtown, City Center, Westside, Suburban Hills"}
              />
            </div>
          </div>
          <div className="space-y-2 pt-12">
            <h3 className=" text-secondary-700 text-heading-3 font-nunito-sans font-semibold">
              Certifications & Qualifications
            </h3>
            <div className="space-y-2 w-full">
              {certificationsAndQualifications.map((certification, idx) => (
                <CertificationItem key={idx} certification={certification} />
              ))}
            </div>
          </div>
          <div className="space-y-2 pt-12">
            <h3 className=" text-secondary-700 text-heading-3 font-nunito-sans font-semibold">
              Work Examples
            </h3>
            <div className="space-y-10 w-full">
              <WorkExampleItem
                title="Living Room Deep Clean"
                imageUrlBefore={
                  "https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978.jpg"
                }
                imageUrlAfter={
                  "https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978.jpg"
                }
              />
              <WorkExampleItem
                title="Living Room Deep Clean"
                imageUrlBefore={
                  "https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978.jpg"
                }
                imageUrlAfter={
                  "https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978.jpg"
                }
              />
            </div>
          </div>
          <div className="space-y-2 pt-12">
            <h3 className=" text-secondary-700 text-heading-3 font-nunito-sans font-semibold">
              Recent Reviews
            </h3>
            <div className="space-y-8 w-full">
              {reviews.map((review, idx) => (
                <ReviewCard
                  key={idx}
                  rating={review.rating}
                  reviewer={review.reviewer}
                  date={review.date}
                  review={review.review}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesDetailsPage;
interface AvailabilityBookingsCardProps {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  children?: React.ReactNode;
}
function AvailabilityBookingsCard({
  title,
  Icon,
  description,
  children
}: AvailabilityBookingsCardProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="size-4.5 text-primary-700 mt-1.5" />
      <div className="flex flex-col items-start gap-1">
        <h3 className=" text-secondary-700 text-lg">{title}</h3>
        <p className="text-surface-500 text-base">
          {children ? children : description}
        </p>
      </div>
    </div>
  );
}

function CertificationItem({ certification }: { certification: string }) {
  return (
    <div className="flex gap-1.5">
      <ShieldCheck className="size-6 text-primary-700 mb-2" />
      <p className="text-surface-500">{certification}</p>
    </div>
  );
}

function WorkExampleItem({
  title,
  imageUrlBefore,
  imageUrlAfter
}: {
  title: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
}) {
  return (
    <div>
      <h1 className="text-secondary-700 font-light text-xl">{title}</h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-3">
          <p className="text-surface-500 text-base">Before</p>
          <Image
            src={imageUrlBefore}
            alt="Work Example"
            className="w-full object-cover rounded-lg h-40"
            width={1000}
            height={1000}
          />
        </div>
        <div className="space-y-3">
          <p className="text-surface-500 text-base">After</p>
          <Image
            src={imageUrlAfter}
            alt="Work Example"
            className="w-full object-cover rounded-lg h-40"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
}
interface ReviewCardProps {
  rating: number;
  reviewer: string;
  date: string;
  review: string;
}
function ReviewCard({ rating, reviewer, date, review }: ReviewCardProps) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <p className="text-surface-500">{reviewer}</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                className={`stroke-[1.5px] cursor-pointer size-4 ${index < rating ? "fill-[#FBC503] text-[#FBC503]" : "text-secondary-700"}`}
              />
            ))}
          </div>
        </div>
        <p className="text-surface-500">{formatDate(date)}</p>
      </div>
      <p className="text-surface-500">{review}</p>
    </div>
  );
}
