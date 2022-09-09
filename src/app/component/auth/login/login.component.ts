import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { setLoadingSpinner } from 'src/app/shared/state/Shared/shared.actions';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password!: string;
  constructor(private router: Router,private store:Store<AppState>) {}
  loginForm!:FormGroup
  ngOnInit(): void {
    this.loginForm = new FormGroup({
    
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[ Validators.required, Validators.minLength(8)]),
     
    });
  }
  
  onSignUpClick (this:any) {
    console.log("Login")
    this.router.navigateByUrl('/auth/signup');
  };

  onSignInSubmit(){
    if(this.loginForm.invalid){
      return
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
    console.log("Login")
  }
}
