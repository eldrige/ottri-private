import ClockIcon2 from "@/components/icons/ClockIcon2";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { ClockIcon, FileTextIcon } from "lucide-react";

const statuses = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Overdue", value: "overdue" },
  { label: "Pending", value: "pending" }
];

const invoicesData = [
  {
    id: 1,
    status: statuses[1], // In Progress
    invoiceName: "INV-001",
    clientName: "Sarah Johnson",
    service: "Deep Clean",
    amount: 150,
    payment: "Credit Card",
    date: "2025-06-27",
    due: "2025-06-27"
  },
  {
    id: 2,
    status: statuses[0], // In Progress
    invoiceName: "INV-002",
    clientName: "Sarah Johnson",
    service: "Deep Clean",
    amount: 150,
    payment: "Bank Transfer",
    date: "2025-06-27",
    due: "2025-06-27"
  }
];

export default function InvoiceManagementPanel() {
  return (
    <div className="lg:border border-black/10 rounded-lg lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h5 className="text-subtitle ">
          Invoice Management ({invoicesData.length} total)
        </h5>
        <Button
          variant={"secondary"}
          size={"2xs"}
          className="flex items-center justify-center gap-1"
        >
          <ClockIcon2 className="size-4" />
          Send All Reminders
        </Button>
      </div>
      <div className="mt-8 space-y-4">
        {invoicesData.map((invoice) => (
          <ListItem
            key={invoice.id}
            statuses={statuses}
            initialStatus={invoice.status}
            invoiceName={invoice.invoiceName}
            clientName={invoice.clientName}
            service={invoice.service}
            amount={invoice.amount}
            payment={invoice.payment}
            date={invoice.date}
            due={invoice.due}
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
  statuses,
  initialStatus,
  invoiceName,
  clientName,
  service,
  amount,
  payment,
  date,
  due
}: {
  statuses: StatusType[];
  initialStatus: StatusType;
  invoiceName: string;
  clientName: string;
  service: string;
  amount: number;
  payment: string;
  date: string;
  due: string;
}) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-medium">{invoiceName}</span>
          <Select
            accent="secondary"
            options={statuses}
            buttonClassName={cn(
              "py-1.5 px-3 gap-2",
              status.value === "unpaid"
                ? "bg-warning/20 *:text-warning-text"
                : status.value === "pending"
                  ? "bg-info/20 *:text-info-text"
                  : status.value === "paid"
                    ? "bg-success/10 *:text-success"
                    : status.value === "overdue"
                      ? "bg-error/10 *:text-error"
                      : ""
            )}
            // activeClassName='bg-black/30 text-secondary-700'
            className="text-sm"
            placeholder="In Progress"
            value={status}
            onChange={(newStatus) => {
              setStatus(newStatus);
            }}
          />
          <span className={""}>
            {/* {statusIcon} */}
            {status.value === "paid" ? (
              <CheckBrokenIcon className="size-4 text-success" />
            ) : status.value === "overdue" ? (
              <ClockIcon className="size-4 text-error" />
            ) : (
              ""
            )}
          </span>
        </div>

        <div className="mt-4 lg:mt-6 text-xs flex flex-wrap flex-col md:flex-row gap-x-8 gap-y-4">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Client&apos;s name:</span>
              <span>{clientName}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Service:</span>
              <span>{service}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Amount:</span>
              <span>${amount}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Payment:</span>
              <span>{payment}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Date:</span>
              <span>{date}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Due:</span>
              <span>{due}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-auto">
        <div className="flex items-start justify-end gap-3 *:flex-1 lg:*:flex-0">
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
          >
            <FileTextIcon className="size-4" />
            View
          </Button>
          {status.value !== "paid" && (
            <Button
              size="2xs"
              variant={"secondary-outline"}
              className="text-xs flex items-center justify-center gap-1 border-black/10"
            >
              <ClockIcon2 className="size-4" />
              Remind
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
