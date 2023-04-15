import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as profileActions from '../../../state/profile/profile.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profileForm!:FormGroup;

  constructor(private fb:FormBuilder, private store:Store) { }

  ngOnInit(): void {
    this.initform();
    this.store.dispatch(profileActions.getUserInfo())
  }

  initform() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      mobileNo: [''],
      country: ['']
    })
  }

  onFormSubmit() {
    const { firstName, lastName, emailAddress } = this.profileForm.value
    this.store.dispatch(profileActions.updateUserInfo({userInfo: { firstname:firstName, lastname:lastName, email: emailAddress, imgurl: undefined }}))
  }

}
