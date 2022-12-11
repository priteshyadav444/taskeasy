import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { logOut } from 'src/app/component/auth/state/auth.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<AppState>, private titleService: Title) {
    this.store.dispatch(logOut());
   }

  ngOnInit(): void {
    this.titleService.setTitle("redirecting to login......");
  }

}
