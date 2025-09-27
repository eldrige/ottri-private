import React from "react";

export default function ExpenseHistory() {
  // Array of inventory items based on the image
  const inventoryItems = [
    {
      name: "All-Purpose Cleaner",
      category: "Cleaning Supplies",
      totalPrice: 119.76,
      quantity: 24,
      unitPrice: 4.99,
      supplier: "CleanCorp Supply",
      date: "2025-06-20"
    },
    {
      name: "Microfiber Cloths",
      category: "Cleaning Supplies",
      totalPrice: 62.5,
      quantity: 24,
      unitPrice: 4.99,
      supplier: "CleanCorp Supply",
      date: "2025-06-20"
    },
    {
      name: "Vacuum Cleaner Bags",
      category: "Equipment Part",
      totalPrice: 129.9,
      quantity: 10,
      unitPrice: 12.99,
      supplier: "EquipmentPlus",
      date: "2025-06-10"
    },
    {
      name: "Floor Detergent",
      category: "Cleaning Supplies",
      totalPrice: 102.0,
      quantity: 12,
      unitPrice: 8.5,
      supplier: "EquipmentPlus",
      date: "2025-06-10"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 lg:p-6 lg:border border-black/10 rounded-lg">
        <h5 className="text-subtitle font-medium">Purchase History</h5>
        <div className="mt-4 space-y-4">
          {inventoryItems.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row gap-x-8 gap-y-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h6 className="font-medium">{item.name}</h6>
                  <p className="text-xs py-1 px-3 rounded-lg bg-surface-50">
                    {item.category}
                  </p>
                </div>
                <div className="mt-4 flex text-sm gap-x-4 lg:gap-x-8 gap-y-4 flex-wrap">
                  <p className="flex items-center gap-2">
                    <span className="text-xs text-secondary-700/50">
                      Quantity:
                    </span>
                    {item.quantity}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-xs text-secondary-700/50">
                      Unit Price:
                    </span>
                    ${item.unitPrice.toFixed(2)}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-xs text-secondary-700/50">
                      Supplier:
                    </span>
                    {item.supplier}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-xs text-secondary-700/50">Date:</span>
                    {item.date}
                  </p>
                </div>
              </div>
              <p className="lg:text-right font-medium text-red-500">
                ${item.totalPrice.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="p-4 border border-black/10 rounded-lg">
          <div className="space-y-3">
            <h5 className="text-subtitle font-medium">Expense Summary</h5>
            <p className="text-sm flex justify-between items-center">
              <span className="text-xs text-secondary-700/50">
                Total Expenses
              </span>
              $414.16
            </p>
            <p className="text-sm flex justify-between items-center">
              <span className="text-xs text-secondary-700/50">This Month</span>
              $0.00
            </p>
            <p className="text-sm flex justify-between items-center">
              <span className="text-xs text-secondary-700/50">
                Monthly Average
              </span>
              $69.03
            </p>
          </div>

          <hr className="text-black/10 my-4" />

          <div className="space-y-3">
            <h5 className="text-subtitle font-medium">By Category</h5>
            <p className="text-sm flex justify-between items-center">
              <span className="text-xs text-secondary-700/50">
                Cleaning Supplies
              </span>
              $284.26
            </p>
            <p className="text-sm flex justify-between items-center">
              <span className="text-xs text-secondary-700/50">
                Equipment Parts
              </span>
              $129.90
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
