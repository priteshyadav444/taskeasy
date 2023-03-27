import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { map, Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.models';
import {
  CardSettingsModel,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  DialogEventArgs,
  DialogSettingsModel,
  SortSettingsModel,
} from '@syncfusion/ej2-angular-kanban';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  addTask,
  deleteTask,
  loadAllData,
  resetTasks,
  updateTask,
} from '../state/task.action';
import {
  getSelectdProjectDetails,
  getTasks,
  isTaskLoaded,
} from '../state/task.selector';
import { Status } from 'src/app/shared-intefaces/Status';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
  badge: Status;
  selectedCategory: any;
  selectedStatus: Status;
  subTask: any = [];
  subtaskele!: string;
  @Output() messageEvent = new EventEmitter<string>();
  projecttitle: any;
  private subscription: Subscription;
  private getTaskSubscription: Subscription;
  private titleSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private service: TasksCardService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.data = this.service;

    this.badgeData = [
      { code: 'low', badge: 'Low' },
      { code: 'medium', badge: 'Medium' },
      { code: 'high', badge: 'High' },
    ];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.requestType === 'cardCreated') {
      const task: Task = {
        title: '',
        scheduled_date: '',
        category: '',
        description: '',
        subtasklist: this.subTask,
        ...state.addedRecords[0],
      };

      if (task.title == undefined || task.title == '') {
        alert('Enter Title');
        return;
      } else {
        this.store.dispatch(addTask({ task, pid: this.pid }));
      }
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
      // if (this.selectedStatus != undefined) {
      //   state.changedRecords[0] = {
      //     ...state.changedRecords[0],
      //     task_status: this.selectedStatus,
      //   };
      // }

      // if (this.selectedCategory != undefined) {
      //   state.changedRecords[0] = {
      //     ...state.changedRecords[0],
      //     badge: this.selectedCategory,
      //   };
      // }

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
      const task: any = { ...state.changedRecords[0] };
      if (task.title == undefined || task.title == '') {
        alert('Enter Title');
        return;
      }
      this.store.dispatch(updateTask({ task, pid: this.pid }));
      this.selectedStatus == undefined;
      this.selectedCategory = undefined;
      this.subTask = [];
    } else if (state.requestType === 'cardRemoved') {
      const task: any = { ...state.deletedRecords[0] };
      this.store.dispatch(deleteTask({ task, pid: this.pid }));
    }
  }
  public dataStateChange(state: DataStateChangeEventArgs): void {
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
    direction: 'Descending',
  };

  // public priorityData: Object[] = [
  //   { Id: 'active', Name: 'Active' },
  //   { Id: 'done', Name: 'Done' },
  //   { Id: 'pending', Name: 'Pending' },
  //   { Id: 'unsheduled', Name: 'Unsheduled' },
  // ];

  public badgeData: Object[] = [
    { Id: 'low', Name: 'Low' },
    { Id: 'medium', Name: 'Medium' },
    { Id: 'high', Name: 'High' },
  ];

  addCard(data: any) {}
  dialogOpen(args: DialogEventArgs): void {
    this.subTask = [];
    this.selectedStatus = null;
    this.selectedCategory = null;
  }

  dialogClose(args: DialogEventArgs): void {
    this.service.execute({});
    this.subtaskele = '';
  }

  public fields: Object = { text: 'Name', value: 'Id' };

  ngOnInit(): void {
    let state = { skip: 0, take: 10 };

    this.pid = this.route.snapshot.paramMap.get('id');
    this.service.activateRouter$.next(this.pid);

    this.subscription = this.store
      .pipe(select(isTaskLoaded))
      .subscribe((isTaskLoaded) => {
        // console.log(isTaskLoaded);
        if (!isTaskLoaded) {
          this.store.dispatch(loadAllData({ pid: this.pid }));
        } else {
          // it will reset task state if project is diffrent
          this.store.dispatch(resetTasks({ projectId: this.pid }));

          this.getTaskSubscription = this.store
            .select(getTasks)
            .pipe(
              map(
                (response: Task[]) =>
                  <any>{
                    result: response,
                  }
              )
            )
            .subscribe((data) => {
              this.data = data;
              this.titleSubscription = this.store
                .select(getSelectdProjectDetails)
                .pipe()
                .subscribe((selectedProject) => {
                  if (selectedProject) {
                    this.titleService.setTitle(
                      `${selectedProject.project_title} - TaskEasy.in`
                    );
                  }
                });
            });
        }
      });

    this.cardSettings = {
      headerField: '_id',
      selectionType: 'Single',
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.getTaskSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }

  // showBasicDialog() {
  //   this.displayBasic = true;
  // }

  // showCreateDialog() {
  //   this.displayCategory = true;
  // }

  // save(severity: string) {
  //   this.displayCategory = true;
  // }

  // addSubTask(data: any, stask: any) {
  //   if (stask == '' || stask == null) {
  //     return;
  //   } else {
  //     const newstask = { stitle: stask, checked: false };
  //     this.subTask = [...this.subTask, newstask];
  //     this.subtaskele = '';
  //   }
  // }
  // onChange(item: any) {
  //console.log("item",item)
  // }
}
