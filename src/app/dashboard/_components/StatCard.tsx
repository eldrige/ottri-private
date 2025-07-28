import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

type StatCardProps = {
  title: string;
  value: string;
  content: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export default function StatCard({
  title,
  value,
  content,
  Icon,
}: StatCardProps) {
  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col justify-between gap-8">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-secondary-700">{title}</h3>
        <Icon className="text-primary-700" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-heading-4">{value}</h1>
        <p className="text-base text-surface-500">{content}</p>
      </div>
    </div>
  );
}
