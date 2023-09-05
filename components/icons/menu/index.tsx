import { IconSvgProps } from "@/types";
import React from "react";

export const MenuIcon = ({ size = 24, height, width }: IconSvgProps) => {
  return (
    <svg
      height={size || height}
      width={size || width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
