import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/app-store/app.state';
import { UiService } from 'src/app/service/ui.service';
import { Task } from 'src/app/models/task.models';
import { addTask } from '../state/task.action';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  items!: MenuItem[];
  category!: MenuItem[];
  subTask: any = [];
  showDailog: boolean = false;
  displayCategory!: boolean;
  done = ['Get up', 'Brush teeth'];
  knobvalue: number = 50;
  value2!: string;
  selectedCategory: any = "low";
  subtaskele!: string;
  selectedDate: any = new Date();
  addtaskForm!: FormGroup;
  title!: string;
  description: string = '';
  categorytitle!: string;
  pid: string;
  minimumDate: any = new Date();

  @Output() btnClick: EventEmitter<Task> = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private uiService: UiService,
    private store: Store<AppState>,
    private service: TasksCardService
  ) {
    this.uiService.onToggle().subscribe((value) => (this.showDailog = value));
    this.pid = this.route.snapshot.paramMap.get('id');
    this.selectedCategory == null ? 'low' : this.selectedCategory;

    this.category = [
      {
        label: 'low',
        command: () => {
          this.selectCategory('low');
        },
      },
      {
        label: 'medium',
        command: () => {
          this.selectCategory('medium');
        },
      },
      {
        label: 'high',
        command: () => {
          this.selectCategory('high');
        },
      }
    ];
  }

  showCreateDialog() {
    this.displayCategory = true;
  }
  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  close() {
    this.btnClick.emit();
  }
  addSubTask(stask: any) {
    if (stask == '' || stask == null) {
      return;
    } else {
      const newstask = { stitle: stask, checked: false };
      this.subTask = [...this.subTask, newstask];
      this.subtaskele = '';
    }
  }

  removeSubTask(idx: any) {
    var index = this.subTask.indexOf(idx);
    if (index > -1) {
      this.subTask.splice(index, 1);
    }
  }
  selectCategory(category: string) {
    this.selectedCategory = category;
  }
  clearDailog(){
    this.title = ""
    this.description = ""
    this.selectedCategory = "low"
    this.subTask = []
  }
  onAddTask() {
    if (this.title == undefined || this.title == '') {
      alert('Enter Title');
      return;
    }

    // if(this.selectedDate< new Date()){
    //   alert('Enter Valid Date');
    //   return;
    // }
    const task: Task = {
      title: this.title,
      scheduled_date: this.selectedDate,
      category: this.selectedCategory,
      description: this.description,
      subtasklist: this.subTask,
      badge: this.selectedCategory,
      task_status: "pending"
    };

    const id = this.service.activeRouterId;
    this.store.dispatch(addTask({ task, pid: id }));
    this.showDailog = !this.showDailog;
    this.clearDailog()
  }
}
