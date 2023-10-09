import { CheckIcon, PersonIcon, CalendarIcon } from "@/components/icons";
import {
  AdvanceFilter,
  AdvanceFilterType,
  FilterItem,
  SortType,
} from "../types/homeType";

export const advanceFilters: Array<AdvanceFilter> = [
  {
    title: AdvanceFilterType.CompletionStatus,
    value: FilterItem.CompletionStatus,
    icon: <CheckIcon size={14} />,
  },
  {
    title: AdvanceFilterType.Assigned,
    value: FilterItem.Assigned,
    icon: <PersonIcon size={14} />,
  },
  {
    title: AdvanceFilterType.StartDate,
    value: FilterItem.StartDate,
    icon: <CalendarIcon size={14} />,
  },
  {
    title: AdvanceFilterType.DueDate,
    value: FilterItem.DueDate,
    icon: <CalendarIcon size={14} />,
  },
  {
    title: AdvanceFilterType.CreatedBy,
    value: FilterItem.CreatedBy,
    icon: <PersonIcon size={14} />,
  },
];

export const sortOptions = [
  {
    title: SortType.StartDate,
    value: SortType.StartDate,
  },
  {
    title: SortType.DueDate,
    value: SortType.DueDate,
  },
  {
    title: SortType.CreatedDate,
    value: SortType.CreatedDate,
  },
  {
    title: SortType.LastModifiedOn,
    value: SortType.LastModifiedOn,
  },
  {
    title: SortType.Likes,
    value: SortType.Likes,
  },
  {
    title: SortType.Alphabetical,
    value: SortType.Alphabetical,
  },
];
