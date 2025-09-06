import { serverRequest } from "@/lib/axios";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";

export default async function AdminBookingsPage() {
  const bookings = await serverRequest("bookings", "GET");

  console.log(bookings.data);
  return <ClientAdminBookingsPage />;
}
