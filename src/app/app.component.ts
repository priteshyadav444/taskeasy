import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { autoLogin } from './component/auth/state/auth.actions';
import { setLogoLoading } from './shared/state/Shared/shared.actions';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    menuMode = 'static';

    constructor(private primengConfig: PrimeNGConfig, private store:Store) {
        this.store.select
     }

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '12px';
    }
}
