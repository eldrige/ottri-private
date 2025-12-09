import Map from "@/app/(landings)/_components/Map";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";
import React, { useMemo, useState } from "react";
import { useMapBookingsQuery } from "../../_services/queries";
import ErrorComponent from "@/app/_components/ErrorComponent";
import { Loader2 } from "lucide-react";
import BookingDetails from "../_components/BookingDetails";

export default function MapView() {
  const statusFilter = useClientSearchParams().searchParams.get("status") || "";
  const mapBookings = useMapBookingsQuery({ statusFilter });
  const bookingsResponse = mapBookings.data;

  const [showDetails, setShowDetails] = useState<number | null>(null);

  const bookings = bookingsResponse?.data;

  const locations = useMemo(
    () =>
      bookings
        ?.filter((b) => b.location)
        .map((b) => ({
          id: b.id,
          title:
            b.guest?.fullName || b.user?.personalInformation?.fullName || "",
          status: b.status,
          position: {
            lat: b.location!.coordinates[0],
            lng: b.location!.coordinates[1]
          }
        })),
    [bookings]
  );

  if (mapBookings.error)
    return (
      <ErrorComponent error={mapBookings.error} reset={mapBookings.refetch} />
    );

  if (!bookingsResponse)
    return <Loader2 className="animate-spin size-6 mx-auto my-8" />;

  return (
    <div className="mt-4 lg:mt-8 p-4 lg:p-6 border border-black/10 rounded-lg">
      <h4 className="text-heading-5 text-center lg:text-start">
        Map View with Real-Time Status
      </h4>

      <div className="w-full h-[540px] mt-4 lg:mt-8 flex items-center justify-center outline-2 outline-primary-700 outline-dashed outline-offset-2 rounded-lg">
        <Map locations={locations} onMarkerClick={(id) => setShowDetails(id)} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-8">
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-warning" />
          Pending
        </p>
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-info-text" />
          In progress
        </p>
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-success" />
          Completed
        </p>
        <p className="text-subtitle font-medium">
          <span className="mr-2 rounded-full w-3 h-3 inline-block bg-error" />
          Cancelled
        </p>
      </div>
      {showDetails && (
        <BookingDetails
          bookingId={showDetails}
          onClose={() => setShowDetails(null)}
        />
      )}
    </div>
  );
}
