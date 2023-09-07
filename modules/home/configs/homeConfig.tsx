import { CheckIcon, PersonIcon, CalendarIcon } from "@/components/icons";
import { AdvanceFilter, AdvanceFilterType } from "../types/homeType";

export const advanceFilters: Array<AdvanceFilter> = [
  {
    title: AdvanceFilterType.CompletionStatus,
    value: AdvanceFilterType.CompletionStatus,
    icon: <CheckIcon size={14} />,
  },
  {
    title: AdvanceFilterType.Assigned,
    value: AdvanceFilterType.Assigned,
    icon: <PersonIcon size={14} />,
  },
  {
    title: AdvanceFilterType.StartDate,
    value: AdvanceFilterType.StartDate,
    icon: <CalendarIcon size={14} />,
  },
  {
    title: AdvanceFilterType.DueDate,
    value: AdvanceFilterType.DueDate,
    icon: <CalendarIcon size={14} />,
  },
  {
    title: AdvanceFilterType.CreatedBy,
    value: AdvanceFilterType.CreatedBy,
    icon: <PersonIcon size={14} />,
  },
];
