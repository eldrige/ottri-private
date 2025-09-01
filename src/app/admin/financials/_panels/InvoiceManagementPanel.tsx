import ClockIcon2 from "@/components/icons/ClockIcon2";
import { Button } from "@/components/ui/Button";
import React from "react";
import FinancialsListItem from "../_components/FinancialsListItem";

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
          <FinancialsListItem
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
