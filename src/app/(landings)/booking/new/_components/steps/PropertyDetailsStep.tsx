import Select from "@/components/ui/Select";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";
import {
  bedroomOptions,
  bathroomOptions,
  squareFootageOptions
} from "../../formData";
import AddressInput from "../AddressInput";
import { useEffect, useState } from "react";
import { clientAxios } from "@/lib/axios";

export default function PropertyDetailsStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useFormContext<OrderFormValues>();

  const [isValidating, setIsValidating] = useState(false);

  const selectedBedrooms = watch("bedrooms");
  const selectedBathrooms = watch("bathrooms");
  const selectedSquareFootage = watch("squareFootage");
  const serviceAddress = watch("serviceAddress");
  const useSameForBilling = watch("useSameForBilling");
  const lng = watch("lng");
  const lat = watch("lat");
  const isServiceAreaValid = watch("isServiceAreaValid");

  useEffect(() => {
    async function isAreaValid() {
      if (!lat || !lng) return;

      setIsValidating(true);
      try {
        const res = await clientAxios.get(`service-areas/${lng}/${lat}`);
        const isValid = res.data.length > 0;
        setValue("isServiceAreaValid", isValid);

        if (!isValid) {
          setError("serviceAddress", {
            type: "manual",
            message: "Sorry, we don't service this area yet."
          });
        } else {
          clearErrors("serviceAddress");
        }
      } catch (error) {
        console.error("Error validating service area:", error);
        setValue("isServiceAreaValid", false);
        setError("serviceAddress", {
          type: "manual",
          message: "Error validating service area. Please try again."
        });
      } finally {
        setIsValidating(false);
      }
    }

    if (lat && lng) {
      isAreaValid();
    }
  }, [lng, lat, setError, clearErrors, setValue]);

  const handleSelectBedrooms = (option: { value: string; label: string }) => {
    setValue("bedrooms", option.value, { shouldValidate: true });
  };

  const handleSelectBathrooms = (option: { value: string; label: string }) => {
    setValue("bathrooms", option.value, { shouldValidate: true });
  };

  const handleSelectSquareFootage = (option: {
    value: string;
    label: string;
  }) => {
    setValue("squareFootage", option.value, { shouldValidate: true });
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-heading-4">Property Details</h3>
        <p className="text-surface-500">
          Tell us about your home so we can provide accurate pricing.
        </p>
      </div>
      <div className="p-4 space-y-2 rounded-2xl border-2 border-primary-200">
        <h4 className="text-heading-5 ">Service Address*</h4>
        <AddressInput
          value={serviceAddress}
          onChange={(fAddress, result) => {
            if (fAddress) {
              setValue("serviceAddress", fAddress, { shouldValidate: true });
              if (useSameForBilling) setValue("billingAddress", fAddress);
            } else {
              setValue("serviceAddress", "");
              if (useSameForBilling) setValue("billingAddress", "");
            }
            // Set coords
            if (result) {
              setValue("lng", result.lon);
              setValue("lat", result.lat);
            } else {
              setValue("lng", null);
              setValue("lat", null);
            }
          }}
          placeholder="Start typing your address"
          error={errors.serviceAddress?.message}
          required
          onSelectedAddress={(address) => {
            if (address) {
              setValue("country", address.country);
              setValue("state", address.state);
              setValue("city", address.city);
              if (address.postcode) setValue("zipCode", address.postcode);
            } else {
              setValue("country", "");
              setValue("state", "");
              setValue("city", "");
              setValue("zipCode", "");
            }
          }}
        />
        {isValidating && (
          <p className="text-warning-600 flex items-center gap-1 text-sm">
            <span className="animate-spin">⟳</span> Validating service area...
          </p>
        )}
        {!isValidating && isServiceAreaValid === true && (
          <p className="text-success-600 flex items-center gap-1 text-sm">
            ✓ Address is in our service area
          </p>
        )}
        <p className="text-surface-500">
          This is where our team will provide the cleaning service
        </p>
      </div>
      <label className="flex gap-2 items-center text-caption font-medium">
        <input
          type="checkbox"
          className="accent-secondary-700 size-4"
          {...register("useSameForBilling")}
          onChange={(e) => {
            setValue("billingAddress", e.target.checked ? serviceAddress : "");
          }}
        />
        Use this address for billing address
      </label>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Select
            label="Bedrooms"
            options={bedroomOptions}
            placeholder="Select bedrooms"
            value={
              selectedBedrooms
                ? bedroomOptions.find((opt) => opt.value === selectedBedrooms)
                : undefined
            }
            onChange={handleSelectBedrooms}
            error={errors.bedrooms?.message}
          />
        </div>
        <div>
          <Select
            label="Bathrooms"
            options={bathroomOptions}
            placeholder="Select bathrooms"
            value={
              selectedBathrooms
                ? bathroomOptions.find((opt) => opt.value === selectedBathrooms)
                : undefined
            }
            onChange={handleSelectBathrooms}
            error={errors.bathrooms?.message}
          />
        </div>
      </div>
      <div>
        <Select
          label="Approximate Square Footage"
          options={squareFootageOptions}
          placeholder="Select square footage"
          value={
            selectedSquareFootage
              ? squareFootageOptions.find(
                  (opt) => opt.value === selectedSquareFootage
                )
              : undefined
          }
          onChange={handleSelectSquareFootage}
          error={errors.squareFootage?.message}
        />
      </div>
    </>
  );
}
