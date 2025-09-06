import * as React from "react";

function CheckCircleBroken(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <g
        clipPath="url(#prefix__clip0_181_2201)"
        stroke="currentColor"
        strokeLinecap="round"
      >
        <path d="M4.25 6.25l1 1 2.5-2.5" strokeLinejoin="round" />
        <path d="M3.5 1.669A5 5 0 111.669 3.5" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_181_2201">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CheckCircleBroken;
