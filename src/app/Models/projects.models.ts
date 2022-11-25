export interface Project {
    project_title: string;
    id?: string;
    project_deadline?:Date,
      tasks?:[ {task_status?:string, badge?:string }],
    total_completed_tasks?:Number,
    total_tasks?:Number
  }
  