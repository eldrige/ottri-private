import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";
import React from "react";

const statuses = [
  { label: "Processed", value: "processed" },
  { label: "Pending", value: "pending" }
];

const refundsData = [
  {
    id: 1,
    status: statuses[0],
    refundName: "REF-001",
    clientName: "Sarah Johnson",
    bookingNumber: "B-4567",
    originalAmount: 90,
    refundAmount: 45,
    reason: "Partial service completed",
    date: "2025-06-27"
  },
  {
    id: 2,
    status: statuses[1],
    refundName: "REF-002",
    clientName: "Bob Wilson",
    bookingNumber: "B-4567",
    originalAmount: 90,
    refundAmount: 45,
    reason: "Service cancelled by client",
    date: "2025-06-27"
  }
];

export default function RefundsPanel() {
  return (
    <div className="lg:border border-black/10 rounded-lg lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h5 className="text-subtitle ">Refund Management</h5>
      </div>
      <div className="mt-8 space-y-4">
        {refundsData.map((refund) => (
          <ListItem
            key={refund.id}
            initialStatus={refund.status}
            refundName={refund.refundName}
            clientName={refund.clientName}
            bookingNumber={refund.bookingNumber}
            originalAmount={refund.originalAmount}
            refundAmount={refund.refundAmount}
            reason={refund.reason}
            date={refund.date}
          />
        ))}
      </div>
    </div>
  );
}

interface StatusType {
  label: string;
  value: string;
}

function ListItem({
  initialStatus,
  refundName,
  clientName,
  bookingNumber,
  originalAmount,
  refundAmount,
  reason,
  date
}: {
  initialStatus: StatusType;
  refundName: string;
  clientName: string;
  bookingNumber: string;
  originalAmount: number;
  refundAmount: number;
  reason: string;
  date: string;
}) {
  const status = initialStatus;

  return (
    <div className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row justify-between gap-4">
      <div className="w-full">
        <div className="flex items-center gap-3">
          <span className="font-medium">{refundName}</span>
          <div
            className={cn(
              "py-1 px-3 rounded-lg text-sm",
              status.value === "processed"
                ? "bg-success/10 text-success"
                : status.value === "pending"
                  ? "bg-info/20 text-info-text"
                  : ""
            )}
          >
            {status.label}
          </div>
        </div>

        <div className="mt-4 lg:mt-6 text-xs flex flex-wrap flex-col md:flex-row gap-x-8 gap-y-4 *:flex-1">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Client&apos;s name:</span>
              <span>{clientName}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Booking Number:</span>
              <span>{bookingNumber}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Original Amount:</span>
              <span>${originalAmount}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Refund Amount:</span>
              <span>${refundAmount}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Reason:</span>
              <span>{reason}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Date:</span>
              <span>{date}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-auto">
        <div className="flex items-start justify-end gap-3 *:flex-1 lg:*:flex-0">
          {status.value !== "processed" && (
            <>
              <Button
                size="2xs"
                variant={"secondary-outline"}
                className="text-xs font-medium flex items-center justify-center gap-1 border-black/10"
              >
                Approve
              </Button>
              <Button
                size="2xs"
                variant={"secondary-outline"}
                className="text-xs font-medium flex items-center justify-center gap-1 border-black/10"
              >
                Reject
              </Button>
            </>
          )}
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
          >
            <FileTextIcon className="size-4" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
