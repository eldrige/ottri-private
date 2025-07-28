import { Input } from "@/components/ui/Input";
import { addOnOptions } from "../../formData";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";

export default function AddOnsStep() {
  const {
    register,
    watch,
    setValue,
    // formState: { errors }
  } = useFormContext<OrderFormValues>();
  
  const selectedAddOns = watch('addOns') || [];
  const isOthersSelected = selectedAddOns.includes('others');
  
  const handleAddonChange = (addonId: string, isChecked: boolean) => {
    let newAddOns = [...selectedAddOns];
    
    if (isChecked) {
      // Add the addon if it's not already in the array
      if (!newAddOns.includes(addonId)) {
        newAddOns.push(addonId);
      }
    } else {
      // Remove the addon if it's in the array
      newAddOns = newAddOns.filter(id => id !== addonId);
    }
    
    setValue('addOns', newAddOns);
    
    // Clear otherService if "Others" is unchecked
    if (addonId === 'others' && !isChecked && watch('otherService')) {
      setValue('otherService', '');
    }
  };

  return (
    <>
      <h3 className="text-heading-4">Add Extra Service</h3>

      <div className="grid lg:grid-cols-2 gap-4">
        {addOnOptions.map((addon) => (
          <label
            key={addon.id}
            className="flex p-4 gap-4 items-center text-caption font-medium border border-black/10 rounded-lg cursor-pointer"
          >
            <input 
              type="checkbox" 
              className="accent-secondary-700 size-4" 
              checked={selectedAddOns.includes(addon.id)}
              {...register(`addOns`)}
              value={addon.id}
              onChange={(e) => handleAddonChange(addon.id, e.target.checked)}
            />
            {addon.name}
            <span className="ml-auto text-primary-700 font-normal">+${addon.price}</span>
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
            {...register("otherService")}
          />
        </div>
      )}
    </>
  );
}
