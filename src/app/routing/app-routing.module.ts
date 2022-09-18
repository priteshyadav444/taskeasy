import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from '../component/calender/calender.component';
import { CompletedComponent } from '../component/completed/completed.component';
import { TaskoverviewComponent } from '../component/taskoverview/taskoverview.component';
import { MainwrapperComponent } from '../main/mainwrapper/mainwrapper.component';
import { AuthwrapperComponent } from '../main/authwrapper/authwrapper/authwrapper.component';
import { AuthGuard } from '../service/auth.guard';
import { MainComponent } from '../main/lending/main/main.component';
import { DashboardComponent } from '../main/dashboard/wrapper/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[]
  },
  {
    path: 'home',
    component: MainwrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../component/task/task.module').then((m) => m.TaskModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'taskoverview',
        component: TaskoverviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'calender',
        component: CalenderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'id',
        loadChildren: () =>
          import('../component/task/task.module').then((m) => m.TaskModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'completed',
        component: CompletedComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthwrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../component/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
