import { NgModule } from "@angular/core";
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {KnobModule} from 'primeng/knob';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule} from 'primeng/inputswitch';
import { TimelineModule } from 'primeng/timeline';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { TabViewModule } from "primeng/tabview";
import { HttpClientModule } from "@angular/common/http";
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { CardModule } from "primeng/card";
import { TabMenuModule } from "primeng/tabmenu";
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";

@NgModule({
  declarations: [ 
  ],
  imports: [],
  exports: [
    TabMenuModule,
    DynamicDialogModule,
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
    ColorPickerModule,
    OverlayPanelModule,
    AvatarModule,
    AvatarGroupModule,
    DialogModule,
    PaginatorModule,
    CardModule
  ],
  providers: [
    MessageService,
    DialogService
]
})
export class customMaterialModule {}
