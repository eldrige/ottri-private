import CartIcon from "@/components/icons/CartIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import React from "react";

export default function QuickRestockPanel() {
  // Custom wrapper component to create the select with the status badge
  const ItemRestockSelect = () => {
    // Options for the restock dropdown
    const restockOptions = [
      {
        value: "floor-detergent",
        label: "Floor Detergent (3 gallons)"
      }
      // More options can be added as needed
    ];

    return (
      <>
        <p className="text-sm mb-2">Item to Restock</p>
        <div className="relative">
          <Select
            options={restockOptions}
            buttonClassName="bg-slate-50 py-2 px-4 h-full border-transparent"
            className="w-full text-sm"
            value={restockOptions[0]}
          />

          {/* Status badge positioned absolutely */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <span className="bg-warning/20 text-warning-text text-xs py-1 px-3 rounded-lg">
              Low
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-4 lg:p-6 border border-black/10 rounded-lg space-y-4 lg:space-y-8">
      <h5 className="text-subtitle font-medium">Quick Restock</h5>
      <div className="flex flex-col lg:flex-row gap-4 lg:*:flex-1 items-start">
        <div className="h-full w-full lg:w-auto">
          <ItemRestockSelect />
        </div>
        <div className="w-full lg:w-auto">
          <p className="text-sm mb-2">Quantity</p>
          <Input
            type="number"
            placeholder="27"
            className="h-full py-2 px-4 text-sm"
          />
        </div>
        <div className="w-full lg:w-auto">
          <p className="text-sm mb-2">Unit Cost ($)</p>
          <Input
            type="number"
            placeholder="8.5"
            className="h-full py-2 px-4 text-sm"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col lg:flex-row items-center justify-between gap-2 bg-surface-30">
        <div>
          <p>Total Cost</p>
          <p className="mt-2 text-secondary-700/70 text-xs">
            This will be automatically recorded as a business expense and update
            your inventory levels.
          </p>
        </div>
        <p className="text-subtitle font-medium">$209.58</p>
      </div>

      <Button
        variant={"secondary"}
        size={"2xs"}
        className="w-full flex items-center justify-center gap-1"
      >
        <CartIcon className="size-4" />
        Complete Purchase & Update Stock
      </Button>
    </div>
  );
}
