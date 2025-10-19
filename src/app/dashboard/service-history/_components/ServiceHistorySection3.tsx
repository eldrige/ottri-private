import React from "react";
import ServiceHistoryCard from "./ServiceHistoryCard";
import { useGetBookingsQuery } from "../../_services/queries";
import { Loader2 } from "lucide-react";

export default function ServiceHistorySection3() {
  const { data: historyServices, isLoading } = useGetBookingsQuery(
    "COMPLETED",
    100,
    0
  );
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
        </div>
      </div>
    </div>
  );
}
