import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditCard, PlusIcon } from "lucide-react";
import React from "react";

export default function BillingSection3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-3 lg:p-6 border items-center border-surface-500/30 rounded-lg flex flex-col gap-6">
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
        <div className="flex w-full items-center px-2 md:px-4 py-1.75 border border-surface-500/30 rounded-lg gap-3">
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
              <p className="text-secondary-700 text-xs md:text-body">4567</p>
            </div>
            <p className="text-caption text-surface-500">Expires 12/25</p>
          </div>
          <Badge className="border-0 w-fit rounded-xl py-1 px-4 h-fit items-center text-[14px] flex justify-center gap-3 bg-secondary-700 text-white">
            Primary
          </Badge>
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
