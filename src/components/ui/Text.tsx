import { ComponentProps } from "react";


type TextProps = ComponentProps<"span">

export const Text = ({...props}: TextProps) => {
  return (
    <span {...props} />
  )
}
