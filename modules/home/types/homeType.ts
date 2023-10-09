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

export enum SortType {
  StartDate = "Start date",
  DueDate = "Due date",
  CreatedDate = "Created date",
  LastModifiedOn = "Last modified on",
  Likes = "Likes",
  Alphabetical = "Alphabetical",
}
