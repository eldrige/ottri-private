import { Button } from "@/components/ui/Button";
import { CalendarIcon, LucideProps, StarIcon, Users2Icon } from "lucide-react";
import React from "react";

export default function DashboardSection4() {
  return (
    <section className="mb-4">
      <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
              Quick Actions
            </h3>
            <h3 className="text-caption text-secondary-800">
              Common tasks you might want to do
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      className="p-4 border transition-all ease-in-out duration-300  hover:*:font-semibold hover:bg-secondary-700 hover:text-white border-surface-500/30 rounded-lg flex flex-col justify-center items-center gap-8"
    >
      <Icon />
      <h3 className="text-body">{title}</h3>
    </Button>
  );
}
