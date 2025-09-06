import * as React from "react";

function CardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M1.334 8c0-2.514 0-3.771.781-4.552.782-.78 2.038-.781 4.552-.781h2.667c2.514 0 3.771 0 4.552.781.78.781.781 2.038.781 4.552s0 3.771-.781 4.552c-.781.78-2.038.781-4.552.781H6.667c-2.514 0-3.771 0-4.552-.781-.78-.781-.781-2.038-.781-4.552z"
        stroke="currentColor"
      />
      <path
        d="M6.667 10.667H4.001m5.333 0h-1m-7-4h13.333"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default CardIcon;
