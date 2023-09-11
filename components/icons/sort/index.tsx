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

export const AscendingIcon = ({ size = 24, height, width }: IconSvgProps) => {
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
        d="M17 20.75a.75.75 0 00.75-.75V6.25l1.65 2.2a.75.75 0 101.2-.9l-3-4a.75.75 0 00-1.35.45v16c0 .414.336.75.75.75z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M3.25 8c0 .414.336.75.75.75h9a.75.75 0 000-1.5H4a.75.75 0 00-.75.75z"
      ></path>
      <path
        fill="currentColor"
        d="M5.25 13c0 .414.336.75.75.75h7a.75.75 0 000-1.5H6a.75.75 0 00-.75.75z"
        opacity="0.7"
      ></path>
      <path
        fill="currentColor"
        d="M7.25 18c0 .414.336.75.75.75h5a.75.75 0 000-1.5H8a.75.75 0 00-.75.75z"
        opacity="0.4"
      ></path>
    </svg>
  );
};

export const DescendingIcon = ({ size = 24, height, width }: IconSvgProps) => {
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
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M4 16h9"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M6 11h7"
        opacity="0.7"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M8 6h5"
        opacity="0.3"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17 4v16l3-4"
      ></path>
    </svg>
  );
};
