import React from "react";

export default function DollarIcon({ className = "text-primary-700" }: { className?: string; }) {
  return (
    <span className={className}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.9877 7.154C16.0387 6.205 14.3687 5.546 12.8337 5.504M12.8337 5.504C11.0077 5.455 9.37269 6.282 9.37269 8.538C9.37269 12.692 16.9877 10.615 16.9877 14.769C16.9877 17.139 14.9607 18.157 12.8337 18.08M12.8337 5.504V3M8.67969 16.154C9.57269 17.344 11.2317 18.022 12.8337 18.08M12.8337 18.08V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
