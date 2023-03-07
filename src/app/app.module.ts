import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './wrapper/taskwrapper/navbar/navbar.component';
import { SidemenuComponent } from './wrapper/taskwrapper/sidemenu/sidemenu.component';

import { AppMenuitemComponent } from './wrapper/taskwrapper/sidemenu/app.menuitem.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { EffectsModule } from '@ngrx/effects';

import { AuthwrapperComponent } from './wrapper/authwrapper/authwrapper/authwrapper.component';

import { LoadingSpinnerComponent } from './component/shared/loading-spinner/loading-spinner.component';
import { AuthEffects } from './component/auth/state/auth.effects';


//services
import { MessageService,MenuItem } from 'primeng/api';
import { UiService } from './service/ui.service';
import { MenuService } from './service/app.menu.service';
import { TasksService } from './service/task/task.services';
import { LogoLoadingComponent } from './component/shared/logo-loading/logo-loading.component';
import { TasksCardService } from './service/task/taskcard.service';


//dashboard component
import { DashboardComponent } from './component/dashboard/wrapper/dashboard.component';
import { TimelineComponent } from './component/dashboard/timeline/timeline.component';
import { LogoutComponent } from './component/dashboard/logout/logout.component';
import { ProjectEffects } from './component/dashboard/state/project.effects';
import { MainwrapperComponent } from './wrapper/taskwrapper/wrapper/mainwrapper.component';
import { MainComponent } from './component/lendingpage/main.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app-store/app.state';
import { sharedModules } from './shared-component/shared.module';

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
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    sharedModules,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, ProjectEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  exports:[ 
    sharedModules
  ],
  providers: [UiService,TasksService, MenuService,TasksCardService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
