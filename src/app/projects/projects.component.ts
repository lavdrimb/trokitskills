import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Projects } from '../shared/datamodel';
import {MatTableDataSource} from '@angular/material/table';
import  project  from '../shared/project.json'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectForm:  FormGroup | any;
  submitted = false;

  selectedRow = 1;
  index=0;

  displayedColumns: string[] = [ 'id','name'];
  Project: Projects[] = project;
  dataSource = this.Project;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  get projectFormControl() {
    return this.projectForm.controls;
  }

 highlight(row: Projects, i: number){
    const status = this.compareDate(row.endDate).status;

    this.index = i;
    this.selectedRow = row.id;

    this.projectForm = this.fb.group({
      id: [row.id],
      name: [row.name, [Validators.required]],
      startDate: [row.startDate, [Validators.required]],
      endDate: [row.endDate, [Validators.required]],
      status: [status, [Validators.required]]
    });    
  }

  compareDate(status:string){
    const startDate = new Date();
    const endDate = new Date(status);

    if(endDate > startDate){
      status='NOT_ACTIVE'
    }
    if(endDate < startDate){
      status='ACTIVE'
    }
    return { status }
  }

}
