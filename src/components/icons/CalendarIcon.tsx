import * as React from "react";

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 16" fill="none" {...props}>
      <path
        d="M13.167 2.667h-1.333V2a.667.667 0 00-1.333 0v.667h-4V2a.667.667 0 00-1.334 0v.667H3.834a2 2 0 00-2 2v8a2 2 0 002 2h9.333a2 2 0 002-2v-8a2 2 0 00-2-2zm.667 10a.667.667 0 01-.667.666H3.834a.667.667 0 01-.667-.666V8h10.667v4.667zm0-6H3.167v-2A.667.667 0 013.834 4h1.333v.667a.667.667 0 001.334 0V4h4v.667a.667.667 0 101.333 0V4h1.333a.667.667 0 01.667.667v2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CalendarIcon;
