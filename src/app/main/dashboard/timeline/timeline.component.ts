import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-timeline',
  template: `<ejs-schedule> </ejs-schedule>`,
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,],
  // templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  data: object[] = [{
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2022, 1, 15, 10, 0),
    EndTime: new Date(2022, 1, 15, 12, 30)
      }];
      public eventSettings: EventSettingsModel = {
    dataSource: this.data
      }
  constructor() { }

  ngOnInit(): void {
  }

}
