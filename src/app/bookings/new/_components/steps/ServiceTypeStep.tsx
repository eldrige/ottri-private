"use client";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { serviceTypes, specificTypes } from "../../formData";

export default function ServiceTypeStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedService = watch("serviceType");
  const selectedSpecificType = watch("specificType");

  return (
    <>
      <h3 className="text-heading-4">Choose your Service</h3>

      <div className="grid lg:grid-cols-2 gap-4 font-medium">
        {serviceTypes.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => {
              setValue("serviceType", service.id, { shouldValidate: true });
            }}
            className={cn(
              "flex items-center gap-4  px-4 border rounded-lg cursor-pointer transition-all py-3",
              selectedService === service.id
                ? "border-primary-700 bg-primary-700/5"
                : "border-black/10 hover:border-primary-700/50",
            )}
          >
            <service.Icon className="text-primary-700 size-6" />{" "}
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
          required: "Please select a service type",
        })}
      />

      {selectedService && (
        <>


          <h3 className="text-heading-4 mt-6">Select Specific Type</h3>

          <div className="flex flex-col space-y-4">
            {specificTypes.map((type) => (
              <button
                type="button"
                onClick={() => setValue("specificType", type.id, { shouldValidate: true })}
                className={cn(
                  "flex items-center gap-4 py-3 px-4 border rounded-lg cursor-pointer transition-colors",
                  selectedSpecificType === type.id
                    ? "border-primary-700"
                    : "border-black/10 hover:border-primary-700/50"
                )}
                key={type.id}
              >
                <div className="flex-1 text-start">
                  <p className="font-medium">{type.name}</p>
                  <p className="text-caption text-surface-500 mt-2">
                    {type.subtitle}
                  </p>
                </div>
                <Badge size="sm" variant="secondary">
                  From ${type.priceFrom}
                </Badge>
              </button>
            ))}
          </div>
          {errors.specificType && (
            <p className="text-xs text-error">
              {errors.specificType.message as string}
            </p>
          )}

          {/* Hidden input for react-hook-form to track the specific type selection */}
          <input
            type="hidden"
            {...register("specificType", {
              required: "Please select a specific cleaning type",
            })}
          />
        </>
      )}
    </>
  );
}