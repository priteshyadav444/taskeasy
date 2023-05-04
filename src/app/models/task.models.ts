export interface Task {
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  task_status?: string;
  badge?: string;
  completed?: boolean;
  scheduled_type?: string;
  createdAt?: string | Date;
  completedAt?: string;
  scheduled_date?: string | Date;
  subtasklist: {
    stitle?: string;
    checked?: boolean;
    _id?: string;
  }[];
}
