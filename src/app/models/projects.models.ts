export interface Project {
    project_title: string;
    _id?: string;
    project_start?:Date,
    project_deadline?:Date,
    theme_colour?:string,
    tasks?:[ {task_status?:string, badge?:string }],
    total_completed_tasks :Number,
    total_tasks?:Number,
    total_percent?:Number
  }
  