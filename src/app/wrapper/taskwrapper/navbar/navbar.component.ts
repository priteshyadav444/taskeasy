import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { UiService } from '../../../service/ui.service';
import { ActivatedRoute } from '@angular/router';
import { MainwrapperComponent } from '../wrapper/mainwrapper.component';
import { MenuItem } from 'primeng/api';
import { TaskState } from 'src/app/component/task/state/task.state';
import { Store } from '@ngrx/store';
import { getSelectdProjectDetails } from 'src/app/component/task/state/task.selector';
import { Project } from 'src/app/models/projects.models'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  showAddTask: boolean = false;
  subscription!: Subscription;
  pid:any
  items: MenuItem[];
  selectedProject: Project;
  activeMenuItem: MenuItem;

  constructor(
    private store: Store<TaskState>,
    public appMain: MainwrapperComponent,
    private uiService: UiService, 
    private route: ActivatedRoute,
    ) { 
  }

  ngOnInit(): void {
    this.items = [
      { label: 'All Task', icon: 'pi pi-list', id:  '?category=all'},
      { label: 'Task Overview', icon: 'pi pi-chart-bar', id:'taskoverview'},
      { label: 'Calender', icon: 'pi pi-calendar', id: 'calender'},
      { label: 'Notes', icon: 'pi pi-fw pi-file', id: 'notes'},
      { label: 'Remainder', icon: 'pi pi-fw pi-cog', id:'remainder' }
    ];
    this.activeMenuItem = this.items[0];
    this.pid = this.route.snapshot.paramMap.get('id');
    this.subscription = this.store.select(getSelectdProjectDetails).pipe(distinctUntilChanged()).subscribe((selectedProject) => {
      if (selectedProject) {
        this.selectedProject = selectedProject;
        this.mapRouterlink();      
      }
    }) 
  }


  mapRouterlink() {
    this.items.map((item) => {
      item['routerLink'] = `${ this.selectedProject?._id}/${item?.id}`;
    })
    this.activeMenuItem = this.items[0];
  }

  addTask(){
    this.uiService.toggleAddTask();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
