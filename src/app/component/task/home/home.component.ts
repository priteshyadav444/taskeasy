import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { loadAllTasks } from '../state/task.action';
import {
  getActiveTask,
  getPendingTasks,
  getScheduledTasks,
  getTasks,
  getTodayCompletedTasks,
  getTodayTasks,
  getUnScheduledTasks,
} from '../state/task.selector';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.models';
import { setLogoLoading } from 'src/app/shared/state/Shared/shared.actions';
import {
  CardSettingsModel,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  DialogEventArgs,
  DialogSettingsModel,
  KanbanComponent,
  SortSettingsModel,
} from '@syncfusion/ej2-angular-kanban';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'stream';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';

interface Status {
  task_status: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public cardSettings?: CardSettingsModel;
  public data: Observable<DataStateChangeEventArgs>;
  public state?: DataStateChangeEventArgs;

  items!: MenuItem[];
  todo = [
    'Get to work Get to workGet to work Get to workGet to work Get to work',
    'Pick up groceries',
  ];
  pending!: any;
  active!: any;
  today!: any;
  todaycompleted!: any;
  scheduled!: any;
  unsheduled!: any;

  displayBasic!: boolean;
  displayCategory!: boolean;
  done = ['Get up', 'Brush teeth'];
  knobvalue: number = 50;
  value2!: string;

  temp!: Observable<Task[]>;
  pid!: any;
  category!: MenuItem[];
  badge!: MenuItem[];
  selectedCategory: any = null;
  status: Status[];
  selectedStatus: Status;
  subTask: any = [];
  subtaskele!: string;
  constructor(
    private store: Store<AppState>,
    private service: TasksCardService,
    private route: ActivatedRoute
  ) {
    this.data = service;
    this.pid = this.route.snapshot.paramMap.get('id');
    this.service.activateRouter$.next(this.pid);
  

    this.status = [
      { task_status: 'Active', code: 'active' },
      { task_status: 'Pending', code: 'pending' },
      { task_status: 'Done', code: 'done' },
      { task_status: 'Unsheduled', code: 'unsheduled' },
    ];
    
    this.badge = [
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
      },

    ];


  }

 
  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.requestType === 'cardCreated') {
      this.service.addCard(state, this.pid).subscribe(() => {
        state.endEdit();
      });
    } else if (state.requestType === 'cardChanged') {
      if(this.subTask.length>0){
        state.changedRecords[0] = {...state.changedRecords[0], subtasklist:[ ...state.changedRecords[0]['subtasklist'] , ...this.subTask]};
        console.log(state.changedRecords[0]);
        this.subTask = []
      }
      if(this.selectedStatus!=undefined){
        state.changedRecords[0] = {...state.changedRecords[0], task_status: this.selectedStatus}; 
        this.selectedStatus==undefined;
      }
        
      this.service.updateCard(state, this.pid).subscribe(() => {
        state.endEdit();
      });

      this.selectedStatus==undefined;
      this.subTask = []

      
    } else if (state.requestType === 'cardRemoved') {
      this.service.deleteCard(state, this.pid).subscribe(() => {
        state.endEdit();
      });
    }
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.service.execute(this.pid);
  }
  public check(): void {
    this.service.execute(this.pid);
  }
  public dialogSettings: DialogSettingsModel = {
    fields: [
      { text: 'Status', key: 'task_status', type: 'DropDown', validationRules: { required: true } },
      { key: 'badge', type: 'DropDown', validationRules: { required: true } },
      { text: 'Title', key: 'title', type: 'TextBox', validationRules: { required: true } },
      { text: 'Description', key: 'description', type: 'TextArea', validationRules: { required: true } },
      { text: 'Priority', key: 'badge', type: 'TextBox', validationRules: { required: true } },
    ],
  };

  public sortSettings: SortSettingsModel = {
    sortBy: 'Custom',
    field: 'updatedAt',
    direction: 'Descending',
  };

  public priorityData: Object[] = [
    { Id: 'active', Name: 'Active' },
    { Id: 'done', Name: 'Done' },
    { Id: 'pending', Name: 'Pending' },
    { Id: 'unsheduled', Name: 'Unsheduled' },
];

dialogOpen(args: DialogEventArgs): void {
  console.log(args)
  // args.cancel = true;
}
public fields: Object = { text: 'Name', value: 'Id' };

  ngOnInit(): void {
    let state = { skip: 0, take: 10 };
    this.service.execute(this.pid);
    this.cardSettings = {
      headerField: '_id',
    };

    this.store.dispatch(loadAllTasks());
    this.pending = this.store.select(getPendingTasks);
    this.active = this.store.select(getActiveTask);
    this.today = this.store.select(getTodayTasks);
    this.todaycompleted = this.store.select(getTodayCompletedTasks);
    this.scheduled = this.store.select(getScheduledTasks);
    this.unsheduled = this.store.select(getUnScheduledTasks);
    this.store.dispatch(setLogoLoading({ status: false }));

    this.items = [
      { label: 'Mark As Done', icon: 'pi pi-refresh' },
      { label: 'Partial Done', icon: 'pi pi-times' },
      { label: 'Edit Task', icon: 'pi pi-times' },
      { label: 'Delete Task', icon: 'pi pi-times' },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
    ];

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
      },
      { separator: true },
      {
        label: 'Create Badge',
        icon: 'pi pi-plus',
        command: () => {
          this.showCreateDialog();
        },
      },
    ];
  }
  calculateDiff(sentDate) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date();
    var diffMs = Math.floor(date2 - date1);

    var diffDays: any = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //minuts

    return diffDays + ' Days: ' + diffHrs + 'H';
  }
  
  calculateCompletionDiff(sentDate, fromDate) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date(fromDate);
    var diffMs = Math.floor(date2 - date1);

    var diffDays: any = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //minuts

    return diffDays + ' Days: ' + diffHrs + 'H';
  }
  showBasicDialog() {
    this.displayBasic = true;
  }

  showCreateDialog() {
    this.displayCategory = true;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  save(severity: string) {
    this.displayCategory = true;
  }

  addSubTask(stask: any) {
    
    if (stask == '' || stask == null) {
      return;
    } else {
      const newstask = { stitle: stask, checked: false };
      this.subTask = [...this.subTask, newstask];
      console.log(this.subTask);
      this.subtaskele = '';
    }
    console.log(this.subTask);
  }
}
