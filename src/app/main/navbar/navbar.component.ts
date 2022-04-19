import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainwrapperComponent } from '../mainwrapper/mainwrapper.component';
import { UiService } from '../../service/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(public appMain: MainwrapperComponent,private uiService: UiService) { 
  }

  ngOnInit(): void {
  }

  addTask(){
    this.uiService.toggleAddTask();
  }

}
