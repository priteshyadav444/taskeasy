import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskCardComponent implements OnInit {
  @Input('data') data: any = {
    _id: undefined,
    title: undefined,
    description: '',
    task_status: undefined,
    badge: undefined,
    scheduled_type: undefined,
    subtasklist: [],
    scheduled_date: null,
    completedAt: undefined,
    startedAt: undefined,
    createdAt: null,
  };
  constructor() {}

  ngOnInit(): void {
    this.data.description = this.transform(this.data.description);
    this.data.dayDiff = this.calculateDiff(this.data.startedAt);
    this.data.totalSubCompletedTask = this.calulateCompleteSubTask(this.data.subtasklist);
    this.data.subTaskListPercentage = this.calculatePercentage(this.data.subtasklist);
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
    return Math.round(
      (this.calulateCompleteSubTask(data) * 100) / data?.length
    );
  }

  calculateCompletionDiff(sentDate, fromDate) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date(fromDate);

    var diffMs = Math.floor(date2 - date1);

    var diffDays: any = Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24))); // days
    var diffHrs = Math.abs(Math.floor((diffMs % 86400000) / 3600000)); // hours
    var diffMins = Math.abs(
      Math.round(((diffMs % 86400000) % 3600000) / 60000)
    ); //minuts

    return diffDays + ' Days: ' + diffHrs + 'H';
  }
  // remove images from description in card
  transform(value: string = ''): string {
    if (value == undefined || value == null) value = '';
    return value.replace(/<img[^>]*>/g, '');
  }
}
