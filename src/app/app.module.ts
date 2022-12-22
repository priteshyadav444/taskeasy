import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';

import { NavbarComponent } from './wrapper/taskwrapper/navbar/navbar.component';
import { SidemenuComponent } from './wrapper/taskwrapper/sidemenu/sidemenu.component';

import { AppMenuitemComponent } from './wrapper/taskwrapper/sidemenu/app.menuitem.component';

import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';

// import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction';
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
import {EditorModule} from 'primeng/editor';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appReducer } from './app-store/app.state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { EffectsModule } from '@ngrx/effects';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthwrapperComponent } from './wrapper/authwrapper/authwrapper/authwrapper.component';
import {ToastModule} from 'primeng/toast';

import { LoadingSpinnerComponent } from './component/shared/loading-spinner/loading-spinner.component';
import { AuthEffects } from './component/auth/state/auth.effects';


//services
import { MessageService,MenuItem } from 'primeng/api';
import { UiService } from './service/ui.service';
import { MenuService } from './service/app.menu.service';
import { TasksService } from './service/task/task.services';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';


import {CommonModule} from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import { LogoLoadingComponent } from './component/shared/logo-loading/logo-loading.component';
import { TasksCardService } from './service/task/taskcard.service';


//dashboard component
import { DashboardComponent } from './component/dashboard/wrapper/dashboard.component';
import { TimelineComponent } from './component/dashboard/timeline/timeline.component';
import { LogoutComponent } from './component/dashboard/logout/logout.component';
import { ProjectEffects } from './component/dashboard/state/project.effects';
import { MainwrapperComponent } from './wrapper/taskwrapper/wrapper/mainwrapper.component';
import { MainComponent } from './component/lendingpage/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainwrapperComponent,
    SidemenuComponent,
    AppMenuitemComponent,
    CreateTaskComponent,
    AuthwrapperComponent,
    LoadingSpinnerComponent,
    MainComponent,
    LogoLoadingComponent,
    DashboardComponent,
    TimelineComponent,
    LogoutComponent
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
    EditorModule,
    MessagesModule,
    MessageModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, ProjectEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  
  providers: [UiService,TasksService,MessageService, MenuService,TasksCardService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
