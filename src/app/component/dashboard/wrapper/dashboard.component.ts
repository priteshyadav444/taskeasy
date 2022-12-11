import { Component, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';
import { AppState } from 'src/app/app-store/app.state';
import { Store } from '@ngrx/store';
import { UiService } from 'src/app/service/ui.service';
import { addProjectStart, loadAllProjects } from '../state/project.action';
import { Project } from 'src/app/models/projects.models';
import { getAllProjects } from '../state/project.selector';
import { setLoadingSpinner } from 'src/app/shared/state/Shared/shared.actions';
import { Observable } from 'rxjs';
import { getLoading } from 'src/app/shared/state/Shared/shared.selector';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showDailog: boolean = false;
  items: MenuItem[] = [];
  value: number = 10;
  title!: string;
  selectedDate:any = null
  minimumDate:any = new Date();
  projects:any=[];
  showLoading$:Observable<boolean> | undefined
  
  public menuInactiveDesktop!: boolean;

  public menuActiveMobile!: boolean;

  public overlayMenuActive!: boolean;

  public staticMenuInactive: boolean = false;

  public profileActive!: boolean;

  public topMenuActive!: boolean;

  public topMenuLeaving!: boolean;

  public theme!: string;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  documentClickListener!: () => void;

  menuClick!: boolean;

  topMenuButtonClick!: boolean;

  configActive!: boolean;

  configClick!: boolean;

  subscription!: Subscription;
  constructor(
    private uiService: UiService,
    public renderer: Renderer2,
    public app: AppComponent,
    private store: Store<AppState>,
    private titleService: Title
  ) {
    this.uiService
    .onProjectToggle()
    .subscribe((value) => {this.showDailog = value;});
  }

  ngOnInit() {
    this.titleService.setTitle("Dashboard - TaskEasy.in");
    this.store.select(getLoading).pipe().forEach((value)=>{
      if(value==true){
        this.titleService.setTitle("creating project..."); 
      }
      else{
        this.titleService.setTitle("Dashboard - TaskEasy.in");
      }
    })

    this.store.dispatch(loadAllProjects());
    this.projects = this.store.select(getAllProjects);
    this.showLoading$ = this.store.select(getLoading);
    this.items = [
      {
        label: 'File',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [{ label: 'Project' }, { label: 'Other' }],
          },
          { label: 'Open' },
          { label: 'Quit' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
        ],
      },
    ];
  }

  ngAfterViewInit() {
    // hides the overlay menu and top menu if outside is clicked
    this.documentClickListener = this.renderer.listen(
      'body',
      'click',
      (event) => {
        if (!this.isDesktop()) {
          if (!this.menuClick) {
            this.menuActiveMobile = false;
          }

          if (!this.topMenuButtonClick) {
            this.hideTopMenu();
          }
        } else {
          if (!this.menuClick && this.isOverlay()) {
            this.menuInactiveDesktop = true;
          }
          if (!this.menuClick) {
            this.overlayMenuActive = false;
          }
        }

        if (this.configActive && !this.configClick) {
          this.configActive = false;
        }

        this.configClick = false;
        this.menuClick = false;
        this.topMenuButtonClick = false;
      }
    );
  }
  addProject() {
    this.uiService.toggleAddProject();
  }
  toggleMenu(event: Event) {
    this.menuClick = true;
    if (this.isDesktop()) {
      if (this.app.menuMode === 'overlay') {
        if (this.menuActiveMobile === true) {
          this.overlayMenuActive = true;
        }

        this.overlayMenuActive = !this.overlayMenuActive;
        this.menuActiveMobile = false;
      } else if (this.app.menuMode === 'static') {
        this.staticMenuInactive = !this.staticMenuInactive;
      }
    } else {
      this.menuActiveMobile = !this.menuActiveMobile;
      this.topMenuActive = false;
    }

    event.preventDefault();
  }

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.menuActiveMobile = false;

    if (this.topMenuActive) {
      this.hideTopMenu();
    } else {
      this.topMenuActive = true;
    }

    event.preventDefault();
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
      this.topMenuActive = false;
      this.topMenuLeaving = false;
    }, 1);
  }

  onMenuClick() {
    this.menuClick = true;
  }

  // onConfigClick(event) {
  //     this.configClick = true;
  // }

  isStatic() {
    return this.app.menuMode === 'static';
  }

  isOverlay() {
    return this.app.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 992;
  }

  isMobile() {
    return window.innerWidth < 1024;
  }

  onSearchClick() {
    this.topMenuButtonClick = true;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close() {
     this.uiService.toggleAddProject()
  }
  clearProject(){
     this.title = ""
     this.selectedDate = ""
  }

  onAddProject() { 
    if(this.title=="" || this.title==null){
      return alert('Enter Title');
    }

    if(this.selectedDate=="" || this.selectedDate==null){
      return alert('Select Deadline');
    }

    const project :Project  = {
      project_title:this.title,
      project_deadline:this.selectedDate,
      total_completed_tasks: 0,
      total_tasks:0.
    }
    
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(addProjectStart({project}))
    this.showDailog = false
    this.clearProject();
    
  }

  calculatePercentage(totalCompletedTask, totalTasks){
    if(totalTasks==0) return 0;
    return  Math.round(((totalCompletedTask*100)/totalTasks));
  }
}
