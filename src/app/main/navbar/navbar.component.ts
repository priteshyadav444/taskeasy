import { Component, OnInit } from '@angular/core';
import { MainwrapperComponent } from '../mainwrapper/mainwrapper.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public appMain: MainwrapperComponent) { }

  ngOnInit(): void {
  }

}
