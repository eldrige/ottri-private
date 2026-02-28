import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const badgeVariants = cva(
  "text-caption text-white rounded-lg py-1 px-4 border",
  {
    variants: {
      variant: {
        default: "bg-primary-700 border-primary-700",
        secondary: "bg-secondary-700 border-secondary-700",
        tertiary: "bg-surface-200 border-surface-200",
        success: "bg-success border-success",
        error: "bg-error border-error",
        warning: "bg-warning border-warning",
        info: "bg-info border-info"
      },
      mode: {
        outline: "bg-[#FFF2E6]"
      },
      size: {
        base: "text-base",
        sm: "text-sm"
      }
    },
    compoundVariants: [
      {
        variant: "default",
        mode: "outline",
        className: "text-primary-700"
      }
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component with multiple variants
 */

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, mode, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, mode }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };