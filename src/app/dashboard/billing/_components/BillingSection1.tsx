import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function BillingSection1() {
  return (
    <section className="flex w-fit md:w-full flex-col md:flex-row items-baseline gap-4 lg:mb-1 md:items-center justify-between py-5.25 border-b border-secondary-800/25 ">
      <div>
        <h3 className="flex font-poppins items-center gap-2.5 font-medium text-2xl text-secondary-700">
          Billing & Payments
        </h3>
        <h3 className="text-secondary-800 text-body font-normal text-wrap">
          Manage your payments and view transaction history
        </h3>
      </div>
      <Button
        className="md:flex hidden text-body text-white gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <PlusIcon />
        Add Booking
      </Button>
    </section>
  );
}
