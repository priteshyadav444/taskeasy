export interface Task {
  _id?: string;
  title: string;
  description?: string;
  scheduled_date?: string | Date;
  completedAt?: string;
  completed?: boolean;
  task_status?: string;
  badge?: string;
  scheduled_type?: string;
  subtasklist: {
    stitle?: string;
    checked?: boolean;
    _id?: string;
  }[];
  createdAt?: string | Date;
}
