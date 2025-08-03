import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";

export default function MyBookingSection1() {
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div>
        <h1 className="fflex items-center gap-2.5 font-semibold text-2xl">
          My Bookings
        </h1>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          Manage your upcoming cleaning appointments
        </h3>
      </div>
      <Button
        className="md:flex hidden text-white gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <PlusIcon />
        Add Booking
      </Button>
    </section>
  );
}
