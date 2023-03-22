import { NgModule } from "@angular/core";
import { CreateProjectComponent } from '../shared-component/create-project/create-project.component';
import { customMaterialModule} from '../custom-material.module'
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ 
    CreateProjectComponent
  ],
  imports: [
    customMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports:[
    customMaterialModule,
    CreateProjectComponent,
  ],
  providers: [
]
})
export class sharedModules {}
