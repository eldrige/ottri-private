import React from "react";
import BillingSection1 from "./_components/BillingSection1";
import BillingSection2 from "./_components/BillingSection2";
import BillingSection3 from "./_components/BillingSection3";
import BillingSection4 from "./_components/BillingSection4";

export default function BillingPage() {
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <BillingSection1 />
      <BillingSection2 />
      <BillingSection3 />
      <BillingSection4 />
    </div>
  );
}
