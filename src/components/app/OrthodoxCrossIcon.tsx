import * as React from "react";

/**
 * Simple Orthodox cross (three-bar cross) icon.
 * - Top bar: INRI board
 * - Middle bar: main crossbeam
 * - Bottom bar: slanted footrest
 */
export function OrthodoxCrossIcon({
  className,
  strokeWidth = 2.2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* vertical */}
      <path
        d="M12 2.5V21.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* top bar */}
      <path
        d="M8.4 6.4H15.6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* main bar */}
      <path
        d="M5.7 10.4H18.3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* footrest (slanted) */}
      <path
        d="M7.4 16.6L16.8 14.8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
