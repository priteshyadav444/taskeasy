import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { loadAllTasks } from '../task/state/task.action';
import { getTasks } from '../task/state/task.selector';

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
  todo = ["Make PPT", "Login Module", "Registraion Module", "Dashboard Calendars Integration", "API Documention " ];
  value: number = 100;
  pid!:any
  allTask:any = []
  constructor(private service:TasksCardService, private store: Store<AppState>) {
    
    this.service.pid.subscribe(log=> {
      this.pid = log
      if(this.pid!=undefined){
      this.store.dispatch(loadAllTasks({pid:this.pid}));
      this.store.select(getTasks).subscribe(list => {
        this.allTask = list.forEach(value => {
             return value
              // this.events1.push({status: value.task_status, date:value.scheduled_date,  color: '#9C27B0',title:value.title})
          })
        })

        console.log(this.allTask)
      // .pipe(map((data) => {
      //   data.sort((a, b) => {
      //       return a.value < b.value ? -1 : 1;
      //    });
      //   return data;
      //   }))
      // this.store.dispatch(loadAllTasks({pid:this.pid}));
      // this.store.select(getTasks).subscribe(list => {
      //     list.forEach(value => {
      //         const currdate = value.scheduled_date;
      //         if()
      //         this.events1.push({status: value.task_status, date:value.scheduled_date,  color: '#9C27B0',title:value.title})
      //     })
      //    })
      // console.log(this.events1)
      }
  })
  }

  ngOnInit() {
    this.events1 = [
      {
        status: 'Done',
        date: '20/10/2022 14:00',
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Done',
        date: '20/10/2022 14:00',
        color: '#9C27B0',
        image: 'game-controller.jpg',
      }
    ];
    console.log(this.allTask)
    this.events2 = ['2020', '2021', '2022', '2023'];
  }
}
