import * as React from "react";

function ClockIcon2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M9.546 10.135L8 8.59V5.498M13.411 14l-1.546-1.546m-7.73 0L2.59 14m9.663-12l1.546 1.546M3.749 2L2.203 3.546"
        stroke="currentcolor"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M8 14A5.411 5.411 0 108 3.177 5.411 5.411 0 008 14z"
        stroke="currentcolor"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ClockIcon2;
