import { IconSvgProps } from "@/types";
import React from "react";

export const CloseIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="-1 -1 11 11"
      version="1.1"
      {...props}
    >
      <path
        fill="#5f6368"
        stroke="#5f6368"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="m0 0 9,9 M0 9 9,0"
      />
    </svg>
  );
};
