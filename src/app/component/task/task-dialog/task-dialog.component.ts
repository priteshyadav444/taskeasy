
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

interface Status {
  task_status: string;
  code: string;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class TaskDialogComponent implements OnInit {

  @Input("data") data!:any;
  @Input("status") status!: Status[];
  @Input("subtaskele") subtaskele!: string;

  public badgeData: Object[] = [
    { code: 'low', badge: 'Low' },
    { code: 'medium', badge: 'Medium' },
    { code: 'high', badge: 'High' },
  ];
  subTask: any = [];

  constructor() { }
  
  ngOnInit(): void {
  }

  addSubTask(data: any, stask: any) {
    if (stask == '' || stask == null) {
      return;
    } else {
      const newstask = { stitle: stask, checked: false };
      this.subTask = [...this.subTask, newstask];
      this.subtaskele = '';
    }
  }

}
