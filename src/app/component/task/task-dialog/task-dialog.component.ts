import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppState } from 'src/app/app-store/app.state';
import { Task } from 'src/app/models/task.models'
import { TasksService } from 'src/app/service/task/task.services';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { addTask } from '../state/task.action';
interface Status {
  task_status: string;
  code: string;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class TaskDialogComponent implements OnInit, OnChanges {
  @Input('data') data: Task = {
    _id: undefined,
    title: undefined,
    description: undefined,
    scheduled_date: undefined,
    completedAt: undefined,
    category: undefined,
    completed: false,
    task_status: undefined,
    badge: undefined,
    scheduled_type: undefined,
    subtasklist:[],
    createdAt: undefined
  }
  @Input('status') status!: Status[];
  @Input('subtaskele') subtaskele!: string;
  selectedDate: any = new Date();
  minimumDate: any = new Date();

  public badgeData: Object[] = [
    { code: 'low', badge: 'Low' },
    { code: 'medium', badge: 'Medium' },
    { code: 'high', badge: 'High' },
  ];
  subTask: any = [];

  constructor(public config: DynamicDialogConfig, private tasksService: TasksService,
    private store: Store<AppState>,
    ) { }
  
  ngOnInit(): void {
    this.status = [
      { task_status: 'Active', code: 'active' },
      { task_status: 'Pending', code: 'pending' },
      { task_status: 'Done', code: 'done' },
      { task_status: 'Unsheduled', code: 'unsheduled' },
    ];
    if (!this.data?.task_status) {
      this.data["task_status"]=  this.status[3]?.task_status;
      this.status = [
        { task_status: 'Active', code: 'active' },
        { task_status: 'Pending', code: 'pending' },
        { task_status: 'Done', code: 'done' },
        { task_status: 'Unsheduled', code: 'unsheduled' },
      ];
    }
    this.data["subtasklist"] =  this.data?.subtasklist?.length ? this.data.subtasklist : [];
    console.log(this.config)
  }
  newObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const objectId =
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, () => {
          return Math.floor(Math.random() * 16).toString(16);
        })
        .toLowerCase();

    return objectId;
  }
  addSubTask(stask: any) {
    if (stask == '' || stask == null) {
      return;
    } else {
      const newstask = {
        stitle: stask,
        checked: false,
        _id: this.newObjectId(),
      };
      console.log(this.data );
      this.data["subtasklist"].push(newstask);
      this.subtaskele = '';
    }
  }
  removeSubTask(subtaskId) {
    this.data.subtasklist = this.data.subtasklist.filter(
      (subTask) => subtaskId != subTask._id
    );
  }

  addNewTask() {
    const task = this.data;
    const pid = this.config?.data?.pid;
    this.store.dispatch(addTask({task, pid:pid}));
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
