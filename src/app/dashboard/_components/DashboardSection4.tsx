import { Button } from "@/components/ui/Button";
import { CalendarIcon, LucideProps, StarIcon, Users2Icon } from "lucide-react";
import React from "react";

export default function DashboardSection4() {
  return (
    <section className="mb-4">
      <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col gap-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="flex items-center gap-2.5 font-semibold text-lg">
              Quick Actions
            </h1>
            <h3 className="text-[14px] text-secondary-800">
              Common tasks you might want to do
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <QuickActionCard
            title={"Book Regular Cleaning"}
            Icon={CalendarIcon}
          />
          <QuickActionCard title={"One-Time Deep clean"} Icon={StarIcon} />
          <QuickActionCard title={"Regular Cleaning"} Icon={Users2Icon} />
        </div>
      </div>
    </section>
  );
}

type QuickActionCardProps = {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
function QuickActionCard({ title, Icon }: QuickActionCardProps) {
  return (
    <Button
      variant={"outline"}
      className="p-4 border hover:bg-secondary-900 hover:text-white border-surface-500/30 rounded-lg flex flex-col justify-center items-center gap-8"
    >
      <Icon />
      <h3>{title}</h3>
    </Button>
  );
}
