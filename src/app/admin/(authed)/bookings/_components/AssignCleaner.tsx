import { Booking } from "@/app/admin/types";
import ClockIcon2 from "@/components/icons/ClockIcon2";
import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/Button";
import { cn, displayError, getErrorData } from "@/lib/utils";
import { format } from "date-fns";
import { X, Check } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useAssignCleanerMutation } from "../../_services/mutations";
import { useCleanersQuery } from "../../_services/queries";
import ModalWrapper from "@/components/common/ModalWrapper";

export default function AssignCleaner({
  booking,
  onClose
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const { data: cleaners } = useCleanersQuery({});
  const {
    mutateAsync: cleanerMutate,
    isPending,
    error
  } = useAssignCleanerMutation();

  // Pre-select currently assigned cleaners
  const [selectedCleanerIds, setSelectedCleanerIds] = useState<string[]>(
    booking.cleaners?.map((c) => c.id.toString()) || []
  );

  // Get original cleaner IDs for comparison
  const originalCleanerIds = useMemo(
    () => booking.cleaners?.map((c) => c.id.toString()) || [],
    [booking.cleaners]
  );

  // Check if selection has changed
  const hasChanged = useMemo(() => {
    if (selectedCleanerIds.length !== originalCleanerIds.length) {
      return true;
    }
    return !selectedCleanerIds.every((id) => originalCleanerIds.includes(id));
  }, [selectedCleanerIds, originalCleanerIds]);

  if (!cleaners) return null;

  const dateTime = format(
    new Date(booking.timeSlot.date),
    "dd-MM-yyyy 'at' h:mm a"
  );

  const isReassigning = booking.cleaners?.length > 0;

  const handleCleanerToggle = (cleanerId: string) => {
    setSelectedCleanerIds((prev) =>
      prev.includes(cleanerId)
        ? prev.filter((id) => id !== cleanerId)
        : [...prev, cleanerId]
    );
  };

  const handleAssignCleaner = async () => {
    if (selectedCleanerIds.length === 0) return;

    try {
      await cleanerMutate({
        bookingId: booking.id.toString(),
        cleanerIds: selectedCleanerIds
      });

      onClose();
    } catch (error) {
      console.error("Error assigning cleaner:", error);
    }
  };

  // Use createPortal to render the modal content to the portal container
  return (
    <ModalWrapper onClose={onClose}>
      <div
        className="border border-black/10 text-secondary-700 rounded-lg p-4 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <p className="text-heading-5 font-bold">
            {isReassigning ? "Reassign Cleaners" : "Assign Cleaners"}
          </p>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        <p>
          {isReassigning
            ? "Update the cleaner assignment for this booking. Currently assigned cleaners are pre-selected."
            : "Select cleaners for this booking. The system will recommend the best matches based on availability and specialty."}
        </p>

        <div className="p-4 bg-secondary-700/5 text-xs rounded-lg">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Client:</span>
              <span className="capitalize">
                {booking.guest?.fullName ||
                  booking.user?.personalInformation?.fullName}
              </span>
            </p>
            <p>
              <span className="font-medium mr-2">Service:</span>
              <span className="capitalize">{booking.serviceType.name}</span>
            </p>
            <p className="flex items-center gap-x-2 flex-wrap">
              <span className="font-medium mr-2">Cleaners:</span>
              {booking.cleaners?.length ? (
                booking.cleaners.map((cleaner) => cleaner.fullName).join(", ")
              ) : (
                <span className="text-error">Unassigned</span>
              )}
            </p>
          </div>
          <div className="mt-4 space-y-1">
            <p>
              <span className="font-medium mr-2">Date & Time:</span>
              <span className="capitalize">{dateTime}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Address:</span>
              <span className="capitalize">{booking.address}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Price:</span>
              <span className="capitalize">{booking.price}</span>
            </p>
          </div>
        </div>

        <p className="font-semibold">
          Available Cleaners{" "}
          {selectedCleanerIds.length > 0 && (
            <span className="text-sm font-normal text-secondary-700/70">
              ({selectedCleanerIds.length} selected)
            </span>
          )}
        </p>

        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          {!!cleaners.length &&
            cleaners.map((cleaner) => {
              const isSelected = selectedCleanerIds.includes(
                cleaner.id.toString()
              );
              const isDisabled = cleaner.status === "UNAVAILABLE";

              let isConflictError = false;
              if (error) {
                const errorData = getErrorData(error).data;
                if (Array.isArray(errorData)) {
                  isConflictError = errorData.some((i) => i === cleaner.id);
                }
              }

              return (
                <button
                  key={cleaner.id}
                  disabled={isDisabled}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-colors disabled:opacity-50 relative",
                    isConflictError
                      ? "border-error bg-error/5"
                      : isSelected
                        ? "border-secondary-700 bg-secondary-700/5"
                        : "border-black/10 hover:border-secondary-700/50"
                  )}
                  onClick={() => handleCleanerToggle(cleaner.id.toString())}
                >
                  {/* Selection indicator */}
                  <div
                    className={cn(
                      "absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-secondary-700 border-secondary-700"
                        : "border-gray-300"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>

                  <div className="flex items-center justify-between font-medium pr-8">
                    <p className="capitalize">{cleaner.fullName}</p>
                    <p>{cleaner.stats.totalBookings} Jobs</p>
                  </div>
                  <div className="mt-2 text-sm flex items-center gap-4">
                    <p className="flex gap-2">
                      <StarIcon className="size-4" />
                      {cleaner.stats.averageRating}
                    </p>
                    <p className="flex gap-2">
                      <ClockIcon2 className="size-4 text-black/25" />
                      {cleaner.status === "AVAILABLE" ? (
                        <span className="text-success">available</span>
                      ) : (
                        <span className="text-error">unavailable</span>
                      )}
                    </p>
                    <p className="text-secondary-700/70 ml-auto">
                      0 Complaints
                    </p>
                  </div>
                  {cleaner.specialties.length > 0 && (
                    <div className="mt-4 flex gap-2.5">
                      {cleaner.specialties.map((item, idx) => (
                        <p
                          key={idx}
                          className={cn(
                            "text-xs py-1 px-2 rounded-lg capitalize",
                            idx % 2 === 0
                              ? "border text-info-text bg-info/10 border-info/20"
                              : "bg-secondary-700/10"
                          )}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-600">
            {displayError(error)}
          </div>
        )}
        <div className="mt-4 space-y-4">
          <div className="mt-8 flex gap-8 *:flex-1">
            <Button variant={"secondary-outline"} size={"xs"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"secondary"}
              size={"xs"}
              onClick={handleAssignCleaner}
              disabled={
                selectedCleanerIds.length === 0 || isPending || !hasChanged
              }
              title={
                !hasChanged ? "No changes to cleaner assignment" : undefined
              }
            >
              {isPending
                ? isReassigning
                  ? "Reassigning..."
                  : "Assigning..."
                : `${isReassigning ? "Reassign" : "Assign"} ${selectedCleanerIds.length} Cleaner${
                    selectedCleanerIds.length !== 1 ? "s" : ""
                  }`}
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
