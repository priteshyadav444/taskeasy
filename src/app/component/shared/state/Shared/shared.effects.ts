import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ReplaySubject, of } from 'rxjs';
import {
  distinctUntilChanged,
  exhaustMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import * as sharedActions from './shared.actions';
import { AuthServices } from 'src/app/service/auth/auth.service';
import { ErrorMessage } from './shared.model';
import { ToastService } from 'src/app/service/toast.service';

@Injectable()
export class SharedEffects {
  destroyer$: ReplaySubject<boolean> = new ReplaySubject();

  handleError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sharedActions.setErrorMessage),
      takeUntil(this.destroyer$),
      distinctUntilChanged(),
      tap((error: any) => {
        const msg = error.error;
        if (msg != '') {
          this.toastService.showMessage({
            severity: 'error',
            summary: 'Error',
            detail: msg,
          });
        }
        exhaustMap(() => null);
      })
    );
  });

  handleSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sharedActions.setSuccessMessage),
      takeUntil(this.destroyer$),
      distinctUntilChanged(),
      tap((success: any) => {
        const msg = success.message;
        if (msg != '') {
          this.toastService.showMessage({
            severity: 'success',
            summary: 'Success',
            detail: msg,
          });
        }
        exhaustMap(() => null);
      })
    );
  });

  constructor(private actions$: Actions, private toastService: ToastService) {}

  ngOnDestroy(): void {
    this.destroyer$.next(true);
    this.destroyer$.unsubscribe();
  }
}
