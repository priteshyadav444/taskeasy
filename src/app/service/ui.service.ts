import { Injectable } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();
  private projectsubject = new Subject<any>();
  private dialogRef!: DynamicDialogRef;

  constructor() {}
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleAddProject(ref: DynamicDialogRef): void {
    this.dialogRef = ref;
  }
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
  onProjectToggle(): Observable<any> {
    return this.projectsubject.asObservable();
  }
}
