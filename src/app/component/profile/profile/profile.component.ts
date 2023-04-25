import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as profileActions from '../../../state/profile/profile.action';
import {
  selectProfileError,
  selectProfileState,
} from '../../../state/profile/profile.selector';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(profileActions.getUserInfo());
    this.store.select(selectProfileState).subscribe({
      next: (data) => {
        this.initform(data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });

    this.store
      .select(selectProfileError)
      .pipe()
      .subscribe({
        next: (data) => {
          this.toastService.showMessage({ ...data, severity: 'error', summary: 'Error' });
        },
        error: (error) => {
          console.log('error', error);
        },
      });
      this.initPasswordForm();
  }

  initform(userinfo?: any) {
    this.profileForm = this.fb.group({
      firstName: [userinfo?.firstname || '', Validators.required],
      lastName: [userinfo?.lastname || ''],
      emailAddress: [
        userinfo?.email || '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      mobileNo: [userinfo?.mobileNo || ''],
      country: [userinfo?.country || ''],
    });
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassward: ['', Validators.required ],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  onFormSubmit() {
    const { firstName, lastName, emailAddress, country, mobileNo } =
      this.profileForm.value;
    this.store.dispatch(
      profileActions.updateUserInfo({
        userInfo: {
          firstname: firstName,
          lastname: lastName,
          email: emailAddress,
          imgurl: undefined,
          country,
          phone_no: mobileNo,
        },
      })
    );
  }

  onChangePassword() {
    const password = this.passwordForm.controls['oldPassward'].value;
    const new_password = this.passwordForm.controls['newPassword'].value;
    const confirm_password = this.passwordForm.controls['confirmPassword'].value;
    if (new_password == confirm_password) {
      this.store.dispatch(profileActions.updateUserPassowrdInfo({ userPassword: { password, new_password, confirm_password}}))
    }
  }

}
