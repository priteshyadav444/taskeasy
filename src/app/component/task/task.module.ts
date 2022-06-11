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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [ HomeComponent],
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
    DragDropModule,
    InputSwitchModule,
    CalendarModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
})
export class TaskModule {}
