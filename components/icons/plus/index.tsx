import { IconSvgProps } from "@/types";
import React from "react";

export const PlusIcon = ({ size = 24, height, width }: IconSvgProps) => {
  return (
    <svg
      height={size || height}
      width={size || width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M12 4V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
