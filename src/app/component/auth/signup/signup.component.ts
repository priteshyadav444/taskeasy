import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import {
  setLogoLoading,
} from 'src/app/component/shared/state/Shared/shared.actions';
import {
  getLogoLoading,
} from 'src/app/component/shared/state/Shared/shared.selector';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage!: Observable<string>;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private titleService: Title
  ) {}

  conformPassword(signUpForm: FormGroup) {
    return signUpForm.controls['newPassword'].value ===
      signUpForm.controls['repeatNewPassword'].value
      ? null
      : { mismatch: true };
  }
  ngOnInit(): void {
    this.titleService.setTitle('Signup - TaskEasy.in');
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.store
      .select(getLogoLoading)
      .pipe()
      .forEach((value) => {
        if (value == true) {
          this.titleService.setTitle('checking......');
        } else {
          this.titleService.setTitle('Signup - TaskEasy.in');
        }
      });
  }

  onSignUpSubmit() {
    const firstname = this.signUpForm.value.firstname.trim();
    const lastname = this.signUpForm.value.lastname.trim();
    const email = this.signUpForm.value.email.trim();
    const password = this.signUpForm.value.password.trim();
    if (this.signUpForm.invalid) {
      return;
    }
    this.store.dispatch(signupStart({ firstname, lastname, email, password }));
  }
  onSignInClick(this: any) {
    this.router.navigateByUrl('/login');
  }
}
