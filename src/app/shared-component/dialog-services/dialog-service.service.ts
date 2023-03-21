import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(public dialogService: DialogService) { }

  showDialog(component:any, configData?:any) {
    const data =  {
      header: 'Add new Card',
      width: '70%',
      data: ''
    }
    const ref = this.dialogService.open(component, data);
}

}
