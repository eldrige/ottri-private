import { Input } from "@/components/ui/Input";
// import { addOnOptions } from "../../formData";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";
import { ServiceAddOn } from "../../types";

export default function AddOnsStep({
  serviceAddOns
}: {
  serviceAddOns: ServiceAddOn[];
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    clearErrors
  } = useFormContext<OrderFormValues>();

  const selectedAddOns = watch("addOns") || [];
  const otherService = watch("otherService");
  const isOthersSelected = selectedAddOns.some((i) => i.name === "others");

  const handleAddonChange = (
    addOn: (typeof selectedAddOns)[0],
    isChecked: boolean
  ) => {
    let newAddOns = [...selectedAddOns];

    if (isChecked) {
      // Add the addon if it's not already in the array
      if (!newAddOns.some((i) => i.id === addOn.id)) {
        newAddOns.push(addOn);
      }
    } else {
      // Remove the addon if it's in the array
      newAddOns = newAddOns.filter((item) => item.id !== addOn.id);
    }

    setValue("addOns", newAddOns);

    // Clear otherService if "Others" is unchecked
    if (addOn.name === "others" && !isChecked && otherService) {
      setValue("otherService", "");
    }
  };

  return (
    <>
      <h3 className="text-heading-4">Add Extra Service</h3>

      <div className="grid lg:grid-cols-2 gap-4">
        {serviceAddOns?.map((addon) => (
          <label
            key={addon.id}
            className="flex p-4 gap-4 items-center text-caption font-medium border border-black/10 rounded-lg cursor-pointer capitalize"
          >
            <input
              type="checkbox"
              className="accent-secondary-700 size-4"
              checked={selectedAddOns.some((item) => item.id === addon.id)}
              // {...register(`addOns`)}
              onChange={(e) => handleAddonChange(addon, e.target.checked)}
            />
            {addon.name}
            <span className="ml-auto text-primary-700 font-normal">
              +${addon.price}
            </span>
          </label>
        ))}
      </div>

      {/* Only show when option "others" is selected */}
      {isOthersSelected && (
        <div className="mt-4">
          <Input
            label="Specify other service"
            placeholder="Enter text..."
            labelClassName="font-medium text-base"
            error={errors.otherService?.message}
            {...register("otherService")}
            onInput={() => clearErrors("otherService")}
          />
        </div>
      )}
    </>
  );
}
