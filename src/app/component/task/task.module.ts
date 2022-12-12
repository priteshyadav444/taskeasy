import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { TaskEffects } from './state/task.effects';
import { tasksReducer } from './state/task.reducers';
import { COUNTER_STATE_NAME } from './state/task.state';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ChipModule } from 'primeng/chip';
import { KnobModule } from 'primeng/knob';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { LogoLoadingComponent } from 'src/app/component/shared/logo-loading/logo-loading.component';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
import { TasksService } from 'src/app/service/task/task.services';
import {BadgeModule} from 'primeng/badge';
import {DropdownModule} from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import {ProgressBarModule} from 'primeng/progressbar';
import { TaskoverviewComponent } from './taskoverview/taskoverview.component';
import { CompletedComponent } from './completed/completed.component';
import { CalenderComponent } from './calender/calender.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {TimelineModule} from 'primeng/timeline';
import { ChartModule } from 'primeng/chart';
import { ProjectReducer } from '../dashboard/state/project.reducer';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '?category=all',
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
  declarations: [ HomeComponent, TaskoverviewComponent, CompletedComponent, CalenderComponent],
  imports: [
    DialogModule,
    SplitButtonModule,
    CheckboxModule,
    FormsModule,
    TagModule,
    MenuModule,
    ChipModule,
    KnobModule,
    DividerModule,
    CardModule,
    FormsModule,
    DropdownModule,
    DragDropModule,
    InputSwitchModule,
    CalendarModule,
    CommonModule,
    KanbanAllModule,
    BadgeModule,
    AccordionModule,
    ProgressBarModule,
    TimelineModule,
    ChartModule,
    ScheduleModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TaskEffects]),
    
  ],
})
export class TaskModule {}
