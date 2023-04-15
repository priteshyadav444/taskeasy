import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskCardComponent implements OnInit {
  @Input('data') data!: any;
  constructor() {}

  ngOnInit(): void {
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
    return Math.round((this.calulateCompleteSubTask(data) * 100) / data?.length);
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
  transform(value: string): string {
    return value.replace(/<img[^>]*>/g, '');
  }
}
