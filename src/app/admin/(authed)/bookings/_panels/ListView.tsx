import React, { useEffect, useState } from "react";
import ListItem from "../_components/ListItem";
import { cn } from "@/lib/utils";
import { useGetBookingsQuery } from "../../_services/queries";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import ErrorComponent from "@/app/_components/ErrorComponent";
import { Button } from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

export default function ListView() {
  const [page, setPage] = useState(0);
  const limit = 10;
  const statusFilter = useClientSearchParams().searchParams.get("status") || "";

  const getBookingsQuery = useGetBookingsQuery({ statusFilter, page, limit });
  const bookingsResponse = getBookingsQuery.data;

  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (bookingsResponse?.total) setTotal(bookingsResponse.total);
  }, [bookingsResponse]);

  if (getBookingsQuery.error)
    return (
      <ErrorComponent
        error={getBookingsQuery.error}
        reset={getBookingsQuery.refetch}
      />
    );

  const bookings = bookingsResponse?.data;
  const totalPages = Math.ceil((total || 1) / limit);
  const currentPage = page + 1;

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const statuses = [
    { label: "Unpaid", value: "UNPAID" },
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "INPROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  const renderSkeletons = () => {
    return Array(limit)
      .fill(0)
      .map((_, index) => (
        <Skeleton key={index} className="rounded-lg w-full h-38" />
      ));
  };

  if (!total) return <Loader2 className="animate-spin size-6 mx-auto my-8" />;

  return (
    <div className="relative">
      <div className={cn("mt-8 lg:p-6 lg:border border-black/10 rounded-lg")}>
        <h4 className="text-heading-5">
          Booking List ({total} Booking
          {bookings?.length !== 1 ? "s" : ""})
        </h4>

        <div className="mt-8 space-y-4">
          {!bookings || getBookingsQuery.isLoading
            ? renderSkeletons()
            : bookings.map((booking) => (
                <ListItem
                  key={booking.id}
                  status={
                    statuses.find((i) => i.value === booking.status) ||
                    statuses[0]
                  }
                  booking={booking}
                />
              ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                className="flex items-center"
                variant="outline"
                size="2xs"
                onClick={handlePreviousPage}
                disabled={page === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                className="flex items-center"
                variant="outline"
                size="2xs"
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
