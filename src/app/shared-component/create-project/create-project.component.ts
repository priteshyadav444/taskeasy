import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppState } from 'src/app/app-store/app.state';
import { addProjectStart, updateProjectStart } from 'src/app/component/dashboard/state/project.action';
import { setLoadingSpinner } from 'src/app/component/shared/state/Shared/shared.actions';
import { Project } from 'src/app/models/projects.models';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  theme_colour:any = "#1976D2";
  minimumDate:any = new Date();
  projectForm!: FormGroup;

  constructor(
    public config: DynamicDialogConfig,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const data = this.config?.data;
    this.initForm(data) 
  }

  initForm(data) {
    this.projectForm = this.fb.group({
      _id: [''  || data?._id],
      project_title: ['' || data?.project_title],
      project_deadline: [ null || new Date(data?.project_deadline)],
      total_tasks: ['' || data?.total_tasks],
      total_completed_tasks: ['' || data?.total_completed_tasks],
      theme_colour: ['' || data?.theme_colour],
      task: ['' || data?.task]
    }) 
  }

  colorChange(event) {

  }

  onSubmit() {
    const title = this.projectForm.controls['project_title'].value;
    const deadline = this.projectForm.controls['project_deadline'].value;
    if (title == "" || title== null) {
      return alert('Enter Title');
    }
    if (deadline == "" || deadline == null) {
      return alert('Select Deadline');
    }
    const project:Project = this.projectForm?.value;
    if (project?._id) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(updateProjectStart({project}));
    } else {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(addProjectStart({project}))
      this.projectForm.reset();
    }
  }

  get projectData() {
    console.log(this.projectForm.value)
    return this.projectForm.value
  }

}
