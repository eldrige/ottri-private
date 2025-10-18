import { ArrowLeft } from "lucide-react";
import ClientForm from "./_components/ClientForm";
import Link from "next/link";
import { axiosInstance } from "@/lib/axios";
import { PreflightType } from "./types";
import { UserData } from "@/lib/types";
import { serverRequest } from "@/lib/serverRequest";
import { Booking } from "@/app/dashboard/_utils/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewOrderPage({
  searchParams
}: {
  searchParams: { bookagain?: string };
}) {
  const bookAgainId = searchParams.bookagain;

  const data = await Promise.all([
    axiosInstance.get("bookings/preflight"),
    serverRequest("auth/profile", "GET").catch((e) => console.log(e)),
    bookAgainId
      ? serverRequest(`bookings/${bookAgainId}`, "GET").catch((e) =>
          console.log(e)
        )
      : Promise.resolve(null)
  ]);

  const preflightData = data[0].data as PreflightType;

  let userData = data[1]?.data as UserData | undefined;
  const bookingData = data[2]?.data as Booking | undefined;

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
      <ClientForm
        preflight={preflightData}
        userData={userData}
        bookingData={bookingData}
      />
    </main>
  );
}
