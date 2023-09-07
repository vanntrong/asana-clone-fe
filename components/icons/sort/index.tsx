import { IconSvgProps } from "@/types";
import React from "react";

export const SortIcon = ({ size = 24, height, width }: IconSvgProps) => {
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
        d="M16 5.25a.75.75 0 01.538.228l4 4.125a.75.75 0 11-1.076 1.044L16.75 7.851V18a.75.75 0 01-1.5 0V7.85l-2.712 2.797a.75.75 0 11-1.076-1.044l4-4.125A.75.75 0 0116 5.25zm-8 0a.75.75 0 01.75.75v10.15l2.712-2.797a.75.75 0 111.076 1.044l-4 4.125a.75.75 0 01-1.076 0l-4-4.125a.75.75 0 111.076-1.044l2.712 2.796V6A.75.75 0 018 5.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
