import { BadgeIcon, ClockIcon, PhoneIcon, StarIcon } from "lucide-react";
import React from "react";

export default function OurTeamSection2() {
  return (
    <section className="py-8 px-6 my-8 md:my-24 bg-secondary-700 lg:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 text-white md:text-heading-2 font-semibold">
          Our Hiring Standards
        </h2>
        <p className="text-subtitle text-surface-300 text-base max-w-6xl mx-auto">
          Every team member meets our rigorous requirements
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="container px-6 gap-8 md:gap-16 grid grid-cols-1 lg:grid-cols-4">
          <QualityCard
            Icon={<BadgeIcon size={30} className="text-primary-700" />}
            title="Background Checked"
            content="Comprehensive criminal background verification for all team members."
          />
          <QualityCard
            Icon={<StarIcon size={30} className="text-primary-700" />}
            title="Highly Rated"
            content="Only professionals with proven track records and excellent reviews."
          />
          <QualityCard
            Icon={<ClockIcon size={30} className="text-primary-700" />}
            title="Experienced"
            content="Minimum 2 years professional cleaning experience required."
          />
          <QualityCard
            Icon={<PhoneIcon size={30} className="text-primary-700" />}
            title="Reference Verified"
            content="Multiple professional references checked and verified."
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
      <h3 className="text-xl text-nowrap font-medium text-white">{title}</h3>
      <p className="text-surface-300">{content}</p>
    </div>
  );
}
