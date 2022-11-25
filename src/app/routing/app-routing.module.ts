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
import { LogoutComponent } from '../main/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'home',
    component: MainwrapperComponent,
    children: [
      {
        path: ':id',
        loadChildren: () =>
          import('../component/task/task.module').then((m) => m.TaskModule),
        canActivate: [AuthGuard],
      }
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
  {
    path:'logout',
    component:LogoutComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
