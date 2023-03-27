import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule,  } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { TaskEffects } from './state/task.effects';
import { tasksReducer } from './state/task.reducers';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ChipModule } from 'primeng/chip';
import { KnobModule } from 'primeng/knob';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
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
import {TooltipModule} from 'primeng/tooltip';
import {EditorModule} from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskCardComponent } from './task-card/task-card.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
    TooltipModule,
    EditorModule,
    HttpClientModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    AvatarGroupModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  providers: [HomeComponent,DynamicDialogRef,DynamicDialogConfig]
})
export class TaskModule {}
