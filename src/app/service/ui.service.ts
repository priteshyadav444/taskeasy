import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask:boolean = false;
  private showAddProject:boolean = false
  private subject = new Subject<any>();
  private projectsubject = new Subject<any>();

  constructor() { }
  toggleAddTask():void{
    this.showAddTask = !this.showAddTask
    this.subject.next(this.showAddTask)
  }
  toggleAddProject():void{
    
    this.showAddProject = !this.showAddProject
    console.log(this.showAddProject)
    this.projectsubject.next(this.showAddProject)
  }
  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
  onProjectToggle():Observable<any>{
    return this.projectsubject.asObservable();
  }
}
