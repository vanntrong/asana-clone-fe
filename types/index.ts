import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Pagination {
  total: number;
  has_next: boolean;
  page: number;
  limit: number;
}

export interface Response<T> {
  data: T;
  message?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: Pagination;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: string;
  keyword?: string;
}
