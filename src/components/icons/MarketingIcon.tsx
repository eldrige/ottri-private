import * as React from "react";

export default function MarketingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 17" fill="none" {...props}>
      <path
        d="M12 12.5c1.472 0 2.666-2.388 2.666-5.334 0-2.945-1.194-5.333-2.666-5.333-1.473 0-2.667 2.388-2.667 5.333 0 2.946 1.194 5.334 2.667 5.334z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 1.833c-2.069 0-6.357 1.585-8.82 2.57a2.96 2.96 0 00-1.847 2.763A2.96 2.96 0 003.18 9.93c2.463.984 6.751 2.57 8.82 2.57m-4.667 2.666l-1.295-.713A3.953 3.953 0 014.03 10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

