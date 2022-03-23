import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import  employee  from '../shared/employee.json';
import { Projects, Employee } from '../shared/datamodel';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  @ViewChild(MatPaginator, { read: true })  paginator!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  registerForm:  FormGroup | any;
  submitted = false;

  selectedProjectRow =1
  selectedRow = 1;
  index=0;

  displayedColumns: string[] = [ 'id', 'firstName', 'lastName'];
  displayedProjectsColumns: string[] = [ 'id', 'name'];

  Employees : any = employee;
  projectsDataSource : Projects[]=[];
  dataSource = new MatTableDataSource(this.Employees);

  constructor(private fb: FormBuilder) { }
 
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
    })
  
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  create() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.dataSource.data.push(this.registerForm.value);
      this.dataSource._updateChangeSubscription();
    }
  }
  
  edit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.Employees[this.index] = this.registerForm.value;
      this.dataSource = new MatTableDataSource(this.Employees);
    }
  }

  highlight(row: Employee, i:number){
    this.index = i;
    this.selectedRow = row.id;

    this.registerForm = this.fb.group({
      id: [row.id],
      firstName: [row.firstName, [Validators.required]],
      lastName: [row.lastName, [Validators.required]],
      title: [row.title, [Validators.required]],
      dateOfBirth: [row.dateOfBirth, [Validators.required]],
    });
      this.showProjects(row, i);
  }

  showProjects(row:Employee, i: number){
      this.projectsDataSource.splice(0);     
        employee.map( data => {
           if(data.id== row.id){
            data.projets.map( (doc: Projects) => {
              this.projectsDataSource.push(doc);
              this.table.renderRows();
            })
          }
        })
    }

}
