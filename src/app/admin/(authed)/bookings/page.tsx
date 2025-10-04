import { Suspense } from "react";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";

export default async function AdminBookingsPage() {
  return (
    <Suspense>
      <ClientAdminBookingsPage />
    </Suspense>
  );
}
