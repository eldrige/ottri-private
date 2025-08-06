import ClockIcon from "@/components/icons/ClockIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import Map from "./Map";

export default function LandingSection7() {
  const locations: { title: string; subtitle: string; popular?: boolean }[] = [
    { title: "Downtown", subtitle: "24 available this week", popular: true },
    { title: "Suburban Hills", subtitle: "18 available this week" },
    { title: "Riverside", subtitle: "12 available this week", popular: true },
    { title: "Westside", subtitle: "27 available this week" },
    { title: "North Valley", subtitle: "15 available this week" }
  ];

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";

  return (
    <section className="pt-24 pb-8 lg:py-24 grid lg:grid-cols-2 gap-y-16">
      <div className="lg:pr-8 flex items-center">
        <div className="w-full shadow-custom text-center p-6 md:p-9 rounded-2xl">
          <h3 className="text-surface-500 text-heading-5">Live Service Map</h3>
          <p className="text-surface-500 mt-2 tracking-wide">
            Real-time availability across all service areas
          </p>
          <div className="w-full aspect-[9/16] sm:aspect-square mt-8 flex items-center justify-center outline-2 outline-primary-700 outline-dashed outline-offset-2 rounded-lg">
            <Map apiKey={apiKey} />
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-heading-3 md:text-heading-2.5 text-center lg:text-start">
          We Clean Here!
        </h2>
        <p className="text-surface-500 mt-4 tracking-wide">
          Serving your neighborhood with same-day booking and flexible
          scheduling. See real-time availability in your area.
        </p>

        <ul className="space-y-4 mt-8">
          {locations.map((location) => (
            <li
              key={location.title}
              className="py-3 md:py-3.5 px-3 border border-surface-500/10 rounded-lg flex items-center gap-4"
            >
              <span className="text-primary-700 hidden md:block">
                <LocationIcon />
              </span>
              <div>
                <p className="text-subtitle text-secondary-700 flex items-start gap-4">
                  {location.title}
                  {location.popular && (
                    <span className="text-tiny text-primary-700 py-0.5 px-3 bg-primary-100 rounded-lg">
                      Popular
                    </span>
                  )}
                </p>
                <p className="mt-1 flex gap-2 text-caption text-surface-500">
                  <ClockIcon className="w-4 *:w-full *:h-full" />
                  {location.subtitle}
                </p>
              </div>
              <button className="ml-auto md:px-6 py-3 font-medium text-primary-700 min-w-fit">
                Book now
              </button>
            </li>
          ))}
        </ul>

        <div className="flex p-4 gap-4 items-start mt-8">
          <div className="hidden md:block p-3 bg-primary-700 text-white rounded-full">
            <LocationIcon />
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-subtitle text-secondary-700">
              Don&apos;t see your area?
            </p>
            <p className="text-surface-500 tracking-wide">
              We&apos;re rapidly expanding! Let us know where you&apos;d like
              Ottri service and we&apos;ll notify you when we arrive in your
              neighborhood.
            </p>
            <div className="flex *:flex-1 gap-4 flex-wrap *:min-w-fit">
              <Button size="xs">Request a service</Button>
              <Button size="xs" variant="default-outline">
                Call (702) 555-0122
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
