import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { AuthResponseData } from '../../Models/authResponses';
import { User } from '../../Models/user.models';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthServices {

  apiUrlSignUp = 'http://localhost:3000/v1/users/signup';
  apiUrlSignIn = 'http://localhost:3000/v1/users/signin';
  apiUrlUserLoad = 'http://localhost:3000/v1/users/load';

  // apiUrlSignUp = 'https://api-taskeasy.herokuapp.com/v1/users/signup';
  // apiUrlSignIn = 'https://api-taskeasy.herokuapp.com/v1/users/signin';
  // apiUrlUserLoad = 'https://api-taskeasy.herokuapp.com/v1/users/load';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  signUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.apiUrlSignUp, {
      firstname,
      lastname,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.apiUrlSignIn, {
      email,
      password,
    });
  }

 

  formatUser(data: AuthResponseData) {
    const user = new User(
      data.authToken,
      data.user._id,
      data.user.firstname,
      data.user.lastname,
      data.user.email
    );
    return user;
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('authToken', JSON.stringify(user.userToken));
  }

  showError(errmsg: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errmsg,
    });
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'ALL_FIELD_REQUIRED':
        return 'All field Required';
      case 'SIGNUP_FAILED':
        return 'Signup Failed';
      case 'USER_EXISTS':
        return 'Email already exists';
      case 'USER_NOT_EXISTS':
        return 'Email Not Registered';
      case 'WRONG_PASSWORD':
        return 'Wrong Password';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  getUserFromLocalStorage() {
    const authToken = localStorage.getItem('authToken');
    
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': JSON.parse(authToken!),
    });

    if (authToken) {
      return this.http.get<AuthResponseData>(this.apiUrlUserLoad, {
        headers: reqHeader,
      });
    }

    return this.http.get<AuthResponseData>(this.apiUrlUserLoad, {
      headers: reqHeader,
    });
  }
}
