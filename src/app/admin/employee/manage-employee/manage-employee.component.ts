import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  employees: any;
  inProgress = false;

  document: any;
  public progress = 0;

  public importErrorMessage = '';
  colDefs = [
    {
      name: 'id',
      displayName: 'ID',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'Name',
      width: '100px'
    },
    {
      name: 'age',
      displayName: 'Age',
      width: '80px'
    },
    {
      name: 'current_address',
      displayName: 'Current Address',
      width: '120px'
    },
    {
      name: 'adhaar_no',
      displayName: 'Adhaar No',
      width: '100px'
    },
    {
      name: 'police_verify',
      displayName: 'Police Verify',
      width: '80px',
      displayFcn: elem => (elem.police_verify) ? 'Yes' : 'No'
    },
    // {
    //   name: 'mobile',
    //   displayName: 'mobile',
    //   width: '100px'
    // },
    {
      name: 'service_name',
      displayName: 'Service Provide',
      width: '100px'
    },
    {
      name: 'timing',
      displayName: 'Type',
      width: '100px',
      // displayFcn: elem => (elem.timing === '24') ? '24 Hours' : (elem.timing === '12') ? '12 Hours' : 'Part Time'
    },
  ];

  displayedColumns = this.colDefs.map(c => c.name);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private _authService: AuthService,
    private _commonService: CommonService,
    private _adminService: AdminService,
    private _router: Router,
    private _datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.getEmployeesList();
    this.displayedColumns.push('action');
    this._adminService.selectedEmployee = {};
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.employees.filter = filterValue;
  }

  getEmployeesList() {
    this.inProgress = true;
    this._adminService.getEmployeesList(
      res => {
        const resultArray = res.data;
        this.employees = new MatTableDataSource<any>(resultArray);
        this.employees.paginator = this.paginator;
        this.inProgress = false;
      },
      err => {
        this.inProgress = false;
      }
    );
  }

  public getFormattedDate(elem) {
    return this._datePipe.transform(elem, 'MM-dd-yyyy');
  }

  public addEmployee() {
    this._router.navigate(['/admin/add-employee']);
  }

  public editEmployee(employee) {
    this._adminService.getEmployeeDetailsById(
      employee.id,
      res => {
        this._adminService.selectedEmployee = res.data;
        this._router.navigate(['/admin/edit-employee']);
      },
      err => {
        this._commonService.showError(
          'Problem Fetching Employee Details'
        );
      }
    );
  }

  public viewEmployee(employee) {
    this._adminService.getEmployeeDetailsById(
      employee.id,
      res => {
        this._adminService.selectedEmployee = res.data;
        this._router.navigate(['/admin/view-employee']);
      },
      err => {
        this._commonService.showError(
          'Problem Fetching Employee Details'
        );
      }
    );
  }

  public deleteEmployee(employee) {
    this._commonService.openConfirmDialog(
      {
        title: 'Delete Employee',
        content: 'Are you sure to delete this employee?'
      },
      () => {
        this._adminService.deleteEmployeeById(
          employee.id,
          data => {
            this.getEmployeesList();
            this._commonService.showMessage(
              'Employee has been deleted successfully'
            );
          },
          err => {}
        );
      }
    );
  }

    // ------------------- DOC Upload ------------------------

    handleFileInput(files: any) {
      const file = files[0];
        // if (file.type === 'application/csv') {
        this.document = {
          name: file.name,
          size: file.size,
          progress: 0,
          uploadedDate: new Date(),
          file: file
        };
        this.confirmDocUpload();
        // }
        //  else {
        //   this._commonService.showError('Only upload CSV file');
        // }
    }

  public confirmDocUpload() {
    this._commonService.openConfirmDialog(
      {
        title: 'Upload File',
        content: 'Are You sure you want to upload this file?'
      },
      () => {
        this.uploadDocument(this.document);
      }
    );
  }

  uploadDocument(document) {
    this.inProgress = true;

    if (document.file) {
      this._adminService.uploadDoc(
        'employee_csv',
        document.file,
        progress => {
          this.document.progress = progress;
          this.progress = progress;
        },
        res => {
          this.inProgress = false;
          if (res.success) {
            this._commonService.showMessage('File Uploaded Successfully');
            this.getEmployeesList();
          }
        },
        err => {
          this.inProgress = false;
          this._commonService.showError(err.message);
        }
      );
    } else {
      this.inProgress = false;
      this._commonService.showError('File is required');
    }
  }

}
