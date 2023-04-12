import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule,  } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { TaskEffects } from './state/task.effects';
import { tasksReducer } from './state/task.reducers';
import { TaskoverviewComponent } from './taskoverview/taskoverview.component';
import { CompletedComponent } from './completed/completed.component';
import { CalenderComponent } from './calender/calender.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { sharedModules } from 'src/app/shared-component/shared.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
  },
  {
    path: 'board',
    component: HomeComponent,
  },
  {
    path: 'taskoverview',
    component: TaskoverviewComponent
  },
  {
    path: 'calender',
    component: CalenderComponent
  },
  {
    path: 'completed',
    component: CompletedComponent
  }
];
@NgModule({
  declarations: [ HomeComponent, TaskoverviewComponent, CompletedComponent, CalenderComponent, TaskDialogComponent, TaskCardComponent],
  imports: [
    sharedModules,
    RouterModule.forChild(routes),
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  providers: [HomeComponent,DynamicDialogRef,DynamicDialogConfig]
})
export class TaskModule {}
