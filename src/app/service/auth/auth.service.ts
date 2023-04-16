import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { AuthResponseData } from '../../models/authResponses';
import { User } from '../../models/user.models';
import { MessageService } from 'primeng/api';
import { UserInfo } from 'src/app/state/profile/profile.model';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { getToken } from 'src/app/component/auth/state/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthServices {
  apiUrl = 'http://localhost:3000/v1/users';
  // apiUrl= 'https://api-taskeasy.onrender.com/v1/users';

  reqHeader!: HttpHeaders;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  // format user response for state
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

  // set tokem inside local storage
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
      case 'LOGOUT':
        return 'Wrong Password';
      case 'LOGOUT_SUCCESS':
        return 'Logout Successfull';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  // get header with token token
  getHeader() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.getToken(),
    });

    return reqHeader;
  }

  // return a auth token
  getToken() {
    return JSON.parse(localStorage.getItem('authToken'));
  }

  getUserInfo(): Observable<UserInfo> {
    const user: UserInfo = {
      firstname: 'Prabhat',
      lastname: 'Thakur',
      email: 'abhi046@gmail.com',
      country: 'USA',
      phone_no: '98989898',
      imgurl: '',
    };
    return of(user);
  }

  // sign up function
  signUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/signup`, {
      firstname,
      lastname,
      email,
      password,
    });
  }

  // login function
  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/signin`, {
      email,
      password,
    });
  }

  // update user function
  updateUser(userInfo: UserInfo): Observable<any> {
    return this.http.put<UserInfo>(
      `${this.apiUrl}/updateProfile`,
      { ...userInfo },
      {
        headers: this.getHeader(),
      }
    );
  }

  // load user form using token from local storage
  loadUser() {
    return this.http.get<AuthResponseData>(`${this.apiUrl}/load`, {
      headers: this.getHeader(),
    });
  }
}
