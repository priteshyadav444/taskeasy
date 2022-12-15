export interface Task {
  id?: string;
  title: string;
  description?: string;
  theme_colour?:string;
  scheduled_date?: string;
  category?: string;
  completed?: boolean,
  task_status?: string,
  badge?: string,
  subtasklist: [
    {
      stitle?: string;
      checked?: boolean;
    }
  ];
}
