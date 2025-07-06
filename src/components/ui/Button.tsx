import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "text-white rounded-lg font-normal hover:bg-transparent transition border disabled:border-transparent not-disabled:cursor-pointer disabled:bg-surface-500/20 disabled:text-white",
  {
    variants: {
      variant: {
        default: "bg-primary-700 hover:text-primary-700 hover:border-primary-700",
        secondary: "bg-secondary-700 hover:text-secondary-700 hover:border-secondary-700",
        destructive: "",
        outline: "",
        ghost: "",
        link: ""
      },
      size: {
        default: "py-4 px-8 text-xl",
        sm: "py-3 px-6",
        xs: "py-2 px-6",
        lg: "py-6 px-10 text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

/**
 * Button component with multiple variants
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };