import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const badgeVariants = cva(
  "text-caption text-white rounded-lg py-1 px-4",
  {
    variants: {
      variant: {
        default: "bg-primary-700",
        secondary: "bg-secondary-700",
        tertiary: "bg-surface-200",
        success: "bg-success",
        error: "bg-error",
        warning: "bg-warning",
        info: "bg-info"
      },
    },
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
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };