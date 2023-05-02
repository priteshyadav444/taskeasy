import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs';
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
              return signupSuccess({ user, redirect: true });
            }),
            catchError((errResp) => {
              const errMsg =  errResp?.error?.errors?.[0]?.msg;
              this.store.dispatch(sharedActions.setLogoLoading({ status: false }));
              return of(sharedActions.setErrorMessage({ error: errMsg}));
            })
          );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(sharedActions.setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            const errMsg = errResp?.error?.errors?.[0]?.msg;
            this.store.dispatch(sharedActions.setLoadingSpinner({ status: false }));
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
            this.store.dispatch(sharedActions.setErrorMessage({ error: 'Login Success' }));
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
        this.store.dispatch(sharedActions.setLogoLoading({ status: true }));
        return this.authService.loadUser().pipe(
          map((data) => {
            this.store.dispatch(sharedActions.setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            const errMsg = this.authService.getErrorMessage(errResp.error);
            this.store.dispatch(sharedActions.setLoadingSpinner({ status: false }));
            this.store.dispatch(sharedActions.setLogoLoading({ status: false }));
            return of(sharedActions.setErrorMessage({ error: errMsg}));
          })
        );
      })
    );
  });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logOut),
      exhaustMap((action) => {
        this.store.dispatch(sharedActions.setLogoLoading({ status: true }));
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

            this.store.dispatch(sharedActions.setLoadingSpinner({ status: false }));

            this.store.dispatch(
              sharedActions.setErrorMessage({ error: 'Logout Successful' })
            );
            this.authService.setUserInLocalStorage(user);
            return logoutSucess({ user, redirect: false });
          }),
          catchError((errResp) => {
            const errMsg = this.authService.getErrorMessage(errResp.error);
            this.store.dispatch(sharedActions.setLoadingSpinner({ status: false }));
            this.store.dispatch(sharedActions.setLogoLoading({ status: false }));
            const user = new User('', '', '', '', '');
            this.store.dispatch(logoutSucess({ user, redirect: false }));
            return of(sharedActions.setErrorMessage({ error: errMsg}));
          })
        );
      })
    );
  });
}
