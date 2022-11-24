import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { MainwrapperComponent } from 'src/app/main/mainwrapper/mainwrapper.component';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
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

  constructor(public appMain: MainwrapperComponent,  private store: Store<AppState>, private route: ActivatedRoute) {
   this.store.select(getTasks).forEach((ele)=>{
    console.log(ele);
   })
  }

  ngOnInit() {
    this.doughnutdata = {
      labels: ['low','medium','High'],
      datasets: [
          {
              data: [80, 5, 15],
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
