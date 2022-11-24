import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { MainwrapperComponent } from 'src/app/main/mainwrapper/mainwrapper.component';
import { Task } from 'src/app/models/task.models';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { loadAllTasks } from '../task/state/task.action';
import { getTasks } from '../task/state/task.selector';
// import { AppConfig } from '../../../app/api/appconfig';
// import { ConfigService } from 'src/app/service/app.config.service';

@Component({
  selector: 'app-taskoverview',
  templateUrl: './taskoverview.component.html',
  styleUrls: ['./taskoverview.component.css'],
})
export class TaskoverviewComponent implements OnInit {
  barData: any;
  doughnutdata:any
  barOptions: any;
  doughnutOptions:any
  pid!:any
  subscription!: Subscription;
  rangeDates!: Date[];
  totalCompletedTask: any = 0
  totalOngoingTasks:any = 0
  totalTasks : any = 0

  lowPriorityTask : any = 0
  midPriorityTask : any = 0
  highPriorityTask : any = 0


  constructor(public appMain: MainwrapperComponent,  private store: Store<AppState>, private service: TasksCardService) {

    this.service.pid.subscribe(log=> {
        this.pid = log
        console.log(this.pid)
        if(this.pid!=undefined){
        this.store.dispatch(loadAllTasks({pid:this.pid}));
        this.store.select(getTasks).subscribe(list => {
            list.forEach(value => {
                if(value.task_status == "active") this.totalOngoingTasks++;
                if(value.task_status == "done") this.totalCompletedTask++;
        
                if(value.badge=="low") this.lowPriorityTask++;
                if(value.badge=="medium") this.midPriorityTask++;
                if(value.badge=="high") this.highPriorityTask++;
                this.totalTasks++;
        
            })
           })
        }
    })
  }

  ngOnInit() {
    this.doughnutdata = {
      labels: ['low','medium','High'],
      datasets: [
          {
              data: [this.lowPriorityTask, this.midPriorityTask, this.highPriorityTask],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }
      ]
  };
    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August", "September","October","November","December"],
      datasets: [{
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: '#42A5F5',
          data: [
            0,0,0,0,0,0,0,0,0,6,0,0
          ]
      }, {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: '#66BB6A',
          data: [
            0,0,0,0,0,0,0,0,0,4,0,0
          ]
      }, {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: '#FFA726',
          data: [
            0,0,0,0,0,0,0,0,0,3,0,0
          ]
      }]
  };
  this.barOptions = {
    tooltips: {
        mode: 'index',
        intersect: false
    },
    responsive: true,
    scales: {
        xAxes: [{
            stacked: true,
        }],
        yAxes: [{
            stacked: true
        }]
    }
};

// this.doughnutOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme()
    

// this.config = this.configService.config;
//     this.updateChartOptions();
//     this.subscription = this.configService.configUpdate$.subscribe((config) => {
//       this.config = config;
//       this.updateChartOptions();
//     });

    
  }
  updateChartOptions() {
    this.applyLightTheme()
  }
  getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}

  applyLightTheme() {
    this.barOptions = {
      plugins: {
          tooltips: {
              mode: 'index',
              intersect: false
          },
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              stacked: true,
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              stacked: true,
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };
  }
}
