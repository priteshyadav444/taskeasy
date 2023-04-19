import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root',
  })

export class ToastService {
  constructor(private messageService: MessageService, private store:Store) {
  }

  showMessage(messageConfig:any) {
    const msg: string | undefined = messageConfig?.errorMessage?.error?.error?.errors?.[0]?.msg 
    this.messageService.add({severity: messageConfig?.severity, summary: messageConfig?.summary , detail: msg});
    }
}