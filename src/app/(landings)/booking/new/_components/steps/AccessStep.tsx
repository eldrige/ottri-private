import { Textarea } from "@/components/ui/Textarea";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../schema";
import { accessOptions } from "../../formData";
import { cn } from "@/lib/utils";

export default function AccessStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormValues>();

  const selectedPetType = watch("accessMethod");
  const showAccessInstructions = selectedPetType && selectedPetType !== "home";

  return (
    <>
      <h3 className="text-heading-4">How Should We Enter</h3>

      <div className="flex flex-col gap-2 text-caption">
        {accessOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              setValue("accessMethod", option.id, { shouldValidate: true })
            }
            className={cn(
              "py-1 px-2 rounded text-start cursor-pointer",
              selectedPetType === option.id
                ? "bg-primary-700 text-white border-primary-700"
                : "border-black/10 hover:border-primary-700/50"
            )}
          >
            {option.name}
          </button>
        ))}
      </div>

      {/* Hidden field for form validation */}
      <input type="hidden" {...register("accessMethod")} />

      {showAccessInstructions && (
        <div className="mt-6">
          <Textarea
            label="Entry instructions"
            placeholder="Provide detailed instructions"
            {...register("accessInstructions")}
            rows={2}
          />
          {errors.accessInstructions && (
            <p className="text-xs text-error mt-1">
              {errors.accessInstructions.message as string}
            </p>
          )}
        </div>
      )}
    </>
  );
}
