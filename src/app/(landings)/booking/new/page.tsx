import { ArrowLeft } from "lucide-react";
import ClientForm from "./_components/ClientForm";
import Link from "next/link";
import { axios, serverRequest } from "@/lib/axios";
import { PreflightType } from "./types";
import { UserData } from "@/lib/types";

export default async function NewOrderPage() {
  const data = await Promise.all([
    axios.get("bookings/preflight"),
    serverRequest("auth/profile", "GET").catch((e) => console.log(e))
  ]);

  const preflightData = data[0].data as PreflightType;

  let userData = data[1]?.data as UserData | undefined;

  if (userData?.role !== "USER") {
    userData = undefined;
  }

  return (
    <main className="container max-w-5xl mx-auto px-6 mt-2.5 py-8 text-secondary-700">
      <Link
        className="text-primary-700 text-subtitle flex gap-4"
        href="/services"
      >
        <ArrowLeft />
        Back to all services
      </Link>
      <ClientForm preflight={preflightData} userData={userData} />
    </main>
  );
}
