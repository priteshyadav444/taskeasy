import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logo-loading',
  templateUrl: './logo-loading.component.html',
  styleUrls: ['./logo-loading.component.css']
})
export class LogoLoadingComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Checking.......");
  }

}
