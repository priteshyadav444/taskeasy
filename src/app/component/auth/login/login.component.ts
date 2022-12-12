import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { setLoadingSpinner } from 'src/app/component/shared/state/Shared/shared.actions';
import { getLoading, getLogoLoading } from 'src/app/component/shared/state/Shared/shared.selector';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password!: string;
  constructor(private router: Router,private store:Store<AppState>,  private titleService: Title) {}
  loginForm!:FormGroup
  ngOnInit(): void {
    this.titleService.setTitle("Login - TaskEasy.in");
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[ Validators.required, Validators.minLength(8)]),
    });
    this.store.select(getLoading).pipe().forEach((value)=>{
      if(value==true){
        this.titleService.setTitle("Checking your credentials..."); 
      }
      else{
        this.titleService.setTitle("Login - TaskEasy.in");
      }
    });

    this.store.select(getLogoLoading).pipe().forEach((value)=>{
      if(value==true){
        this.titleService.setTitle("Checking your credentials...");
      }
      else{
        this.titleService.setTitle("Login - TaskEasy.in");
      }
    });
  }

  onSignUpClick (this:any) {
    this.router.navigateByUrl('/signup');
  };

  onSignInSubmit(){
    if(this.loginForm.invalid){
      return
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}
