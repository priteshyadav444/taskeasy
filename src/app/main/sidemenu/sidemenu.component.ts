import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksCardService } from 'src/app/service/task/taskcard.service';
import { MainwrapperComponent } from '../mainwrapper/mainwrapper.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: `./sidemenu.component.html`,
})
export class SidemenuComponent implements OnInit {
  model!: any[];
  categories !:any[];
  pid!: any;

  constructor(public appMain: MainwrapperComponent, private service: TasksCardService,private route: ActivatedRoute) {
    this.pid = this.route.snapshot.paramMap.get('id');
    this.service.activateRouter$.next(this.pid);
    //console.log(this.pid)
  }
  
  
  ngOnInit() {
    this.model = [
      {
        label: 'Task',
        icon: 'pi pi-check-square',
        items: [
          {
            label: 'All Task',
            icon: 'pi pi-list',
            routerLink: ['id'],
          },
        ],
      },
      {
        label: 'Notes',
        icon: 'pi pi-paperclip',
      },
      {
        label: 'Remainder',
        icon: 'pi pi-clock',
      },
    ];
  }
  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
      event.preventDefault();
    }
  }
}
