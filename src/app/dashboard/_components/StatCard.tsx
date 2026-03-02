import React, { ComponentType } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  content: string;
  Icon?: ComponentType<{ className?: string }>;
};

export default function StatCard({
  title,
  value,
  content,
  Icon
}: StatCardProps) {
  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col justify-between gap-8">
      <div className="flex items-center text-caption justify-between w-full">
        <h3 className="text-secondary-700">{title}</h3>
        {Icon && <Icon className="text-primary-700 w-6" />}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="flex font-poppins items-center gap-2.5 font-medium text-2xl text-secondary-700">
          {value}
        </h3>
        <p className="text-caption text-surface-500">{content}</p>
      </div>
    </div>
  );
}
