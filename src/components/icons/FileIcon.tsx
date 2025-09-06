import * as React from "react";

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" {...props}>
      <path
        d="M14.688 2.753V6.35a1.84 1.84 0 001.845 1.84h4.125"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.147 7.647h3.265M8.147 12h8.706m-8.706 4.353h8.706m3.897-7.785v8.568a4.25 4.25 0 01-1.362 2.97 4.282 4.282 0 01-3.072 1.14h-7.59a4.298 4.298 0 01-3.1-1.124 4.26 4.26 0 01-1.376-2.986V6.862a4.25 4.25 0 011.362-2.97 4.28 4.28 0 013.072-1.14h5.714a3.5 3.5 0 012.361.905l2.96 2.722a2.969 2.969 0 011.031 2.189z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { FileIcon };
