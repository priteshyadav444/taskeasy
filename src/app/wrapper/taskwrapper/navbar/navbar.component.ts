import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../../service/ui.service';
import { ActivatedRoute } from '@angular/router';
import { MainwrapperComponent } from '../wrapper/mainwrapper.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showAddTask: boolean = false;
  subscription!: Subscription;
  pid:any
  constructor(public appMain: MainwrapperComponent,private uiService: UiService, private route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('id');
  }

  addTask(){
    this.uiService.toggleAddTask();
  }

}
