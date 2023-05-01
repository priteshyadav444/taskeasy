import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { loadAllData } from '../state/task.action';
import { getTasks } from '../state/task.selector';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
  events1!: any[];
  events2!: any[];
  items!: MenuItem[];
  category!: MenuItem[];
  todo = [
    'Make PPT',
    'Login Module',
    'Registraion Module',
    'Dashboard Calendars Integration',
    'API Documention ',
  ];
  value: number = 100;
  pid!: any;
  allTask: any = [];

  constructor(
    private service: TasksCardService,
    private store: Store<AppState>
  ) {
    this.service.pid.subscribe((log) => {
      this.pid = log;
      if (this.pid != undefined) {
        this.store.dispatch(loadAllData({ pid: this.pid }));
        this.store.select(getTasks).subscribe((list) => {
          this.allTask = list.forEach((value) => {
            return value;
          });
        });
      }
    });
  }

  ngOnInit() {
    // this.events1 = [
    //   {
    //     status: 'Done',
    //     date: '20/10/2022 14:00',
    //     color: '#9C27B0',
    //     image: 'game-controller.jpg',
    //   },
    //   {
    //     status: 'Done',
    //     date: '20/10/2022 14:00',
    //     color: '#9C27B0',
    //     image: 'game-controller.jpg',
    //   },
    // ];
    // this.events2 = ['2020', '2021', '2022', '2023'];
  }
}
