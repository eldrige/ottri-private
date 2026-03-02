import Image from "next/image";
import figure from "@/assets/about-section5-figure.png";
import figureMobile from "@/assets/about-section5-figureMobile.png";
import BadgeIcon from "@/components/icons/BadgeIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import UsersIcon from "@/components/icons/UsersIcon";

export default function AboutSection5() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center py-8 lg:py-24 gap-y-8">
      <div>
        <h2 className="text-heading-3 lg:text-heading-2 text-center lg:text-start text-secondary-700">
          Our Mission
        </h2>
        <p className="lg:text-subtitle text-surface-500 mt-4 tracking-wide">
          To transform the way people experience home cleaning services by
          creating a platform that prioritizes trust, convenience, and community
          impact.
        </p>

        <ul className="mt-6 space-y-6">
          <li className="flex items-start gap-6">
            <BadgeIcon className="*:size-8 text-primary-700" />
            <div className="space-y-2">
              <h4 className="text-subtitle font-semibold text-secondary-700">
                Quality Assurance
              </h4>
              <p className="tracking-wide text-surface-500">
                Every cleaner undergoes comprehensive training and regular
                quality assessments.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <ClockIcon className="size-8 text-primary-700" />
            <div className="space-y-2">
              <h4 className="text-subtitle font-semibold text-secondary-700">
                Time Respect
              </h4>
              <p className="tracking-wide text-surface-500">
                We value your time with punctual service and efficient booking
                systems.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <UsersIcon className="*:size-8 text-primary-700" />
            <div className="space-y-2">
              <h4 className="text-subtitle font-semibold text-secondary-700">
                Community Support
              </h4>
              <p className="tracking-wide text-surface-500">
                We create meaningful employment opportunities and support local
                families.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="lg:pl-8">
        <Image
          className="hidden lg:block"
          src={figure}
          alt="Person cleaning countertop"
        />
        <Image
          className="lg:hidden scale-115"
          src={figureMobile}
          alt="Person cleaning countertop"
        />
      </div>
    </section>
  );
}
