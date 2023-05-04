import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as profileActions from './profile.action';
import { AuthServices } from 'src/app/service/auth/auth.service';
import { UserInfo } from './profile.model';
import * as sharedActions from 'src/app/component/shared/state/Shared/shared.actions';
import { UiService } from 'src/app/service/ui.service';

@Injectable()
export class ProfileEffects {
  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getUserInfo),
      exhaustMap(() => {
        this.uiService.dispatchLoadingSpinner(true);
        return this.authService.getUserInfo().pipe(
          map((userInfo: UserInfo) => {
            this.uiService.dispatchLoadingSpinner(false);
            return profileActions.getUserInfoSuccess({
              userInfo: userInfo,
            });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateUserInfo),
      exhaustMap((action) => {
        this.uiService.dispatchLoadingSpinner(true);
        return this.authService.update(action.userInfo).pipe(
          map((userInfo) => {
            this.uiService.dispatchLoadingSpinner(false);
            this.uiService.dispatchSuccessMessage(
              'Woohoo! Your profile updated'
            );
            return profileActions.updateUserInfoSuccess({ userInfo });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    )
  );

  updateUserPasswordInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateUserPassowrdInfo),
      exhaustMap((action) => {
        this.uiService.dispatchLoadingSpinner(true);
        return this.authService.updatePassword(action.userPassword).pipe(
          map((userPassword) => {
            this.uiService.dispatchSuccessMessage(
              'Woohoo! Your Password updated'
            );
            this.uiService.dispatchLoadingSpinner(false);
            return profileActions.updateUserPasswordSuccess({ userPassword });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    )
  );

  // handleError$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(profileActions.handleError),
  //     map((errorMessage) => this.uiService.)
  //   )
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthServices,
    private uiService: UiService
  ) {}
}
