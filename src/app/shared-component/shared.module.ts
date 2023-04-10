import { NgModule } from "@angular/core";
import { CreateProjectComponent } from '../shared-component/create-project/create-project.component';
import { customMaterialModule} from '../custom-material.module'
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ 
    CreateProjectComponent, 
    ConfirmDialogComponent
  ],
  imports: [
    customMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports:[
    customMaterialModule,
    CreateProjectComponent,
    ConfirmDialogComponent
  ],
  providers: [
]
})
export class sharedModules {}
