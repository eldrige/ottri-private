"use client";
import React, { useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // Import icons for password visibility

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
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  labelClassName?: string;
  icon?: React.ReactNode; // Add icon prop
}

/**
 * Input component with multiple variants
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, label, error, labelClassName, icon, ...props },
    ref
  ) => {
    // If there's an error, force the variant to error
    const inputVariant = error ? "error" : variant;

    const [showPassword, setShowPassword] = useState(false);

    const isPasswordInput = props.type === "password";

    // Determine the actual input type based on the password visibility
    const inputType = isPasswordInput
      ? showPassword
        ? "text"
        : "password"
      : props.type;

    return (
      <div className="flex flex-col w-full space-y-2">
        {label && (
          <label className={cn("text-sm", labelClassName)} htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </span>
          )}
          <input
            className={cn(
              inputVariants({ variant: inputVariant }),
              icon ? "pl-10" : "",
              className
            )}
            ref={ref}
            {...props}
            type={inputType}
          />
          {isPasswordInput && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
