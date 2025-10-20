"use client";
import Image, { StaticImageData } from "next/image";
import cleanerPlacholderImage from "@/assets/cleaner-placeholder.png";
import { ClockIcon, StarIcon } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import { Booking } from "../../_utils/types";
import { formatDate } from "@/lib/utils";
import { formatHour24To12, formatName } from "../../_utils/helpers";
import { useGetBookingReview } from "../../_services/queries";
import { useRouter } from "next/navigation";

type ServiceHistoryCardProps = Booking;

export default function ServiceHistoryCard({
  service
}: {
  service: ServiceHistoryCardProps;
}) {
  const router = useRouter();

  const handleBookAgain = () => {
    router.push(`/booking/new?bookagain=${service.id}`);
  };

  return (
    <DesktopServiceHistoryCard
      cleanerName={service.cleaners[0]?.fullName || "No Cleaner"}
      date={formatDate(service.timeSlot.date)}
      location={service.address}
      price={service.price}
      serviceName={formatName(service.serviceType.name)}
      time={`${formatHour24To12(service.timeSlot.startTime)} - ${formatHour24To12(service.timeSlot.endTime)}`}
      cleanerImage={service.cleaners[0]?.profile || cleanerPlacholderImage}
      rating={service.review?.rating || 0}
      review={service.review?.comment || "No review provided"}
    />
  );
}

function DesktopServiceHistoryCard({
  serviceName,
  cleanerName,
  cleanerImage,
  date,
  time,
  location,
  price,
  rating,
  review,
  onBookAgain
}: {
  serviceName: string;
  cleanerName: string;
  cleanerImage: string | StaticImageData;
  date: string;
  time: string;
  location: string;
  price: number;
  rating: number;
  review: string;
  onBookAgain: () => void;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row p-4 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex gap-4 items-start">
          <Image
            className="object-cover rounded-full w-13.5 aspect-square"
            src={cleanerImage || cleanerPlacholderImage}
            alt={"cleaner profile"}
            width={100}
            height={100}
          />
          <div className="flex cursor-pointer w-full gap-2 flex-col">
            <div className="flex justify-between items-center md:items-start md:flex-col">
              <h1 className="font-medium text-body text-secondary-700">
                {serviceName}
              </h1>
              <div className="md:hidden border text-caption flex justify-center border-badge-green text-badge-green  items-center px-4 py-1 rounded-lg gap-2">
                Confirmed
              </div>
            </div>
            <div className="flex *:text-surface-500 items-center *:text-caption">
              <p>{cleanerName} </p>
              <div className="p-1 h-fit rounded-full mx-2 bg-surface-500/50" />
              <p>{date}</p>
            </div>
            <div className="flex gap-1 md:gap-4 **:text-nowrap">
              <div className="flex gap-0.25 md:gap-1 text-surface-500 items-center *:text-caption">
                <ClockIcon className="text-surface-500/50 size-5" />
                <p className="text-nowrap">{time}</p>
              </div>
              <div className="flex gap-0.25 md:gap-1 text-surface-500 items-center *:text-caption">
                <LocationIcon className="text-surface-500/50 size-5" />
                <p className="text-nowrap">{location}</p>
              </div>
            </div>
            {Boolean(rating) && (
              <div className="flex items-center gap-2">
                <div className="flex *:size-5 gap-0.25">
                  {Array.from({ length: rating }).map((_, index) => (
                    <StarIcon
                      className="text-primary-700 fill-primary-700"
                      key={index}
                    />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, index) => (
                    <StarIcon
                      className="text-primary-700"
                      key={index + rating}
                    />
                  ))}
                </div>
                <p className="text-surface-500 text-caption">{rating}/5</p>
              </div>
            )}
            <p className="text-surface-500/80 italic text-caption">{review}</p>
          </div>
        </div>
        <div className="hidden md:block gap-2">
          <div className="flex flex-col items-center gap-5">
            <div className="border text-caption flex justify-center border-badge-green text-badge-green  items-center px-4 py-1 rounded-lg gap-2">
              Confirmed
            </div>
            <p className="w-full text-left">${price}</p>
            <Button
              size={"xs"}
              className="w-full text-secondary-700 text-caption flex text-nowrap justify-center  gap-3 "
              variant={"outline"}
              onClick={onBookAgain}
            >
              Book Again
            </Button>
          </div>
        </div>

        <Button
          size={"xs"}
          className="w-full md:hidden text-secondary-700 text-caption  text-nowrap flex justify-center gap-3 "
          variant={"outline"}
          onClick={onBookAgain}
        >
          Book Again
        </Button>
      </div>
    </div>
  );
}
