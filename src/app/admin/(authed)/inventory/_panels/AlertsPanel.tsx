import CartIcon from "@/components/icons/CartIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React from "react";

// Define the type for inventory items
interface InventoryItem {
  id: string;
  name: string;
  location: string;
  stockStatus: "Low Stock" | "Critical Stock" | "In Stock";
  currentStock: number;
  unit: string;
  minimumRequired: number;
  daysUntilEmpty: number;
  estimatedReorder: number;
}

// Create the array of inventory items based on the image
const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "All-Purpose Cleaner",
    location: "Cleaning Supplies • Storage Room A",
    stockStatus: "Low Stock",
    currentStock: 8,
    unit: "bottles",
    minimumRequired: 12,
    daysUntilEmpty: 3,
    estimatedReorder: 259.8
  },
  {
    id: "2",
    name: "Vacuum Cleaner Bags",
    location: "Equipment Parts • Equipment Storage",
    stockStatus: "Critical Stock",
    currentStock: 5,
    unit: "boxes",
    minimumRequired: 8,
    daysUntilEmpty: 4,
    estimatedReorder: 259.8
  },
  {
    id: "3",
    name: "Vacuum Cleaner Bags",
    location: "Equipment Parts • Equipment Storage",
    stockStatus: "Low Stock",
    currentStock: 5,
    unit: "boxes",
    minimumRequired: 8,
    daysUntilEmpty: 4,
    estimatedReorder: 259.8
  }
];

export default function AlertsPanel() {
  return (
    <div className="space-y-4">
      {inventoryItems.map((item) => (
        <AlertItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function AlertItem({ item }: { item: InventoryItem }) {
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical Stock":
        return "bg-error/10 text-error";
      case "Low Stock":
        return "bg-warning/20 text-warning-text";
      default:
        return "bg-success/20 text-success";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-8 items-start justify-between p-6 rounded-lg border border-black/10",
        item.stockStatus === "Critical Stock"
          ? "bg-error/7 shadow-[0px_0px_4px_0px] shadow-error"
          : "bg-warning/7"
      )}
    >
      <div className="w-full">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{item.name}</h3>
            <span
              className={`px-3 py-1 text-xs rounded-lg ${getStatusColor(item.stockStatus)}`}
            >
              {item.stockStatus}
            </span>
          </div>
          <p className="mt-2 text-sm text-secondary-700/50">{item.location}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-4 gap-4 w-full">
          <div className="space-y-1">
            <p className="text-xs text-secondary-700/50">Current Stock</p>
            <p className="text-sm">
              {item.currentStock} {item.unit}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-secondary-700/50">Minimum Required</p>
            <p className="text-sm">
              {item.minimumRequired} {item.unit}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-secondary-700/50">Days Until Empty</p>
            <p className="text-sm text-error">{item.daysUntilEmpty}d</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-secondary-700/50">Estimated Reorder</p>
            <p className="text-sm">${item.estimatedReorder.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <Button
        variant={
          item.stockStatus === "Critical Stock"
            ? "secondary"
            : "secondary-outline"
        }
        size={"2xs"}
        className={cn(
          "w-full lg:w-auto flex items-center justify-center gap-1 border-black/10",
          item.stockStatus !== "Critical Stock" && "bg-white"
        )}
      >
        <CartIcon className="size-4" />
        Restock Now
      </Button>
    </div>
  );
}
