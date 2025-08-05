import { Button } from "@/components/ui/Button";
import { CreditCard, PlusIcon } from "lucide-react";
import React from "react";

export default function BillingSection3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
          <div>
            <h1 className="flex items-center gap-2.5 font-semibold text-lg">
              Payment Methods
            </h1>
            <h3 className="text-caption text-secondary-800">
              Manage your saved payment methods
            </h3>
          </div>
        </div>
        <div className="flex items-center px-4 py-1.75 border border-surface-500/30 rounded-lg gap-8">
          <CreditCard className="rounded-full size-7 text-secondary-700" />
          <div className="flex flex-col">
            <div className="flex **:h-fit items-center gap-3">
              <div className="flex gap-0.75">
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
              </div>
              <div className="flex gap-0.75">
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
              </div>
              <div className="flex gap-0.75">
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
                <div className="rounded-full w-fit p-0.75 bg-secondary-700" />
              </div>
              <p className="secondary-700">4567</p>
            </div>
            <p className="text-caption text-surface-500">Expires 12/25</p>
          </div>
          <Button
            size={"xs"}
            className="hover:border-secondary-700 hover:text-secondary-700 w-fit rounded-lg py-1.5 h-fit items-center text-caption flex justify-center gap-3 bg-secondary-700 text-white"
          >
            Primary
          </Button>
        </div>
        <Button
          size={"xs"}
          className="w-full flex justify-center gap-3 "
          variant={"outline"}
        >
          <PlusIcon />
          <p>Add Payment Method</p>
        </Button>
      </div>
    </div>
  );
}
