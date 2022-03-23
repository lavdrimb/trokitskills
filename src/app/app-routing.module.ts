import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
     path:'',
     component:HomeComponent,
     pathMatch:'full'
  },
  {
    path:'employees',
    loadChildren: () => import('../app/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path:'projects',
    loadChildren: () => import('../app/projects/projects.module').then(m => m.ProjectsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
