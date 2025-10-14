import CallIcon from "@/components/icons/CallIcon";
import EditIcon from "@/components/icons/EditIcon";
import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Cleaner } from "@/app/admin/types";
import { useUpdateCleanerMutation } from "../../_services/mutations";
import Image from "next/image";
import EditCleaner from "../_components/EditCleaner";

export default function StaffOverviewView({
  cleaners
}: {
  cleaners: Cleaner[];
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {cleaners.map((cleaner) => (
        <StaffBox key={cleaner.id} cleaner={cleaner} />
      ))}
    </div>
  );
}

const options = [
  { value: "AVAILABLE", label: "Available" },
  { value: "UNAVAILABLE", label: "Unavailable" }
];

function StaffBox({ cleaner }: { cleaner: Cleaner }) {
  const { mutateAsync, isPending: isUpdating } = useUpdateCleanerMutation();

  const [showEdit, setShowEdit] = useState(false);

  const [status, setStatus] = useState(
    options.find((i) => i.value === cleaner.status) || options[0]
  );

  useEffect(() => {
    console.log(status.value, cleaner.status);
    if (status.value !== cleaner.status) {
      mutateAsync(
        {
          cleanerId: cleaner.id,
          status: status.value as "AVAILABLE" | "UNAVAILABLE"
        },
        {
          onError: () => {
            setStatus(
              options.find((i) => i.value === cleaner.status) || options[0]
            );
            alert("Failed to change status");
          }
        }
      );
    }
  }, [status, cleaner, mutateAsync]);

  return (
    <div className="p-4 border border-black/10 rounded-lg">
      {showEdit && (
        <EditCleaner onClose={() => setShowEdit(false)} cleaner={cleaner} />
      )}
      <div className="flex items-center gap-3">
        {cleaner.profile ? (
          <Image
            src={cleaner.profile}
            alt={`${cleaner.fullName}'s profile picture`}
            width={100}
            height={100}
            className="object-cover rounded-full w-13.5 aspect-square"
          />
        ) : (
          <div className="hidden md:flex rounded-full p-2 h-13.5 aspect-square bg-gray-100 font-medium items-center justify-center uppercase">
            {cleaner.fullName
              .split(" ")
              .slice(0, 2)
              .map((i) => i[0])
              .join("")}
          </div>
        )}
        <h3 className="font-medium text-xl">{cleaner.fullName}</h3>
        <Select
          options={options}
          value={status}
          disabled={isUpdating}
          onChange={(status) => {
            setStatus(status);
          }}
          accent="secondary"
          className="ml-auto text-sm"
          buttonClassName={cn(
            "py-2 px-3 gap-2 border-none",
            status.value === "AVAILABLE"
              ? "bg-success/10 *:text-success"
              : status.value === "UNAVAILABLE"
                ? "bg-error/10 *:text-error"
                : ""
          )}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Rating: </span>
          <span className="flex gap-2 items-center">
            <StarIcon className="size-4" />
            {cleaner.stats.averageRating}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Jobs Completed: </span>
          <span className="flex gap-2 items-center">
            {cleaner.stats.completedBookings}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Today&apos;s Jobs: </span>
          <span className="flex gap-2 items-center">{0}</span>
          {/* TODO: isn't there yet ^^^ */}
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Complaints: </span>
          <span className="flex gap-2 items-center text-error">
            {0}
            {/* TODO: isn't there yet ^^^ */}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-medium">Specialties: </p>
        <div className="mt-4 flex gap-2.5">
          {cleaner.specialties?.map((spec) => (
            <div
              key={`${cleaner.id}-${spec}`}
              className="text-sm py-1 px-3 rounded-lg bg-secondary-700/10 capitalize"
            >
              <span>{spec}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3 *:flex-1">
        <Button
          onClick={() => setShowEdit(true)}
          className="flex items-center justify-center gap-1 border-secondary-700/10"
          size={"2xs"}
          variant={"secondary-outline"}
        >
          <EditIcon className="size-4" /> Edit
        </Button>
        <Button
          className="flex items-center justify-center gap-1 border-secondary-700/10"
          size={"2xs"}
          variant={"secondary-outline"}
        >
          <CallIcon className="size-4" /> Call
        </Button>
      </div>
    </div>
  );
}
