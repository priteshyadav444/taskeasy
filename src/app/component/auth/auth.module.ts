import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import {DividerModule} from 'primeng/divider';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    CheckboxModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([])
  ],
})
export class AuthModule {}
