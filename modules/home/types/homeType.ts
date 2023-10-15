export enum AdvanceFilterType {
  CompletionStatus = "Completion status",
  Assigned = "Assigned",
  StartDate = "Start date",
  DueDate = "Due date",
  CreatedBy = "Created by",
}

export enum FilterItem {
  CompletionStatus = "is_done",
  Assigned = "assignee_ids",
  StartDate = "start_date",
  DueDate = "due_date",
  CreatedBy = "created_by",
}

export type AdvanceFilter = {
  title: AdvanceFilterType;
  value: FilterItem;
  icon: React.ReactNode;
};

export type AdvanceFilterSelected = {
  key: string;
  value?: string | string[];
};

export enum SortType {
  StartDate = "Start date",
  DueDate = "Due date",
  CreatedDate = "Created date",
  LastModifiedOn = "Last modified on",
  Likes = "Likes",
  Alphabetical = "Alphabetical",
}

export const FilterParamKeys = {
  PROJECT_ID: "project_id",
  TASK_ID: "task_id",
  IS_DONE: "is_done",
  ASSIGNEE_IDS: "assignee_ids",
  START_DATE: "start_date",
  DUE_DATE: "due_date",
  CREATED_BY: "created_by",
  SORT_BY: "sort_by",
  SORT_ORDER: "sort_order",
  IS_ADVANCE_FILTER: "is_advanced_filter",
};
