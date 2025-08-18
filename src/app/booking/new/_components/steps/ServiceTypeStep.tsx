"use client";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
// import { serviceTypes, specificTypes } from "../../formData";
import { ServiceType } from "../../types";
import { Building2, HomeIcon, Shield, Trees } from "lucide-react";
import React from "react";
import { OrderFormValues } from "../../schema";
import Select from "@/components/ui/Select";

const iconsObj: Record<string, React.ReactNode> = {
  "residential cleaning": <HomeIcon />,
  "commercial cleaning": <Building2 />,
  "outdoor cleaning": <Trees />,
  "specialized services": <Shield />
};

const frequencies = [
  { label: "Monthly (Save 10%)", value: "monthly" },
  { label: "Bi-weekly (Save 15%)", value: "bi-weekly" },
  { label: "Weekly (Save 10%)", value: "weekly" }
];

export default function ServiceTypeStep({
  services
}: {
  services: ServiceType[];
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormValues>();
  const selectedService = watch("serviceType");
  const selectedSpecificType = watch("specificServiceType");

  return (
    <>
      <h3 className="text-heading-4">Choose your Service</h3>

      <div className="grid lg:grid-cols-2 gap-4 font-medium">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => {
              setValue("serviceType", service, { shouldValidate: true });
            }}
            className={cn(
              "flex items-center gap-4  px-4 border rounded-lg cursor-pointer transition-all py-3 capitalize",
              selectedService?.id === service.id
                ? "border-primary-700 bg-primary-700/5"
                : "border-black/10 hover:border-primary-700/50"
            )}
          >
            {/* <service.Icon className="text-primary-700 size-6" /> */}
            <span className="text-primary-700 size-6">
              {iconsObj[service.name]}
            </span>
            {service.name}
          </button>
        ))}
      </div>
      {errors.serviceType && (
        <p className="text-xs text-error">
          {errors.serviceType.message as string}
        </p>
      )}

      {/* Hidden input for react-hook-form to track the selection */}
      <input
        type="hidden"
        {...register("serviceType", {
          required: "Please select a service type"
        })}
      />

      {selectedService && (
        <>
          <hr className="text-surface-500/10" />

          <h3 className="text-heading-4 mt-6">Select Specific Type</h3>

          <div className="flex flex-col space-y-4">
            {selectedService.serviceTypes.map((type) => (
              <button
                type="button"
                onClick={() =>
                  setValue("specificServiceType", type, {
                    shouldValidate: true
                  })
                }
                className={cn(
                  "flex items-center gap-4 py-3 px-4 border rounded-lg cursor-pointer transition-colors",
                  selectedSpecificType?.id === type.id
                    ? "border-primary-700"
                    : "border-black/10 hover:border-primary-700/50"
                )}
                key={type.id}
              >
                <div className="flex-1 text-start">
                  <p className="font-medium capitalize">{type.name}</p>
                  <p className="text-caption text-surface-500 mt-2">
                    {/* {type.subtitle} */}
                    {type.description}
                  </p>
                </div>
                <Badge size="sm" variant="secondary">
                  From ${type.basePrice}
                </Badge>
              </button>
            ))}
          </div>
          {errors.specificServiceType && (
            <p className="text-xs text-error">
              {errors.specificServiceType.message as string}
            </p>
          )}

          {/* Hidden input for react-hook-form to track the specific type selection */}
          <input
            type="hidden"
            {...register("specificServiceType", {
              required: "Please select a specific cleaning type"
            })}
          />

          <hr className="text-surface-500/10" />

          <Select
            label="Cleaning frequency"
            options={frequencies}
            value={frequencies[0]}
            buttonClassName="border-0 text-secondary-700/70"
          />
        </>
      )}
    </>
  );
}
