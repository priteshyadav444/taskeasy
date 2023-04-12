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
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from "primeng/dropdown";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { KanbanAllModule } from "@syncfusion/ej2-angular-kanban";
import { AccordionModule } from "primeng/accordion";
import { TooltipModule } from "primeng/tooltip";
import { ImageModule } from 'primeng/image';

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
    CardModule,
    ConfirmDialogModule,
    SplitButtonModule,
    CheckboxModule,
    FormsModule,
    TagModule,
    MenuModule,
    ChipModule,
    KnobModule,
    DividerModule,
    CardModule,
    DropdownModule,
    DragDropModule,
    CalendarModule,
    CommonModule,
    KanbanAllModule,
    BadgeModule,
    AccordionModule,
    TimelineModule,
    ChartModule,
    ScheduleModule,
    TooltipModule,
    EditorModule,
    MessagesModule,
    ImageModule
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
]
})
export class customMaterialModule {}
