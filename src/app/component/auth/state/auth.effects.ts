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

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthServices
  ) {}

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.dispatchLoadingSpinner(true);
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
              this.dispatchLoadingSpinner(false);
              this.dispatchSuccessMessage('Thank you for signing up!');
              return signupSuccess({ user, redirect: true });
            }),
            catchError((err) => {
              const errMsg = this.parseErrorMessage(err);
              this.dispatchLoadingSpinner(false);
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
            this.dispatchLoadingSpinner(false);
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            this.dispatchSuccessMessage('Welcome back!');
            return loginSuccess({ user, redirect: true });
          }),
          catchError((err) => {
            const errMsg = this.parseErrorMessage(err);
            this.dispatchLoadingSpinner(false);
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });

  private parseErrorMessage(err: any): string {
    if (err.error?.errors?.length) {
      return err.error.errors[0].msg;
    }
    return 'An error occurred. Please try again later.';
  }

  private dispatchLoadingSpinner(status: boolean): void {
    this.store.dispatch(sharedActions.setLoadingSpinner({ status }));
  }

  private dispatchSuccessMessage(message) {
    this.store.dispatch(sharedActions.setSuccessMessage({ message }));
  }
  private dispatchLogoLoading(status: boolean): void {
    this.store.dispatch(sharedActions.setLogoLoading({ status }));
  }

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
        this.dispatchLoadingSpinner(true);
        this.dispatchLogoLoading(true);
        return this.authService.loadUser().pipe(
          map((data) => {
            this.dispatchLoadingSpinner(false);
            this.dispatchLogoLoading(true);

            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            this.dispatchSuccessMessage('Welcome back!');
            return loginSuccess({ user, redirect: true });
          }),
          catchError((err) => {
            let errMsg = this.parseErrorMessage(err);
            this.dispatchLoadingSpinner(false);
            this.dispatchLogoLoading(false);

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
        this.dispatchLogoLoading(true);
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

            this.dispatchLoadingSpinner(false);
            this.dispatchLogoLoading(false);
            this.dispatchSuccessMessage('Logged out. See you later');

            this.authService.setUserInLocalStorage(user);
            return logoutSucess({ user, redirect: false });
          }),
          catchError((err) => {
            const errMsg = this.parseErrorMessage(err);
            this.dispatchLoadingSpinner(false);
            this.dispatchLogoLoading(false);
            const user = new User('', '', '', '', '');
            this.store.dispatch(logoutSucess({ user, redirect: false }));
            return of(sharedActions.setErrorMessage({ error: errMsg }));
          })
        );
      })
    );
  });
}
