import { Component, OnInit } from '@angular/core';
import { MainwrapperComponent } from '../mainwrapper/mainwrapper.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: `./sidemenu.component.html`,
})
export class SidemenuComponent implements OnInit {
  model!: any[];
  categories !:any[];
  constructor(public appMain: MainwrapperComponent) {}

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
          {
            label: 'Study',
            icon: 'pi pi-list',
            routerLink: ['id1'],
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
