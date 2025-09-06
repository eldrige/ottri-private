import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg px-4 py-3 bg-surface-50 border focus-visible:outline-1",
  {
    variants: {
      variant: {
        default: "border-surface-50 focus-visible:outline-surface-500",
        error: "border-error focus-visible:outline-error"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  labelClassName?: string;
}

/**
 * Input component with multiple variants
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, error, labelClassName, ...props }, ref) => {
    // If there's an error, force the variant to error
    const inputVariant = error ? "error" : variant;

    return (
      <div className="flex flex-col w-full space-y-2">
        {label && (
          <label className={cn("text-sm", labelClassName)} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ variant: inputVariant }), className)}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
