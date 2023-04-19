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

}
