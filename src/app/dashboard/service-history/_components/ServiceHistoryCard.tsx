import { ServiceBooked } from "@/lib/types";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { ClockIcon, StarIcon } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";

type ServiceHistoryCardProps = Omit<ServiceBooked, "state">;

export default function ServiceHistoryCard({
  service,
}: {
  service: ServiceHistoryCardProps;
}) {
  return <DesktopServiceHistoryCard {...service} />;
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
}: ServiceHistoryCardProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row p-4 rounded-lg justify-between items-center border w-full border-secondary-800/25 gap-4">
        <div className="flex w-full gap-4">
          <Image
            className="hidden md:flex rounded-full size-12"
            src={cleanerImage ? cleanerImage : userImage}
            alt={"user profile"}
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
              <div className="flex gap-0.25 md:gap-4 text-surface-500 items-center *:text-caption">
                <ClockIcon className="text-surface-500/50 size-5" />
                <p className="text-nowrap">{time}</p>
              </div>
              <div className="flex gap-0.25 md:gap-4 text-surface-500 items-center *:text-caption">
                <LocationIcon className="text-surface-500/50 *:size-5" />
                <p className="text-nowrap">{location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex *:size-5 gap-0.25">
                {Array.from({ length: rating }).map((_, index) => (
                  <StarIcon
                    className="text-primary-700 fill-primary-700"
                    key={index}
                  />
                ))}
                {Array.from({ length: 5 - rating }).map((_, index) => (
                  <StarIcon className="text-primary-700" key={index + rating} />
                ))}
              </div>
              <p className="text-surface-500 text-caption">{rating}/5</p>
            </div>
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
            >
              Book Again
            </Button>
          </div>
        </div>

        <Button
          size={"xs"}
          className="w-full md:hidden text-secondary-700 text-caption  text-nowrap flex justify-center gap-3 "
          variant={"outline"}
        >
          Book Again
        </Button>
      </div>
    </div>
  );
}
