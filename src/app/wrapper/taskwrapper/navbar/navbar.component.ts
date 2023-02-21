import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../../service/ui.service';
import { ActivatedRoute } from '@angular/router';
import { MainwrapperComponent } from '../wrapper/mainwrapper.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  showAddTask: boolean = false;
  subscription!: Subscription;
  pid:any
  items: MenuItem[];
  constructor(public appMain: MainwrapperComponent,private uiService: UiService, private route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    this.items = [
      {label: 'All Task', icon: 'pi pi-list'},
      {label: 'Task Overview', icon: 'pi pi-chart-bar'},
      {label: 'Calender', icon: 'pi pi-calendar'},
      {label: 'Notes', icon: 'pi pi-fw pi-file'},
      {label: 'Remainder', icon: 'pi pi-fw pi-cog'}
  ];
    this.pid = this.route.snapshot.paramMap.get('id');
  }

  addTask(){
    this.uiService.toggleAddTask();
  }

}
