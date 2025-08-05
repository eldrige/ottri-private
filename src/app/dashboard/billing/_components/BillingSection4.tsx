import { Button } from "@/components/ui/Button";
import React from "react";

export default function BillingSection4() {
  return (
    <div className="flex flex-col gap-6">
      <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
          <div>
            <h1 className="flex items-center gap-2.5 font-semibold text-lg">
              Transaction History
            </h1>
            <h3 className="text-caption text-secondary-800">
              Your recent payments and credit
            </h3>
          </div>
        </div>
        <div className="space-y-8">
          <TransactionCard
            service="Standard Cleaning"
            cleaner="Eddie Legaspi"
            amount={75}
            date="May 16, 2025"
            state="Completed"
          />
          <TransactionCard
            service="Deep Cleaning"
            cleaner="Xandra Claire"
            amount={85}
            date="May 16, 2025"
            state="Completed"
          />
        </div>
      </div>
    </div>
  );
}

type TransactionCardProps = {
  service: string;
  cleaner: string;
  date: string;
  amount: number;
  state: string;
};

function TransactionCard({
  service,
  cleaner,
  date,
  amount,
  state,
}: TransactionCardProps) {
  return (
    <div className="flex lg:border items-center border-surface-500/30 rounded-lg p-2 justify-between">
      <div className="flex flex-col gap-1 h-full justify-between">
        <h2 className="text-secondary-700 gap-2.5 font-semibold text-lg">
          {service} - {cleaner}
        </h2>
        <p className="text-caption text-secondary-800">{date}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-red-500">-${amount.toFixed(2)}</p>
        <Button
          size={"xs"}
          className="w-full text-caption text-secondary-700 flex justify-center gap-3 "
          variant={"outline"}
        >
          {state}
        </Button>
      </div>
    </div>
  );
}
