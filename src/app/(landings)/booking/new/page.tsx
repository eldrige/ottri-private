import { ArrowLeft } from "lucide-react";
import ClientForm from "./_components/ClientForm";
import Link from "next/link";
import { axios } from "@/lib/axios";
import { PreflightType } from "./types";

export default async function NewOrderPage() {
  console.log("start fetching preflight");
  const preflightData = (await axios.get("bookings/preflight"))
    .data as PreflightType;
  console.log("finish fetching preflight");

  return (
    <main className="container max-w-5xl mx-auto px-6 mt-2.5 py-8 text-secondary-700">
      <Link
        className="text-primary-700 text-subtitle flex gap-4"
        href="/services"
      >
        <ArrowLeft />
        Back to all services
      </Link>
      <ClientForm preflight={preflightData} />
    </main>
  );
}
