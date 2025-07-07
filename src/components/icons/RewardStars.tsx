import React from 'react';

export default function RewardStars({ className = "" }: { className?: string; }) {
  return (
    <span className={className}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V1M12 23V22M22 12H23M1 12H2M17 7L20 4M7 7L4 4M7 17L4 20M17 17L20 20M19 12C14.551 13.432 13.085 15.027 12 19C10.916 15.027 9.449 13.432 5 12C9.449 10.568 10.916 8.973 12 5C13.085 8.973 14.551 10.568 19 12Z" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>

  );
}
