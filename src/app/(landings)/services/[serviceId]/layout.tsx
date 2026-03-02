import React from "react";
import ServicesDetailsSection3 from "./_components/ServicesDetailsSection3";
import ServicesDetailsSection4 from "./_components/ServicesDetailsSection4";
import ServicesDetailsSection5 from "./_components/ServicesDetailsSection5";
import { ourProcesses } from "@/lib/sampleData";

export default function ServiceDetailsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="container mx-auto px-6">
        {children}
        <ServicesDetailsSection3 process={ourProcesses} />
      </div>
      <ServicesDetailsSection4 />
      <div className="container mx-auto px-6">
        <ServicesDetailsSection5 />
      </div>
    </main>
  );
}
