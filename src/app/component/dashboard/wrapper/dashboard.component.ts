import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { select, Store } from '@ngrx/store';
import { UiService } from 'src/app/service/ui.service';
import {
  deleteProjectStart,
  loadAllProjects,
} from '../state/project.action';
import { Project } from 'src/app/models/projects.models';
import { getAllProjects, isProjectLoaded } from '../state/project.selector';
import { Observable } from 'rxjs';
import { getLoading } from 'src/app/component/shared/state/Shared/shared.selector';
import { Title } from '@angular/platform-browser';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateProjectComponent } from 'src/app/shared-component/create-project/create-project.component';
import { selectUserName } from '../../auth/state/auth.selector';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  showDailog: boolean = false;
  items: MenuItem[] = [];
  value: number = 10;
  totalprojects: any[] = [];
  projects: any[] = [];
  first: number = 0;
  rows: number = 4;
  @ViewChild('op') op: OverlayPanel;
  @ViewChild('cardOption') cardOption: ElementRef;
  showLoading$: Observable<boolean> | undefined;

  public menuInactiveDesktop!: boolean;
  public menuActiveMobile!: boolean;
  public overlayMenuActive!: boolean;
  public staticMenuInactive: boolean = false;
  public profileActive!: boolean;
  public topMenuActive!: boolean;
  public topMenuLeaving!: boolean;
  public theme!: string;
  documentClickListener!: () => void;

  menuClick!: boolean;
  topMenuButtonClick!: boolean;
  configActive!: boolean;
  configClick!: boolean;
  subscription!: Subscription;
  subscriptionIntial!: Subscription;
  public trackThickness: number;
  selectedItem!: any;
  ref: DynamicDialogRef;
  managerName$ = this.store.select(selectUserName);
  constructor(
    public renderer: Renderer2,
    public dialogService: DialogService,
    public app: AppComponent,
    private uiService: UiService,
    private store: Store<AppState>,
    private titleService: Title
  ) {
    this.uiService.onProjectToggle().subscribe((value) => {
      this.showDailog = value;
    });
    // reseting taskloaded shared state value and reseting projects and tasks.
  }

  ngOnInit() {
    this.trackThickness = 80;

    this.subscriptionIntial = this.store
      .pipe(select(isProjectLoaded))
      .subscribe((isProjectLoaded) => {
        if (!isProjectLoaded) {
          this.store.dispatch(loadAllProjects());
        }
        this.store.select(getAllProjects).subscribe({
          next: (projectData:Project[]) => {
            if (projectData?.length) {
              this.totalprojects = projectData;
              this.totalprojects = this.totalprojects?.map((data) => {
                const progressData = this.calculatePercentage(data?.total_completed_tasks, data?.total_tasks);
                return { ...data, progress_data : progressData };
              })
              this.onPageChange({ first: this.first, rows: this.rows });
            }
          },
          error: (error) => {
            console.log('error', error);
          },
        });
        this.showLoading$ = this.store.select(getLoading);
      });
    

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
    this.store
      .select(getLoading)
      .pipe()
      .forEach((value) => {
        if (value == true) {
          this.titleService.setTitle('loading...');
        } else {
          this.titleService.setTitle('TaskEasy.in');
        }
      });
    // Hides the Overlay menu and top menu if outside is clicked
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

  onPageChange(event) {
    this.first = event?.first;
    const projectUptoIndex = event?.first + event?.rows;
    this.projects = this.totalprojects?.slice(this.first, projectUptoIndex);
  }

  addProject() {
    this.showDynamicDialog();
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

  showDynamicDialog(type?) {
    let selectedItem = type ? this.selectedItem : undefined;
    let header = type ? 'Edit Project' : 'Create Project';
    this.ref = this.dialogService.open(CreateProjectComponent, {
      header: header,
      width: '25%',
      contentStyle: { 'max-heighte': '30%', overflow: 'auto' },
      baseZIndex: 10000,
      data: { ...selectedItem, type: type ? 'edit' : 'add' },
    });
    this.uiService.toggleDialog(this.ref);
    this.ref.onClose.subscribe((product: any) => {
      if (product) {
      }
    });
  }

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
    this.subscriptionIntial.unsubscribe();
  }

  close() {
    this.uiService.toggleDialog(this.ref);
  }

  cardClick(event, selectedItem, cardOption) {
    event.stopPropagation();
    this.op.toggle(event, cardOption);
    this.selectedItem = selectedItem;
  }

  onClick(type) {
    if (type == 'edit') {
      this.showDynamicDialog(type);
    } else if (type == 'delete') {
      this.store.dispatch(deleteProjectStart({ pid: this.selectedItem?._id }));
      this.op.hide();
    }
  }

  getColor(progressPercent): string {
    if (progressPercent < 25) {
      return 'red';
    } else if (progressPercent < 50) {
      return 'orange';
    } else if (progressPercent < 75) {
      return 'blue';
    } else {
      return 'green';
    }
  }

  calculatePercentage(totalCompletedTask, totalTasks): any {
    if (totalTasks == 0) return 0;
    if (totalCompletedTask == null) return 0;
    const progress_percent:number = Math.round((totalCompletedTask * 100) / totalTasks)
    const progress_color: string  =  this.getColor(progress_percent)
    return { progress_percent: progress_percent, progress_color:progress_color };
  }
  colorChange($event) {}
}
