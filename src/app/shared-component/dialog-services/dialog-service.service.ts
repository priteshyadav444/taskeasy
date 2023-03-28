import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UiService } from 'src/app/service/ui.service';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(public dialogService: DialogService, 
    private uiService: UiService,
    ) { }

  showDialog(component:any, configData?:any) {
    const data =  {
      header: 'Add Task',
      width: '70%',
      data: configData,
    }
    const ref = this.dialogService.open(component, data);
    this.uiService.toggleDialog(ref);
}

}
