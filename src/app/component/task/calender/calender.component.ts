import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  DayService,
  MonthService,
  AgendaService,
  EventSettingsModel,
  CellClickEventArgs,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { AppState } from 'src/app/app-store/app.state';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { DialogServiceService } from 'src/app/shared-component/dialog-services/dialog-service.service';
import { getPendingTasks } from '../state/task.selector';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  providers: [DayService, MonthService, AgendaService],
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date();
  public readonly: boolean = true;
  public eventSettings: EventSettingsModel;
  public pendingtasks: any[] = [];
  pid!: any;
  // public url:any = `https://api-taskeasy.onrender.com/v1/tasks/calender/${this.pid}`
  public url: any = `http://127.0.0.1:3000/v1/tasks/calender/${this.pid}`;
  authToken = localStorage.getItem('authToken');
  reqHeader = [
    {
      'Content-Type': 'application/json',
      'x-auth-token': JSON.parse(this.authToken!),
    },
  ];

  private dataManager: DataManager = new DataManager();
  constructor(
    private service: TasksCardService,
    private titleService: Title,
    private store: Store<AppState>,
    private dialogServiceService: DialogServiceService
  ) {
    this.service.pid.subscribe((log) => {
      this.pid = log;
      this.url = `https://api-taskeasy.onrender.com/v1/tasks/calender/${this.pid}`;
      // this.url = `http://127.0.0.1:3000/v1/tasks/calender/${this.pid}`
    });

    this.dataManager = new DataManager({
      url: this.url,
      adaptor: new ODataV4Adaptor(),
      headers: this.reqHeader,
    });
  }

  ngOnInit(): void {
    this.store.select(getPendingTasks).subscribe((data) => {
      this.pendingtasks = data;
    });
    this.titleService.setTitle(`Calender - TaskEasy.in`);
    this.eventSettings = {
      dataSource: this.pendingtasks,
      fields: {
        subject: { title: 'Event Name', name: 'title', default: 'Add Name' },
        description: { title: 'Summary', name: 'description' },
        startTime: { title: 'From', name: 'createdAt' },
        endTime: { title: 'To', name: 'scheduled_date' },
      },
      enableTooltip: true,
      enableIndicator: true,
    };
  }
  dateConvert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  onClick(event: CellClickEventArgs) {
    this.dialogServiceService.showDialog(TaskDialogComponent, {
      createdAt: this.dateConvert(event.startTime),
    });
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' || args.type === 'QuickInfo') {
      args.cancel = true;
    }
  }
}
