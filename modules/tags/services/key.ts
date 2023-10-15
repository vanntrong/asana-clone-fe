export const queryKey = {
  getList: (projectId: string) => ["tags", "list", projectId],
  addTag: () => ["tags", "add"],
};
