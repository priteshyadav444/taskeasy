import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';

import { NavbarComponent } from './main/navbar/navbar.component';
import { MainwrapperComponent } from './main/mainwrapper/mainwrapper.component';
import { SidemenuComponent } from './main/sidemenu/sidemenu.component';

import { AppMenuitemComponent } from './main/sidemenu/app.menuitem.component';
import { MenuService } from './main/service/app.menu.service';
import { TaskoverviewComponent } from './component/taskoverview/taskoverview.component';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { AppConfigComponent } from './app.config.component';
import { ConfigService } from './main/service/app.config.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderComponent } from './component/calender/calender.component';
import { HomeComponent } from './component/home/home.component';
import { TaskComponent } from './component/task/task.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {KnobModule} from 'primeng/knob';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {TimelineModule} from 'primeng/timeline';
import { CompletedComponent } from './component/completed/completed.component';
import { CreateTaskComponent } from './component/create-task/create-task.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainwrapperComponent,
    SidemenuComponent,
    AppMenuitemComponent,
    TaskoverviewComponent,
    AppConfigComponent,
    CalenderComponent,
    HomeComponent,
    TaskComponent,
    CompletedComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DividerModule,
    ChartModule,
    ProgressBarModule,
    CalendarModule,
    FullCalendarModule,
    DragDropModule,
    CheckboxModule,
    SplitButtonModule,
    ButtonModule,
    MenuModule,
    BadgeModule,
    KnobModule,
    ChipModule,
    TagModule,
    DialogModule,
    InputTextModule,
    InputSwitchModule,
    DropdownModule,
    TimelineModule
  ],
  providers: [MenuService, ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
