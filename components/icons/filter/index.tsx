import { IconSvgProps } from "@/types";
import React from "react";

export const FilterIcon = ({ size = 24, height, width }: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm3 5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm3 5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
