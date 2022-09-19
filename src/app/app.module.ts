import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';

import { NavbarComponent } from './main/navbar/navbar.component';
import { MainwrapperComponent } from './main/mainwrapper/mainwrapper.component';
import { SidemenuComponent } from './main/sidemenu/sidemenu.component';

import { AppMenuitemComponent } from './main/sidemenu/app.menuitem.component';

import { TaskoverviewComponent } from './component/taskoverview/taskoverview.component';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderComponent } from './component/calender/calender.component';
import { CheckboxModule } from 'primeng/checkbox';

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
import {TimelineModule} from 'primeng/timeline';
import {PaginatorModule} from 'primeng/paginator';


import { CompletedComponent } from './component/completed/completed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appReducer } from './app-store/app.state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { EffectsModule } from '@ngrx/effects';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthwrapperComponent } from './main/authwrapper/authwrapper/authwrapper.component';
import {ToastModule} from 'primeng/toast';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthEffects } from './component/auth/state/auth.effects';
import { MainComponent } from './main/lending/main/main.component';

//services
import { MessageService,MenuItem } from 'primeng/api';
import { UiService } from './service/ui.service';
import { MenuService } from './service/app.menu.service';
import { TasksService } from './service/task/task.services';
import { DashboardComponent } from './main/dashboard/wrapper/dashboard.component';
import { DashboardSidemenuComponent } from './main/dashboard/dashboard-sidemenu/dashboard-sidemenu.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


import {CommonModule} from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import { TimelineComponent } from './main/dashboard/timeline/timeline.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainwrapperComponent,
    SidemenuComponent,
    AppMenuitemComponent,
    TaskoverviewComponent,
    CalenderComponent,
    CompletedComponent,
    CreateTaskComponent,
    AuthwrapperComponent,
    LoadingSpinnerComponent,
    MainComponent,
    DashboardComponent,
    DashboardSidemenuComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DividerModule,
    CalendarModule,
    ChartModule,
    ProgressBarModule,
    FullCalendarModule,
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
    TimelineModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    MenubarModule,
    PaginatorModule,
    CommonModule,
    TabViewModule,    
    ScheduleModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [UiService,TasksService,MessageService, MenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
