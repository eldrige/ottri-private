import { Clock, LucideShield, UserCheck } from "lucide-react";
import React from "react";

export default function HowWeWorkSection2() {
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Our Promises to You
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          We stand behind our service with these guarantees
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="container px-6 gap-16 grid grid-cols-1 md:grid-cols-3">
          <QualityCard
            Icon={<LucideShield size={30} className="text-primary-700" />}
            content="Not happy? We'll return within 24 hours to make it right, free of charge."
            title="Satisfaction Guarantee"
          />
          <QualityCard
            Icon={<Clock size={30} className="text-primary-700" />}
            content="Your cleaner will arrive within your selected 2-hour window, or we'll apply a credit to your account."
            title="On-Time Promises"
          />
          <QualityCard
            Icon={<UserCheck size={30} className="text-primary-700" />}
            title="Vetted Professionals"
            content="Every cleaner is background-checked, insured, and trained to our standards before their first assignment."
          />
        </div>
      </div>
    </section>
  );
}

function QualityCard({
  Icon,
  title,
  content
}: {
  Icon: React.JSX.Element;
  title: string;
  content: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center text-center">
      {Icon}
      <h3 className="text-xl text-nowrap font-medium text-secondary-700">
        {title}
      </h3>
      <p className="text-surface-500">{content}</p>
    </div>
  );
}
