import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthwrapperComponent } from '../main/authwrapper/authwrapper/authwrapper.component';
import { AuthGuard } from '../service/auth.guard';
import { DashboardComponent } from '../component/dashboard/wrapper/dashboard.component';
import { LogoutComponent } from '../component/dashboard/logout/logout.component';
import { MainwrapperComponent } from '../main/taskwrapper/wrapper/mainwrapper.component';
import { MainComponent } from '../component/lendingpage/main.component';

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
    path: '',
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
