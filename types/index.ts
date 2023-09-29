import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface PaginationResponse {
  total: number;
  has_next: boolean;
  page: number;
  limit: number;
}

export interface Response<T> {
  data: T;
  pagination?: PaginationResponse;
  message?: string;
}
