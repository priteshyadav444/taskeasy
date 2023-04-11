import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app.state';
import { logOut } from 'src/app/component/auth/state/auth.actions';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    // reseting history so user unablle to go back
    history.pushState(null, null, location.href);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        history.pushState(null, null, location.href);
      }
    });
    this.store.dispatch(logOut());
    this.titleService.setTitle('redirecting to login......');
  }
}
