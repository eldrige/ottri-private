import React, { useState } from "react";
import { AlertTriangle, MapPin } from "lucide-react";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { ServiceArea } from "@/app/admin/types";
import { useDeleteServiceAreaMutation } from "../../_services/mutations";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function ServiceZonesPanel({
  serviceAreas
}: {
  serviceAreas: ServiceArea[];
}) {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {serviceAreas.map((serviceArea, index) => (
        <ZoneCard key={index} serviceArea={serviceArea} />
      ))}
    </div>
  );
}

function ZoneCard({ serviceArea }: { serviceArea: ServiceArea }) {
  const { mutate: deleteSA, isPending: isDeleting } =
    useDeleteServiceAreaMutation();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    deleteSA({ serviceAreaIds: [serviceArea.id] });
  };

  return (
    <div className="border border-black/10 rounded-lg p-4 relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium capitalize">{serviceArea.name}</h4>
          {true ? ( // NOTE: should be dynamic later
            <CheckBrokenIcon className="text-success size-4" />
          ) : (
            <AlertTriangle className="text-primary-700 size-5" />
          )}
        </div>
        <span
          className={`text-sm px-3 py-1 rounded-lg ${
            serviceArea.isActive // NOTE: should be dynamic later
              ? "bg-success/10 text-success"
              : "bg-warning/6 text-warning-text"
          }`}
        >
          {serviceArea.isActive ? "Active" : "Inactive"}{" "}
          {/* // NOTE: should be dynamic later */}
        </span>
      </div>

      <div className="text-xs text-secondary-700/70 mb-4">
        {serviceArea.location.coordinates.length > 60
          ? "Circular Zone"
          : "Custom Area"}
        {/* NOTE: Ignore for now 
        • {serviceArea.areaSqMi} sq mi  */}
      </div>

      {/* NOTE: ignore for now 
      <div className="flex items-start gap-10 mb-4">
        <div>
          <div className="text-xs text-secondary-700/50">Active Bookings</div>
          <div className="mt-1 text-sm">{serviceArea.activeBookings}</div>
        </div>
        <div>
          <div className="text-xs text-secondary-700/50">Total Bookings</div>
          <div className="mt-1 text-sm">{serviceArea.totalBookings}</div>
        </div>
      </div> */}

      {/* NOTE: Ignore for now 
      <div className="mb-4">
        <div className="text-sm mb-2">Zipcodes</div>
        <div className="flex flex-wrap gap-2">
          {serviceArea.zipcodes.map((zipcode, i) => (
            <span
              key={i}
              className="px-4 py-1 rounded-lg text-xs border border-black/10"
            >
              {zipcode}
            </span>
          ))}
        </div>
      </div> */}

      <div className="mb-4">
        <div className="text-sm mb-2">Restrictions</div>
        <ul className="text-xs space-y-2 text-secondary-700/70">
          <li>• Min booking: ${serviceArea.basePrice}</li>
          <li>
            • Services: {serviceArea.services.join(", ") || "All Services"}
          </li>
        </ul>
      </div>

      <div className="flex gap-4 mt-4">
        <button className="text-xs flex items-center gap-1 border border-black/10 rounded-lg px-4 py-2 flex-1 justify-center">
          <MapPin className="size-4" /> View
        </button>
        <button className="text-xs flex items-center gap-1 border border-black/10 rounded-lg px-4 py-2 flex-1 justify-center">
          <EditIcon className="size-4" /> Edit
        </button>
        <button
          className="text-xs flex items-center gap-1 bg-error text-white rounded-lg px-4 py-2 flex-1 justify-center disabled:opacity-50"
          onClick={() => setConfirmDelete(true)}
          disabled={isDeleting}
        >
          <TrashIcon className="size-4" />{" "}
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {confirmDelete && (
        <ConfirmModal
          open={confirmDelete}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            handleDelete();
            setConfirmDelete(false);
          }}
          title="Delete Service Zone"
          description="This action cannot be undone. Are you sure you want to delete this service zone?"
          confirmText="Delete"
          accent="destructive"
        />
      )}
    </div>
  );
}
