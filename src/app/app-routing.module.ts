import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './component/calender/calender.component';
import { CompletedComponent } from './component/completed/completed.component';
import { HomeComponent } from './component/home/home.component';
import { TaskoverviewComponent } from './component/taskoverview/taskoverview.component';
import { MainwrapperComponent } from './main/mainwrapper/mainwrapper.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainwrapperComponent,
    children: [
      { path:'', component:HomeComponent},
      { path: 'taskoverview', component: TaskoverviewComponent },
       { path: 'calender', component: CalenderComponent },
       { path: 'id', component: HomeComponent },
       { path: 'completed', component: CompletedComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
