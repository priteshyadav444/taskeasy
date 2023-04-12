import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { sharedModules } from 'src/app/shared-component/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '', component: ProfileComponent
    //   children: [
    //     // { path: '', redirectTo: 'login' },
    //     { path: 'login', component: ProfileComponent },
    //   ],
    },
  ];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    // CommonModule,
    sharedModules,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
