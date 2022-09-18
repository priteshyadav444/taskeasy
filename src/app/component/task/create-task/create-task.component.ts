import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/app-store/app.state';
import { UiService } from 'src/app/service/ui.service';
import { Task } from 'src/app/models/task.models';
import { addTask } from '../state/task.action';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  items!: MenuItem[];
  category!: MenuItem[];
  subTask:any = [];
  showDailog: boolean = false;
  displayCategory!: boolean;
  done = ['Get up', 'Brush teeth', ];
  knobvalue: number = 50;
  value2!: string;
  selectedCategory:any=null
  subtaskele!:string
  selectedDate:any = null
  addtaskForm!:FormGroup
  title!:string
  description:string=""
  categorytitle!:string
  @Output() btnClick:EventEmitter <Task> = new EventEmitter();
  

  constructor(private uiService:UiService, private store: Store<AppState>) {
    this.uiService.onToggle().subscribe((value)=> (this.showDailog = value))
    this.selectedCategory = this.selectedCategory==null?"None":this.selectedCategory
    this.category = [
      {label:"None" ,command: () => {
        this.selectCategory("None");} },
      {label:"Study" ,command: () => {
        this.selectCategory("Study");} },
      { separator: true },
      { label: 'Create Category', icon: 'pi pi-plus',command: () => {
        this.showCreateDialog();
    } },
    ];
   }


   showCreateDialog() {
    this.displayCategory = true;
  }
  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
 
  close(){
    this.btnClick.emit()
  }
  addSubTask(stask:any){
    console.log(this.subTask)
 
    if(stask==''){
      return
    }
    const newstask = { "stitle":stask, "checked": false };
    this.subTask = [ ...this.subTask, newstask]
    console.log(this.subTask)
    this.subtaskele = ""
  }
  removeSubTask(idx:any)
  {
      var index = this.subTask.indexOf(idx);
      if (index > -1) {
        this.subTask.splice(index, 1);
      }
  }
  selectCategory(category: string){
    this.selectedCategory = category 
  }


  onAddTask(){
    console.log(this.title)
    console.log(this.description)
    console.log(this.selectedCategory)
    console.log(this.subTask)
    console.log(this.selectedDate)
   
    if(this.title==undefined || this.title==''){
      alert("Enter Title");
      return
    }
    const task:Task = {
      title :this.title,
      scheduled_date : this.selectedDate,
      category : this.selectedCategory,
      description : this.description,
      subtasklist : 
             this.subTask
    }
    
    this.store.dispatch(addTask({task}))
    

  }
}
