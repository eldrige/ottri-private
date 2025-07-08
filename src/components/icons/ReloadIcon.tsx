import React from 'react';

export default function ReloadIcon({ className = "" }: { className?: string; }) {
  return (
    <span className={className}>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5996 13.041C20.4107 14.481 19.8335 15.8424 18.9297 16.9792C18.026 18.116 16.8298 18.9854 15.4695 19.4941C14.1092 20.0027 12.6361 20.1315 11.2082 19.8666C9.7803 19.6017 8.45143 18.9531 7.36412 17.9904C6.27681 17.0276 5.47208 15.787 5.03624 14.4017C4.6004 13.0164 4.54988 11.5385 4.89012 10.1266C5.23035 8.71476 5.9485 7.42214 6.96754 6.3874C7.98658 5.35266 9.26807 4.61483 10.6746 4.25304C14.5736 3.25304 18.6096 5.26004 20.0996 9.00004" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.6665 4V9H15.6665" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>

  );
}
