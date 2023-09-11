export enum AdvanceFilterType {
  CompletionStatus = "Completion status",
  Assigned = "Assigned",
  StartDate = "Start date",
  DueDate = "Due date",
  CreatedBy = "Created by",
}

export type AdvanceFilter = {
  title: AdvanceFilterType;
  value: AdvanceFilterType;
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
