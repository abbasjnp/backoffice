import { AccountModule } from './../account/account.module';
import { CanDeactivateGuard } from './../core/can-deactivate.gaurd';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddSocietyComponent } from './society/add-society/add-society.component';
import { ManageSocietyComponent } from './society/manage-society/manage-society.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ManageEmployeeComponent } from './employee/manage-employee/manage-employee.component';
import { ManageResidentComponent } from './resident/manage-resident/manage-resident.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-society', component: ManageSocietyComponent },
      { path: 'add-society', component: AddSocietyComponent },
      { path: 'edit-society', component: AddSocietyComponent },
      { path: 'manage-resident', component: ManageResidentComponent },
      { path: 'manage-employee', component: ManageEmployeeComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'edit-employee', component: AddEmployeeComponent },
      { path: 'view-employee', component: ViewEmployeeComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    AccountModule
  ],
  declarations: [
    DashboardComponent,
    AdminComponent,
    AddSocietyComponent,
    ManageSocietyComponent,
    AddEmployeeComponent,
    ManageEmployeeComponent,
    ManageResidentComponent,
    ViewEmployeeComponent
  ],
  providers: [CanDeactivateGuard, DatePipe]
})
export class AdminModule { }
