import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  theme_colour:any = "#1976D2";
  minimumDate:any = new Date();
  selectedDate:any = null
  title!: string;

  constructor() { }

  ngOnInit(): void {
  }

  colorChange(event) {

  }

  onAddProject() {

  }

}
