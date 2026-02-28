import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-lg px-4 py-3 bg-surface-50 border focus-visible:outline-1 resize-none",
  {
    variants: {
      variant: {
        default: "border-surface-50 focus-visible:outline-surface-500",
        error: "border-error focus-visible:outline-error",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: string;
}

/**
 * Textarea component with multiple variants
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, helperText, error, ...props }, ref) => {
    // If there's an error, force the variant to error
    const inputVariant = error ? "error" : variant;

    return (
      <div className="flex flex-col w-full space-y-2">
        {label && (
          <label className="text-caption" htmlFor={props.id}>
            {label}
          </label>
        )}
        <textarea
          className={cn(textareaVariants({ variant: inputVariant }), className)}
          ref={ref}
          rows={2}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-error">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };