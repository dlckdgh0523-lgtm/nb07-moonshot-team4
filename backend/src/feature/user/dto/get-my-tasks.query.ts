export interface GetMyTasksQuery {
  from?: string;
  to?: string;
  project_id?: string;
  status?: "todo" | "in_progress" | "done";
  assignee_id?: string;
  keyword?: string;
}