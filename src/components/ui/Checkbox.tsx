import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React, { InputHTMLAttributes, forwardRef, useId } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  accent?: "primary" | "secondary";
  labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      accent = "primary",
      className = "",
      labelClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID for the checkbox if not provided
    const customId = useId();
    const checkboxId = id || customId;

    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            // border border-gray-300
            className={`
              appearance-none
              h-5 w-5
              bg-secondary-700/10
              rounded
              ${
                accent === "primary"
                  ? "checked:bg-primary-700 checked:border-primary-700 focus:ring-primary-700/50"
                  : "checked:bg-secondary-700 checked:border-secondary-700 focus:ring-secondary-700/50"
              }
              focus:outline-none focus:ring-2 
              transition-all duration-200
              cursor-pointer
              peer
              ${className}
            `}
            {...props}
          />
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center text-white transition-opacity opacity-0 peer-checked:opacity-100">
            <CheckIcon className="size-4 text-white" />
          </div>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              `ml-2 text-sm text-surface-500 cursor-pointer`,
              labelClassName
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
