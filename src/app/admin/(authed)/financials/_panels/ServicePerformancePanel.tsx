import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, PieLabel } from "recharts";

export default function ServicePerformancePanel() {
  const data = [
    { name: "Residential Cleaning", value: 4200, color: "#1e1e64" },
    { name: "Commercial Cleaning", value: 2100, color: "#22c55e" },
    { name: "Outdoor Cleaning", value: 1900, color: "#fbbf24" },
    { name: "Specialized Services", value: 3800, color: "#e67e22" }
  ];

  const renderCustomizedLabel: PieLabel = (props) => {
    const { cx, cy, midAngle = 0, outerRadius, index = 0, value } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={data[index].color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
        fontWeight={500}
      >
        {value}
      </text>
    );
  };

  // Custom legend component
  const CustomLegend: React.FC = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-start gap-x-6 gap-y-4 mt-8">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-1 mr-2"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border border-black/10 rounded-lg">
        <div className="flex items-center justify-between px-6 py-6.5">
          <h5 className="text-subtitle tracking-tight">
            Revenue by Service Type
          </h5>
          <p className="text-xs px-2 py-1 border border-black/10 rounded-lg">
            4 services
          </p>
        </div>
        <div className="overflow-x-auto">
          <div className="px-6" style={{ height: "375px", minWidth: "435px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="px-6 pb-6">
          <CustomLegend />
        </div>
      </div>
      <div className="border border-black/10 rounded-lg p-4 lg:p-6 flex flex-col gap-4">
        <h5 className="font-medium text-subtitle">
          Service Performance metrics
        </h5>
        {[1, 2, 3].map((i) => (
          <div key={i} className="">
            <div className="text-primary-700 font-semibold flex gap-8">
              <p>Regular clean</p>
              <p className="font-normal min-w-fit ml-auto">28 bookings</p>
              <p>$4,200</p>
            </div>
            <div className="mt-4 flex gap-3 lg:*:flex-1 justify-between text-center">
              <div>
                <p>Avg Value</p>
                <p className="mt-2 font-semibold">$150</p>
              </div>
              <div>
                <p>% Filtered Revenue</p>
                <p className="mt-2 font-semibold">35.0%</p>
              </div>
              <div>
                <p>Growth</p>
                <p className="mt-2 font-semibold text-success">+5%</p>
              </div>
            </div>
            <hr className="mt-2 text-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
