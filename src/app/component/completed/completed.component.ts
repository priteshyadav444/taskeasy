import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
  events1!: any[];
  events2!: any[];
  items!: MenuItem[];
  category!: MenuItem[];
  todo = ["Make PPT", "Login Module", "Registraion Module", "Dashboard Calendars Integration", "API Documention " ];
  value: number = 100;
  constructor() {}

  ngOnInit() {
    this.events1 = [
      {
        status: 'Done',
        date: '20/10/2022 14:00',
        color: '#9C27B0',
        image: 'game-controller.jpg',
      }
    ];

    this.events2 = ['2020', '2021', '2022', '2023'];
  }
}
