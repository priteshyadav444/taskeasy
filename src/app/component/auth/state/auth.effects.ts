import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { AuthServices } from 'src/app/service/auth/auth.service';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  logOut,
  logoutSucess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { of } from 'rxjs';
import * as sharedActions from 'src/app/component/shared/state/Shared/shared.actions';
import { Router } from '@angular/router';
import { resetProjectState } from '../../dashboard/state/project.action';
import { resetTaskState } from '../../task/state/task.action';
import { User } from 'src/app/models/user.models';
import { UiService } from 'src/app/service/ui.service';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthServices,
    private uiService: UiService
  ) {}

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.uiService.dispatchLoadingSpinner(true);
        return this.authService
          .signUp(
            action.firstname,
            action.lastname,
            action.email,
            action.password
          )
          .pipe(
            map((data) => {
              const user = this.authService.formatUser(data);
              this.authService.setUserInLocalStorage(user);
              this.uiService.dispatchLoadingSpinner(false);
              this.uiService.dispatchSuccessMessage(
                'Thank you for signing up!'
              );
              return signupSuccess({ user, redirect: true });
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

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) => {
        const { email, password } = action;
        return this.authService.login(email, password).pipe(
          map((data) => {
            this.uiService.dispatchLoadingSpinner(false);
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            this.uiService.dispatchSuccessMessage('Welcome back!');
            return loginSuccess({ user, redirect: true });
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

  defaultRedirect = '/dashboard';
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess, logoutSucess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate([this.defaultRedirect]);
          } else {
            this.router.navigate(['login']);
          }
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap((action) => {
        this.uiService.dispatchLoadingSpinner(true);
        this.uiService.dispatchLogoLoading(true);
        return this.authService.loadUser().pipe(
          map((data) => {
            this.uiService.dispatchLoadingSpinner(false);
            this.uiService.dispatchLogoLoading(true);

            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            // this.uiService.dispatchSuccessMessage('Welcome back!');
            return loginSuccess({ user, redirect: true });
          }),
          catchError((err) => {
            let errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            this.uiService.dispatchLogoLoading(false);

            // on intial login page auth_denied message
            if (err?.error?.errors?.[0]?.error_code == 'AUTH_DENAID')
              errMsg = '';

            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logOut),
      exhaustMap((action) => {
        this.uiService.dispatchLogoLoading(true);
        return this.authService.loadUser().pipe(
          map((data) => {
            // resetting Project State
            this.store.dispatch(
              resetProjectState({ resetProjectLoadedState: false })
            );
            // resetting Task State
            this.store.dispatch(resetTaskState());
            // removing token from storage

            // removing data from state
            const user = this.authService.formatUser({
              authToken: '',
              user: {
                _id: '',
                firstname: '',
                lastname: '',
                email: '',
              },
            });

            this.uiService.dispatchLoadingSpinner(false);
            this.uiService.dispatchLogoLoading(false);
            this.uiService.dispatchSuccessMessage('Logged out. See you later');

            this.authService.setUserInLocalStorage(user);
            return logoutSucess({ user, redirect: false });
          }),
          catchError((err) => {
            const errMsg = this.uiService.parseErrorMessage(err);
            this.uiService.dispatchLoadingSpinner(false);
            this.uiService.dispatchLogoLoading(false);
            const user = new User('', '', '', '', '');
            this.store.dispatch(logoutSucess({ user, redirect: false }));
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });
}
