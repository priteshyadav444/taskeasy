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
import { Subscription } from 'rxjs';
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

  private calenderSubscription: Subscription;

  constructor(
    private service: TasksCardService,
    private titleService: Title,
    private store: Store<AppState>,
    private dialogServiceService: DialogServiceService
  ) {
    this.service.pid.subscribe((log) => {
      this.pid = log;
    });

  }

  ngOnInit(): void {
    this.calenderSubscription = this.store
      .select(getPendingTasks)
      .subscribe((data) => {
        if (data) {
          this.bindSetting(data);
        }
      });
    this.titleService.setTitle(`Calender - TaskEasy.in`);
  }
  ngOnDestroy() {
    this.calenderSubscription.unsubscribe();
  }
  dateConvert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  bindSetting(data) {
    this.eventSettings = {
      dataSource: data,
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
  onClick(event: CellClickEventArgs) {
    this.dialogServiceService.showDialog(TaskDialogComponent, {
      pid: this.pid,
      createdAt: this.dateConvert(event.startTime),
    });
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' || args.type === 'QuickInfo') {
      args.cancel = true;
    }
  }
}
