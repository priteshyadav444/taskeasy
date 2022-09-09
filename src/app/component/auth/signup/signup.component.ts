import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { setLoadingSpinner } from 'src/app/shared/state/Shared/shared.actions';
import { getErrorMessage } from 'src/app/shared/state/Shared/shared.selector';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage!:Observable<string>;
  constructor(private router: Router,private store :Store<AppState>) {}


  confirmPassword(signUpForm: FormGroup) {
    return signUpForm.controls['newPassword'].value === signUpForm.controls['repeatNewPassword'].value ? null : {'mismatch': true};
  }
  ngOnInit(): void {
   
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    
    });
    
  }
  
  onSignUpSubmit() {
    console.log('SignUp');
    const firstname = this.signUpForm.value.firstname
    const lastname = this.signUpForm.value.lastname
    const email = this.signUpForm.value.email
    const password = this.signUpForm.value.password
    if (this.signUpForm.invalid) {
      return;
    }
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({firstname,lastname,email,password}))
    console.log('SignUp');
  }
  onSignInClick(this: any) {
    this.router.navigateByUrl('/auth/login');
  }
 

}
