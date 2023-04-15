import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root',
  })

export class ToastService {
  constructor(private messageService: MessageService) {}

  showMessage(messageConfig:any) {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }
}