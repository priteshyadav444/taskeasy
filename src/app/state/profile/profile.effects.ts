import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as profileActions from './profile.action';
import { AuthServices } from 'src/app/service/auth/auth.service';
import { UserInfo } from './profile.model';

@Injectable()
export class ProfileEffects {
  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getUserInfo),
      exhaustMap(() => {
        return this.authService.getUserInfo().pipe(
          map((userInfo: UserInfo) => {
            return profileActions.getUserInfoSuccess({
              userInfo: userInfo,
            });
          }),
          catchError((error) => of(profileActions.handleError({ error })))
        );
      })
    );
  });

  updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateUserInfo),
      exhaustMap((action) => {
        return this.authService.update(action.userInfo).pipe(
          map((userInfo) => profileActions.updateUserInfoSuccess({ userInfo })),
          catchError((error) => of(profileActions.handleError({ error })))
        );
      })
    )
  );

  handleError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.handleError),
      map((errorMessage) => profileActions.setHandleError({ errorMessage }))
    )
  );

  constructor(private actions$: Actions, private authService: AuthServices) {}
}
