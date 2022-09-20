import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { AuthServices } from 'src/app/service/auth/auth.service';
import { autoLogin, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';
import { of } from 'rxjs';
import { setErrorMessage, setLoadingSpinner, setLogoLoading } from 'src/app/shared/state/Shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private router:Router,private actions$: Actions, private store:Store<AppState>,private authService:AuthServices) {}

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.firstname, action.lastname, action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            console.log(errResp.error.msg)
            const errmsg = this.authService.getErrorMessage(errResp.error.msg)
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.authService.showError(errmsg);
            return of(setErrorMessage({ message: errmsg }));
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
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
           
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            const errmsg = this.authService.getErrorMessage(errResp.error.msg)
            this.store.dispatch(setLoadingSpinner({ status: false }));
           
            this.authService.showError(errmsg);
            return of(setErrorMessage({ message: errmsg }));
          })
        );
      })
    );
  });


  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
             console.log(this.router)
            this.router.navigate(['/home']);
          }
        })
      );
    },
    { dispatch: false }
  );


  // autoLogin$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(autoLogin),
  //     mergeMap((action) => {
  //       const user = this.authService.getUserFromLocalStorage();
  //       return of(loginSuccess({ user, redirect: false }));
  //     })
  //   );
  // });
  

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap((action) => {
        return this.authService.getUserFromLocalStorage().pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            const errmsg = this.authService.getErrorMessage(errResp.error)
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setLogoLoading({ status: false }));
            this.authService.showError(errmsg);
            return of(setErrorMessage({ message: errmsg }));
          })
        );
      })
    );
  });
}
