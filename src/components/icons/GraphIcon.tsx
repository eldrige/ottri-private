import * as React from "react";

export default function GraphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 17" fill="none" {...props}>
      <path
        d="M2.667 3.167v9.143a1.524 1.524 0 001.524 1.524h8.762m-8-4.572v2.286M8 6.977v4.57m3.048-6.856v6.857"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
