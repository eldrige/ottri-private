import DollarIcon2 from "@/components/icons/DollarIcon2";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

// Sample data matching the image
const data = [
  { date: "Jun 20", BookingRevenue: 420, LateFees: 50, Tips: 20 },
  { date: "Jun 21", BookingRevenue: 530, LateFees: 110, Tips: 45 },
  { date: "Jun 22", BookingRevenue: 600, LateFees: 65, Tips: 50 },
  { date: "Jun 23", BookingRevenue: 900, LateFees: 30, Tips: 15 },
  { date: "Jun 24", BookingRevenue: 830, LateFees: 25, Tips: 20 },
  { date: "Jun 25", BookingRevenue: 800, LateFees: 40, Tips: 15 },
  { date: "Jun 26", BookingRevenue: 700, LateFees: 45, Tips: 20 },
  { date: "Jun 27", BookingRevenue: 530, LateFees: 15, Tips: 5 }
];

export default function RevenueOverviewPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border border-black/10 rounded-lg">
        <div className="flex items-center justify-between px-6 py-6.5">
          <h5 className="text-subtitle">Daily Revenue Breakdown</h5>
          <p className="text-xs px-2 py-1 border border-black/10 rounded-lg">
            8 days
          </p>
        </div>
        <div className="overflow-x-auto">
          <div
            className="px-4 pb-4"
            style={{ height: "430px", minWidth: "550px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 20
                }}
                barGap={2}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#2C3E5080"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  tick={{ fontSize: 12 }} // Add this line to control the font size
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}`}
                  domain={[0, 1000]}
                  ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
                  tick={{ fontSize: 12 }}
                  dx={-10}
                />
                <Bar
                  dataKey="BookingRevenue"
                  fill="#1e293b"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={50}
                />
                <Bar
                  dataKey="LateFees"
                  fill="#22c55e"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={50}
                />
                <Bar
                  dataKey="Tips"
                  fill="#eab308"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={50}
                />
                <Legend
                  align="left"
                  verticalAlign="bottom"
                  iconType="line"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: 15, fontSize: 14 }}
                  formatter={(value) => {
                    return value
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str: string) => str.toUpperCase())
                      .trim();
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="border border-black/10 rounded-lg p-4 lg:p-6 flex flex-col">
        <div className="p-2 flex items-center gap-2">
          <DollarIcon2 className="size-6" />
          <h5 className="font-semibold">Revenue Tracking Overview</h5>
        </div>
        <div className="mt-6 border border-[#0D81F7] bg-[#0D81F70D] py-4 px-4 rounded-xl h-full">
          <ul className="list-disc list-inside space-y-6 ml-4">
            <li>
              <span className="font-semibold">Primary Revenue: </span>
              Automatically calculated from completed bookings
            </li>
            <li>
              <span className="font-semibold">Additional Income: </span>
              Tips, late fees, and premium services
            </li>
            <li>
              <span className="font-semibold">Payment Tracking: </span>
              Invoice management with automated reminders
            </li>
            <li>
              <span className="font-semibold">Expenses: </span>
              Managed separately through the Inventory section
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
