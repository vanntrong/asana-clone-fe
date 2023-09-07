import { IconSvgProps } from "@/types";
import React from "react";

export const DotsIcon = ({ size = 24, height, width }: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      fill="currentColor"
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <path d="M16 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"></path>
      <path d="M6 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"></path>
      <path d="M26 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"></path>
    </svg>
  );
};
