import * as React from "react";

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6.366 13.833a1.134 1.134 0 100-2.268 1.134 1.134 0 000 2.268zM11.307 13.833a1.134 1.134 0 100-2.268 1.134 1.134 0 000 2.268zM3.738 3.703l1.34 4.243c.206.652.308.978.506 1.22.174.213.4.377.655.48.29.114.631.114 1.315.114h2.57c.684 0 1.026 0 1.315-.115.256-.102.481-.266.655-.48.198-.241.3-.567.507-1.22l.273-.863.16-.51.22-.7a1.666 1.666 0 00-1.589-2.169H3.738zm0 0L3.73 3.68a4.672 4.672 0 00-.093-.28 1.947 1.947 0 00-1.675-1.227c-.068-.006-.144-.006-.295-.006"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CartIcon;
