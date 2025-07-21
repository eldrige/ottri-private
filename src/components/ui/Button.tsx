import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "text-white rounded-lg font-normal hover:bg-transparent transition border disabled:border-transparent cursor-pointer disabled:cursor-default disabled:bg-surface-500/20 disabled:text-white",
  {
    variants: {
      variant: {
        default: "bg-primary-700 hover:text-primary-700 hover:border-primary-700",
        secondary: "bg-secondary-700 hover:text-secondary-700 hover:border-secondary-700",
        destructive: "",
        outline: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        "default-outline": "text-primary-700 border-primary-700",
        "secondary-outline": "text-secondary-700 border-secondary-700",
        ghost: "text-secondary-700 border-transparent hover:bg-surface-200",
        link: ""
      },
      size: {
        default: "py-4 px-8 text-xl",
        sm: "py-3 px-6",
        xs: "py-2 px-6",
        lg: "py-6 px-10 text-2xl",
        icon: "p-2 w-10 h-10",
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