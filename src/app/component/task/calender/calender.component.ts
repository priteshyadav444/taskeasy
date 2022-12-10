import { Component, OnInit } from '@angular/core';
import {
  DayService,
  MonthService,
  AgendaService,
  EventSettingsModel,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { TasksCardService } from 'src/app/service/task/taskcard.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  providers: [DayService, MonthService, AgendaService],
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date();
  public readonly: boolean = true;
  public eventSettings: EventSettingsModel;
  pid!:any
  public url:any = `https://api-taskeasy.onrender.com/v1/tasks/calender/${this.pid}`
  // public url:any = `http://127.0.0.1:3000/v1/tasks/calender/${this.pid}`
  authToken = localStorage.getItem('authToken');
  reqHeader =[{
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(this.authToken!),
      }];

  private dataManager: DataManager = new DataManager();
 
  
  constructor(private service:TasksCardService) {
    this.service.pid.subscribe(log=> {
      this.pid = log
      this.url = `http://127.0.0.1:3000/v1/tasks/calender/${this.pid}`
      console.log(this.url)
    })

    this.dataManager = new DataManager({
      url: this.url,
      adaptor: new ODataV4Adaptor(),
      headers: this.reqHeader
    })
  }
  
  ngOnInit(): void {
     this.eventSettings = {
      dataSource:  this.dataManager,
      fields: {
        subject: { title: 'Event Name', name: 'title', default: 'Add Name' },
        description: { title: 'Summary', name: 'description' },
        startTime: { title: 'From', name: 'scheduled_date' },
        endTime: { title: 'To', name: 'scheduled_date' },
      },
    };
  }
 

}
