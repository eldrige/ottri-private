import React, { useState } from "react";
import ServiceHistoryCard from "./ServiceHistoryCard";
import { useGetBookingsQuery } from "../../_services/queries";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ServiceHistorySection3() {
  const [page, setPage] = useState(0);
  const { data: historyServices, isLoading } = useGetBookingsQuery(
    "COMPLETED",
    100,
    0
  );

  const totalPages = historyServices
    ? Math.ceil(historyServices.total / historyServices.limit)
    : 0;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Completed Services
              </h3>
              <h3 className="text-caption text-secondary-800">
                Your cleaning history with ratings and reviews
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {historyServices?.data.map((service) => {
              return <ServiceHistoryCard key={service.id} service={service} />;
            })}
            {isLoading && (
              <div className="text-caption w-full flex items-center justify-center text-center text-secondary-800">
                <Loader2 className="animate-spin w-4 h-4" />
              </div>
            )}
            {!isLoading && historyServices?.data.length === 0 && (
              <div className="w-full flex justify-center">
                <h3 className="text-caption text-secondary-800">
                  No completed services found.
                </h3>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
                size={"2xs"}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-secondary-700">
                Page {page + 1} of {totalPages}
              </span>
              <Button
                onClick={() => setPage((old) => old + 1)}
                disabled={page >= totalPages - 1}
                size="2xs"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
