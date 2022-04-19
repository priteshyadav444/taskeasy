export interface Task {
  id?: string;
  title: string;
  description: string;
  scheduled_date: string;
  category: string;
  subtasklist: [
    {
      stitle?: string;
      checked?: boolean;
    }
  ];
}
