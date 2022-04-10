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
  todo = ['Get to work Get to workGet to work Get to workGet to work Get to work', 'Pick up groceries', ];
  constructor() {}

  ngOnInit() {
    this.events1 = [
      {
        status: '15/10/2020',
        date: 'friday',
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Processing',
        date: '15/10/2020 14:00',
        icon: PrimeIcons.COG,
        color: '#673AB7',
      },
      {
        status: 'Shipped',
        date: '15/10/2020 16:15',
        icon: PrimeIcons.ENVELOPE,
        color: '#FF9800',
      },
      {
        status: 'Delivered',
        date: '16/10/2020 10:00',
        icon: PrimeIcons.CHECK,
        color: '#607D8B',
      },
    ];

    this.events2 = ['2020', '2021', '2022', '2023'];
  }
}
