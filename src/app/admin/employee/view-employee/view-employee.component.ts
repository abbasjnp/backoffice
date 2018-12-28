import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  user: any;
  isNewEmployee = true;
  employeeRegisterObj: any = {
    name: '',
    adhaar_no: '',
    mobile: '',
    family_member_no: '',
    emergency_no: '',
    land_lord_no: '',
    land_lord_address: '',
    current_address: '',
    permanent_address: '',
    age: null,
    police_verify: null,
    service_name: '',
    timing: '',
    work_details: [],
    profile_pic: '',
    document: ''
  };
  inProgress = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private adminService: AdminService,
  ) {
  }

  cancel() {
    this.router.navigate(['/admin/manage-employee']);
  }

  editEmployee() {
    this.router.navigate(['/admin/edit-employee']);
  }

  public deleteEmployee() {
    this.commonService.openConfirmDialog(
      {
        title: 'Delete Employee',
        content: 'Are you sure to delete this employee?'
      },
      () => {
        this.adminService.deleteEmployeeById(
          this.adminService.selectedEmployee.id,
          data => {
            this.commonService.showMessage(
              'Employee has been deleted successfully'
            );
            this.router.navigate(['/admin/manage-employee']);
          },
          err => {
            this.commonService.showError(
              'Problem deleting Employee'
            );
          }
        );
      }
    );
  }

  ngOnInit() {
    this.adminService.selectedEmployee.profile_pic = environment.baseUrl + this.adminService.selectedEmployee.profile_pic;
    this.adminService.selectedEmployee.document = environment.baseUrl + this.adminService.selectedEmployee.document;
    this.employeeRegisterObj = this.adminService.selectedEmployee;
  }
}
