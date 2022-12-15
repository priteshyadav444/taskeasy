import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.models';
import { setLogoLoading } from 'src/app/component/shared/state/Shared/shared.actions';
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
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Title } from '@angular/platform-browser';
import { getAllProjects } from '../../dashboard/state/project.selector';
import { tasksReducer } from '../state/task.reducers';
import { loadAllData, updateTask } from '../state/task.action';

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
  public data: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public cardSettings: CardSettingsModel;

  items!: MenuItem[];
  todo = [
    'Get to work Get to workGet to work Get to workGet to work Get to work',
    'Pick up groceries',
  ];
  done = ['Get up', 'Brush teeth'];

  pending!: any;
  active!: any;
  today!: any;
  todaycompleted!: any;
  scheduled!: any;
  unsheduled!: any;
  displayBasic!: boolean;
  displayCategory!: boolean;

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
  @Output() messageEvent = new EventEmitter<string>();
  projecttitle: any;

  constructor(
    private store: Store<AppState>,
    private service: TasksCardService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.data = service;
    

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
    console.log('source dataSourceChanged', state);
    if (state.requestType === 'cardCreated') {
      // this.service.addCard(state, this.pid).subscribe(() => {
      //   state.endEdit();
      // });
    } else if (state.requestType === 'cardChanged') {
      if (this.subTask.length > 0) {
        state.changedRecords[0] = {
          ...state.changedRecords[0],
          subtasklist: [
            ...state.changedRecords[0]['subtasklist'],
            ...this.subTask,
          ],
        };
        this.subTask = [];
      }
      if (this.selectedStatus != undefined) {
        state.changedRecords[0] = {
          ...state.changedRecords[0],
          task_status: this.selectedStatus,
        };
        this.selectedStatus == undefined;
      }

      //if all suntask completed
      const subtasklistcopy = state.changedRecords[0]['subtasklist'];
      if (subtasklistcopy.length > 0) {
        var cnt = 0;

        subtasklistcopy.forEach((element) => {
          if (element.checked == true) {
            cnt++;
          }
        });

        if (cnt == subtasklistcopy.length) {
          state.changedRecords[0] = {
            ...state.changedRecords[0],
            task_status: 'done',
          };
        }
      }
      const task :any = {...state.changedRecords[0]}
      this.store.dispatch(updateTask({task, pid:this.pid}));
      this.selectedStatus == undefined;
      this.subTask = [];
    } else if (state.requestType === 'cardRemoved') {
      this.service.deleteCard(state, this.pid).subscribe(() => {
        state.endEdit();
      });
    }
  } 
  public dataStateChange(state: DataStateChangeEventArgs): void {
    console.log(state)
    this.service.execute(state); 
  }

  public update(): void { 
    let state = { skip: 0, take: 10 };
    this.service.execute(state);
  }

  public dialogSettings: DialogSettingsModel = {
    fields: [
      {
        text: 'Status',
        key: 'task_status',
        type: 'DropDown',
        validationRules: { required: true },
      },
      { key: 'badge', type: 'DropDown', validationRules: { required: true } },
      {
        text: 'Title',
        key: 'title',
        type: 'TextBox',
        validationRules: { required: true },
      },
      {
        text: 'Description',
        key: 'description',
        type: 'TextArea',
        validationRules: { required: true },
      },
      {
        text: 'Priority',
        key: 'badge',
        type: 'TextBox',
        validationRules: { required: true },
      },
    ],
  };

  public sortSettings: SortSettingsModel = {
    sortBy: 'Custom',
    field: 'updatedAt',
    direction:'Descending'
  };

  public priorityData: Object[] = [
    { Id: 'active', Name: 'Active' },
    { Id: 'done', Name: 'Done' },
    { Id: 'pending', Name: 'Pending' },
    { Id: 'unsheduled', Name: 'Unsheduled' },
  ];
  addCard(data:any){

  }
  dialogOpen(args: DialogEventArgs): void {
    this.subTask = [];
    this.selectedStatus = null;
  }

  dialogClose(args: DialogEventArgs): void {
    //this.service.execute(s);
    this.subtaskele = '';
    console.log('args close', args);
  }
  public fields: Object = { text: 'Name', value: 'Id' };

  ngOnInit(): void {
    // this.titleService.setTitle(`${this.projecttitle} - TaskEasy.in`);
    
    this.titleService.setTitle(`TaskEasy.in`);
    let state = { skip: 0, take: 10 };

    this.pid = this.route.snapshot.paramMap.get('id');
    this.service.activateRouter$.next(this.pid);
    this.store.dispatch(loadAllData({ pid:this.pid }));
    this.service.execute(state);
    this.cardSettings = {
      headerField: '_id',
      selectionType: 'Single',
    };

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

  calulateCompleteSubTask(data) {
    var result = 0;
    data.forEach((element) => {
      if (element.checked == true) {
        result++;
      }
    });
    return result;
  }

  calculatePercentage(data) {
    return Math.round((this.calulateCompleteSubTask(data) * 100) / data.length);
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

  addSubTask(data: any, stask: any) {
    if (stask == '' || stask == null) {
      return;
    } else {
      const newstask = { stitle: stask, checked: false };
      this.subTask = [...this.subTask, newstask];
      this.subtaskele = '';
    }
  }
  onChange(item: any) {
    //console.log("item",item)
  }
}
