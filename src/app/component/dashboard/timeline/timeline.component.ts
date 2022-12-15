import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  DayService,
  MonthService,
  AgendaService,
  EventSettingsModel,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  providers: [DayService, MonthService, AgendaService],
  // templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
  public selectedDate: Date = new Date();
  public readonly: boolean = true;
  // public url:any = "https://api-taskeasy.onrender.com/v1/tasks/calender/all"
  public url:any = "http://127.0.0.1:3000/v1/tasks/calender/all"
  authToken = localStorage.getItem('authToken');
  reqHeader =[{
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(this.authToken!),
      }];

  private dataManager: DataManager = new DataManager({
    url: this.url,
    adaptor: new ODataV4Adaptor(),
    headers: this.reqHeader
  });
 
  
  constructor() {
  }
  
  ngOnInit(): void {
    
  }
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager,
    fields: {
      subject: { title: 'Event Name', name: 'title', default: 'Add Name' },
      description: { title: 'Summary', name: 'description' },
      startTime: { title: 'From', name: 'createdAt' },
      endTime: { title: 'To', name: 'scheduled_date' },
    },
    enableTooltip:true,
    enableIndicator:true,
};
}
