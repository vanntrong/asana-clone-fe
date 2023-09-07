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
