import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../app-store/app.state';
import * as sharedActions from 'src/app/component/shared/state/Shared/shared.actions';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();
  private projectsubject = new Subject<any>();
  private dialogRef!: DynamicDialogRef;

  constructor(private store: Store<AppState>) {}
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleDialog(ref: DynamicDialogRef): void {
    this.dialogRef = ref;
  }
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
  onProjectToggle(): Observable<any> {
    return this.projectsubject.asObservable();
  }
  parseErrorMessage(err: any): string {
    if (err.error?.errors?.length) {
      return err.error.errors[0].msg;
    }
    return 'An error occurred. Please try again later.';
  }

  dispatchLoadingSpinner(status: boolean): void {
    this.store.dispatch(sharedActions.setLoadingSpinner({ status }));
  }

  dispatchSuccessMessage(message) {
    this.store.dispatch(sharedActions.setSuccessMessage({ message }));
  }
  dispatchLogoLoading(status: boolean): void {
    this.store.dispatch(sharedActions.setLogoLoading({ status }));
  }
}
