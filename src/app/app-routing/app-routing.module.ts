import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent }      from './../employee/employee.component';
import { WorkLogComponent }      from './../work-log/work-log.component';

const routes: Routes = [
  { 
    path: '', 
    component: EmployeeListComponent 
  },
  { 
    path: 'work-log/:id',
    component: WorkLogComponent 
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
