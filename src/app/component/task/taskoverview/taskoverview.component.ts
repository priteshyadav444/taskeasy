import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { MainwrapperComponent } from 'src/app/wrapper/taskwrapper/wrapper/mainwrapper.component';
import { Task } from 'src/app/models/task.models';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { loadAllData, resetTasks } from '../state/task.action';
import { getTasks, isTaskLoaded } from '../state/task.selector';
// import { AppConfig } from '../../../app/api/appconfig';
// import { ConfigService } from 'src/app/service/app.config.service';

@Component({
  selector: 'app-taskoverview',
  templateUrl: './taskoverview.component.html',
  styleUrls: ['./taskoverview.component.css'],
})
export class TaskoverviewComponent implements OnInit {
  barData: any;
  doughnutdata: any;
  barOptions: any;
  doughnutOptions: any;
  pid!: any;
  subscription!: Subscription;
  taskSubscription!: Subscription;
  projectSubscription!: Subscription;
  rangeDates!: Date[];
  totalCompletedTask: any = 0;
  totalOngoingTasks: any = 0;
  totalTasks: any = 0;

  lowPriorityTask: any = 0;
  midPriorityTask: any = 0;
  highPriorityTask: any = 0;

  activeDataSet: any = [];
  completedDataSet: any = [];
  totalTaskDataSet: any = [];

  constructor(
    public appMain: MainwrapperComponent,
    private store: Store<AppState>,
    private service: TasksCardService,
    private titleService: Title
  ) {
    this.projectSubscription = this.service.pid.subscribe((log) => {
      this.pid = log;
      if (this.pid != undefined) {
        this.subscription = this.store
          .pipe(select(isTaskLoaded))
          .subscribe((isTaskLoaded) => {
            console.log(isTaskLoaded);
            this.store.dispatch(resetTasks({ projectId: this.pid }));
            if (!isTaskLoaded) {
              this.store.dispatch(loadAllData({ pid: this.pid }));
            }
          });

        this.taskSubscription = this.store
          .select(getTasks)
          .subscribe((list) => {
            this.totalCompletedTask = 0;
            this.totalOngoingTasks = 0;
            this.totalTasks = 0;

            const activeTasks = new Array(12).fill(0);
            const completedTasks = new Array(12).fill(0);
            const totalTask = new Array(12).fill(0);

            list.forEach((value) => {
              if (value.badge === 'low') {
                this.lowPriorityTask++;
              }
              if (value.badge === 'medium') {
                this.midPriorityTask++;
              }
              if (value.badge === 'high') {
                this.highPriorityTask++;
              }
              if (value.task_status == 'active') {
                activeTasks[new Date(value.scheduled_date).getMonth()]++;
                this.totalOngoingTasks++;
              }
              if (value.task_status == 'done') {
                completedTasks[new Date(value.scheduled_date).getMonth()]++;
                this.totalCompletedTask++;
              }
              this.totalTasks++;
              totalTask[new Date(value.scheduled_date).getMonth()]++;
            });

            // Update the data arrays for each dataset in the barData object
            this.activeDataSet = activeTasks;
            this.completedDataSet = completedTasks;
            this.totalTaskDataSet = totalTask;
          });
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle(`TaskOverview - TaskEasy.in`);
    this.doughnutdata = {
      labels: ['low', 'medium', 'High'],
      datasets: [
        {
          data: [
            this.lowPriorityTask,
            this.midPriorityTask,
            this.highPriorityTask,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
    this.barData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Active Tasks',
          backgroundColor: '#42A5F5',
          data: this.activeDataSet,
        },
        {
          type: 'bar',
          label: 'Total Completed Tasks',
          backgroundColor: '#66BB6A',
          data: this.completedDataSet,
        },
        {
          type: 'bar',
          label: 'Total Tasks',
          backgroundColor: '#FFA726',
          data: this.totalTaskDataSet,
        },
      ],
    };
    this.barOptions = {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
  
    };

    // this.doughnutOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme()

    // this.config = this.configService.config;
    //     this.updateChartOptions();
    //     this.subscription = this.configService.configUpdate$.subscribe((config) => {
    //       this.config = config;
    //       this.updateChartOptions();
    //     });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.taskSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }
  updateChartOptions() {
    this.applyLightTheme();
  }
  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  applyLightTheme() {
    this.barOptions = {
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
