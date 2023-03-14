export interface Task {
  _id?: string;
  title: string;
  description?: string;
  scheduled_date?: string;
  completedAt?: string;
  category?: string;
  completed?: boolean,
  task_status?: string,
  badge?: string,
  scheduled_type?: string,
  subtasklist: [
    {
      stitle?: string;
      checked?: boolean;
    }
  ];
}
