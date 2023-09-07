import { IconSvgProps } from "@/types";
import React from "react";

export const CheckIcon = ({ size = 24, height, width }: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l1.683 1.683v0c.175.175.459.175.634 0v0L15 10"
      ></path>
    </svg>
  );
};
