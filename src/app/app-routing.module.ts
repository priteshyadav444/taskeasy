import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './component/calender/calender.component';
import { CompletedComponent } from './component/completed/completed.component';
import { TaskoverviewComponent } from './component/taskoverview/taskoverview.component';
import { MainwrapperComponent } from './main/mainwrapper/mainwrapper.component';
import {  AuthwrapperComponent } from "./main/authwrapper/authwrapper/authwrapper.component";
const routes: Routes = [
  {
    path: 'home',
    component: MainwrapperComponent,
    children: [
      { path: '', loadChildren: () => import("./component/task/task.module").then((m)=> m.TaskModule)},
      { path: 'taskoverview', component: TaskoverviewComponent },
      { path: 'calender', component: CalenderComponent },
      { path: 'id', loadChildren: () => import("./component/task/task.module").then((m)=> m.TaskModule)},
      { path: 'completed', component: CompletedComponent },
    ],
    
  },
  {
    path: 'auth',
    component: AuthwrapperComponent,
    children: [
      { path: '', loadChildren: () => import("./component/auth/auth.module").then((m)=> m.AuthModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
