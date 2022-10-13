import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
  KanbanComponent,
} from '@syncfusion/ej2-angular-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { TasksCardService } from 'src/app/service/task/taskcard.service';

interface City {
  name: string;
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
  category!: MenuItem[];
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
  cities!: City[];
  selectedCity!: City;
  temp!: Observable<Task[]>;

  constructor(private store: Store<AppState>, private service:TasksCardService) {
    this.data = service
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    console.log(state);
    if (state.requestType === 'cardCreated') {
         this.service.addCard(state).subscribe(() => {
             state.endEdit();
         });
     } else if (state.requestType === 'cardChanged') {
         this.service.updateCard(state).subscribe(() => {
          state.endEdit();
         });
     } else if (state.requestType === 'cardRemoved') {
         this.service.deleteCard(state).subscribe(() => {
             state.endEdit();
         });
     }
 }

 public dataStateChange(state: DataStateChangeEventArgs): void {
  console.log(state);
  this.service.execute(state);
}
 
 
  ngOnInit(): void {
    let state = { skip: 0, take: 10 };
    this.service.execute(state);
    this.cardSettings = {
      headerField: '_id',
      contentField: 'title',
      selectionType: 'Single',
    };

    this.store.dispatch(loadAllTasks());
    this.pending = this.store.select(getPendingTasks);
    console.log(this.data);
    console.log(this.pending);
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
      { label: 'Study' },
      { label: 'Work' },
      { label: 'Others' },
      { separator: true },
      {
        label: 'Create Category',
        icon: 'pi pi-plus',
        command: () => {
          this.showCreateDialog();
        },
      },
    ];
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showCreateDialog() {
    this.displayCategory = true;
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
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
}
