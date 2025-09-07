import CartIcon from "@/components/icons/CartIcon";
import EditIcon from "@/components/icons/EditIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React from "react";

// Inventory data with separated stock level information
const inventoryItems = [
  {
    name: "All-Purpose Cleaner",
    category: "Cleaning Supplies",
    location: "Storage Room A",
    stock: {
      current: 8,
      max: 50,
      unit: "bottles"
    },
    status: "Low",
    emptyIn: "3d",
    unitCost: "$4.99",
    minLevel: "12 bottles",
    supplier: "CleanCorp Supply",
    lastRestocked: "2025-06-20"
  },
  {
    name: "Microfiber Cloths",
    category: "Cleaning Supplies",
    location: "Storage Room A",
    stock: {
      current: 45,
      max: 100,
      unit: "bottles"
    },
    status: "Normal",
    emptyIn: "14d",
    unitCost: "$1.22",
    minLevel: "12 bottles",
    supplier: "TextilePro",
    lastRestocked: "2025-06-20"
  },
  {
    name: "Floor Detergent",
    category: "Cleaning Supplies",
    location: "Storage Room B",
    stock: {
      current: 3,
      max: 30,
      unit: "gallons"
    },
    status: "Critical",
    emptyIn: "1d",
    unitCost: "$8.5",
    minLevel: "10 gallons",
    supplier: "CleanCorp Supply",
    lastRestocked: "2025-06-20"
  },
  {
    name: "Floor Detergent",
    category: "Cleaning Supplies",
    location: "Storage Room B",
    stock: {
      current: 3,
      max: 30,
      unit: "gallons"
    },
    status: "Critical",
    emptyIn: "1d",
    unitCost: "$8.5",
    minLevel: "10 gallons",
    supplier: "CleanCorp Supply",
    lastRestocked: "2025-06-20"
  }
];

export default function OverviewPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {inventoryItems.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "p-4 border border-black/10 rounded-lg space-y-4",
            item.status === "Critical" &&
              "shadow-[0px_0px_4px_0px] shadow-error"
          )}
        >
          <div className="flex justify-between items-center">
            <p className="font-medium">{item.name}</p>
            <p
              className={cn(
                "text-sm py-1 px-3 rounded-lg",
                item.status === "Low"
                  ? "text-warning-text bg-warning/20"
                  : item.status === "Normal"
                    ? "text-info-text bg-info/10"
                    : item.status === "Critical"
                      ? "text-error bg-error/10"
                      : ""
              )}
            >
              {item.status}
            </p>
          </div>

          <div>
            <p className="text-sm">{item.category}</p>
            <p className="text-xs text-secondary-700/50 mt-2">
              {item.location}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <p>Stock Level</p>
              <p>{`${item.stock.current}/${item.stock.max} ${item.stock.unit}`}</p>
            </div>
            <div className="mt-2 rounded-full bg-secondary-700/10 w-full h-2.5">
              <div
                className="h-full rounded-full bg-secondary-700"
                style={{
                  width: `${(item.stock.current / item.stock.max) * 100}%`
                }}
              />
            </div>
          </div>
          <div className="inline-grid grid-cols-2 gap-x-2 gap-y-4 *:min-w-32">
            <div>
              <p className="text-xs text-secondary-700/50">Empty in</p>
              <p className="text-sm mt-1">{item.emptyIn}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-700/50">Unit Cost</p>
              <p className="text-sm mt-1">{item.unitCost}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-700/50">Min Level</p>
              <p className="text-sm mt-1">{item.minLevel}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-700/50">Supplier</p>
              <p className="text-sm mt-1">{item.supplier}</p>
            </div>
          </div>
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:items-center justify-between">
            <p className="text-xs text-secondary-700/50">
              Last restocked: {item.lastRestocked}
            </p>
            <div className="flex gap-1 *:flex-1">
              {item.status !== "Normal" && (
                <Button
                  size={"2xs"}
                  variant={"secondary-outline"}
                  className="flex gap-1 items-center justify-center border-black/10 py-2 px-4"
                >
                  <CartIcon className="size-4" /> Restock
                </Button>
              )}
              <Button
                size={"2xs"}
                variant={"secondary-outline"}
                className="flex gap-1 items-center justify-center border-black/10 py-2 px-4"
              >
                <EditIcon className="size-4" /> Edit
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
