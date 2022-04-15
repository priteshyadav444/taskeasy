import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UiService } from 'src/app/main/service/ui.service';
import { Task } from 'src/app/Models/task';

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
  subtaskele:string=""
  selectedDate!:Date 
  @Output() btnClick:EventEmitter <Task> = new EventEmitter();

  constructor(private uiService:UiService) {
    this.uiService.onToggle().subscribe((value)=> (this.showDailog = value))
    this.selectedCategory = this.selectedCategory==null?"No Category":this.selectedCategory
    this.category = [
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
    console.log(stask)
    if(stask==''){
      return
    }
    this.subTask.push(stask)
    this.subtaskele = ""
    console.log(this.subTask)
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
}
