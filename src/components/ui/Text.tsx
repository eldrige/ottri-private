// import { cva } from "class-variance-authority";
import { ComponentProps } from "react";

// const textStyles = cva("w-full", {
//   variants: {
//     size: {
//       xs: "text-xs",
//       sm: "text-sm",
//       base: "text-base",
//       lg: "text-lg",
//       xl: "text-xl",
//       "5xl": "text-6xl"
//     },
//     weight: {
//       normal: "font-normal",
//       semibold: "font-semibold",
//     }
//   },
//   defaultVariants: {
//     size: "base",
//     weight: "normal"
//   }
// })

type TextProps = ComponentProps<"span">;

export const Text = ({ ...props }: TextProps) => {
  return <span {...props} />;
};
