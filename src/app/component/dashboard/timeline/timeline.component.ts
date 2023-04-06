import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  DayService,
  MonthService,
  AgendaService,
  EventSettingsModel,
  CellClickEventArgs,
  ActionEventArgs,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { getAllPendingTasks } from '../state/project.selector';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  providers: [DayService, MonthService, AgendaService],
  // templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TimelineComponent implements OnInit {
  public selectedDate: Date = new Date();
  public readonly: boolean = false;
  public eventSettings: EventSettingsModel;
  public pendingtasks: any[] = [];
  public url: any = 'https://api-taskeasy.onrender.com/v1/tasks/calender/all';
  private calenderSubscription: Subscription;



  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.calenderSubscription = this.store
      .select(getAllPendingTasks)
      .subscribe((data) => {
        if (data) {
          this.bindSetting(data);
        }
      });
  }
  ngOnDestroy() {
    this.calenderSubscription.unsubscribe();
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

  onClick(event: CellClickEventArgs) {}

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' || args.type === 'QuickInfo') {
      args.cancel = true;
    }
  }
}
