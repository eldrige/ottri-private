import { Cleaner } from "@/app/admin/types";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import React from "react";
import CleanerProfile from "./_components/CleanerProfile";
import { ArrowLeftIcon } from "lucide-react";

async function ServicesDetailsPage({
  params
}: {
  params: Promise<{ cleanerId: string }>;
}) {
  const { cleanerId } = await params;

  const cleaner = (await axiosInstance(`/cleaners/${cleanerId}/profile`))
    .data as Cleaner;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <Link
          href={"/our-team"}
          className="text-lg text-primary-700 flex items-center gap-4"
        >
          <ArrowLeftIcon className="size-6" />
          Back to Our Team
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-16">
        <CleanerProfile cleaner={cleaner} />
        <div></div>
      </div>
    </div>
  );
}

export default ServicesDetailsPage;
