import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";
import { HomeIcon, LucideShield } from "lucide-react";
import React from "react";

export default function ServicesDetailsSection4() {
  return (
    <div className=" bg-secondary-700 py-8 md:py-24 flex items-center justify-center mb-24">
      <div className="container px-6 gap-16 grid grid-cols-1 md:grid-cols-3">
        <QualityCard
          Icon={<LucideShield size={35} className="text-primary-700" />}
          content="Not happy? We'll return within 24 hours to make it right, free of charge."
          title="Satisfaction Guarantee"
        />
        <QualityCard
          Icon={<BroomSparkleIcon />}
          content="Not happy? We'll return within 24 hours to make it right, free of charge."
          title="Satisfaction Guarantee"
        />
        <QualityCard
          Icon={<HomeIcon size={35} className="text-primary-700" />}
          title="Insured & Bonded"
          content="Your home and belongings are fully protected during our service."
        />
      </div>
    </div>
  );
}

function QualityCard({
  Icon,
  title,
  content,
}: {
  Icon: React.JSX.Element;
  title: string;
  content: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center text-center">
      {Icon}
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <p className="text-surface-300">{content}</p>
    </div>
  );
}
