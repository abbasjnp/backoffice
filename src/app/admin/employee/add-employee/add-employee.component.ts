import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  user: any;
  public baseUrl = environment.baseUrl;
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
    service_name: 'Maid',
    timing: 'part',
    job_location: []
  };
  inProgress = false;
  public societyLookup = [];
  profile_pic: any = {
    file: ''
  };
  profile_document: any = {
    file: ''
  };
  public timings: any = [{
    name: '24 Hours',
    val: '24'
  },
  {
    name: '12 Hours',
    val: '12'
  },
  {
    name: 'Part Time',
    val: 'part'
  }];
  allTimings: any = [{
    name: '24 Hours',
    val: '24'
  },
  {
    name: '12 Hours',
    val: '12'
  },
  {
    name: 'Part Time',
    val: 'part'
  }];

  // singleJobLocation = [{
  //   socity_id: null,
  //   tower_no: '',
  //   flat_no: null
  // }];
  multiJobLocation = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private adminService: AdminService,
  ) {
    if (this.adminService.selectedEmployee && this.adminService.selectedEmployee.id && this.adminService.selectedEmployee.id !== null ) {
      this.isNewEmployee = false;
      this.employeeRegisterObj = this.adminService.selectedEmployee;
      this.employeeRegisterObj.job_location = this.adminService.selectedEmployee.work_details;
      delete this.employeeRegisterObj.work_details;
      this.getTimingLookupByService();
    }
    this.getLookups();
  }

  getLookups() {
    this.adminService.getSocietyNamesLookup(
      res => {
        this.societyLookup = res.data;
      },
      err => {
        // this.formLoaded = true;
      }
    );
  }

  initMultiJobLocation(_length, _type, _array) {
    let i = 0;
    if (this.isNewEmployee) {
      i = 0;
    } else if (_type.toLowerCase() === 'part') {
      if (_length < 10) {
        i = _length + 1;
      } else {
        this.multiJobLocation = _array;
        return;
      }
    } else if (_length === 1) {
      i = i + 1;
    }
    // else {
    //   // this.multiJobLocation = _array;
    //   // return;
    // }
    this.multiJobLocation = _array;
    for (let j = i; j <= 9; j++) {
      this.multiJobLocation.push({
        socity_id: null,
        tower_no: '',
        flat_no: null
      });
    }
    if (!this.isNewEmployee && _type.toLowerCase() === 'part') {
      this.employeeRegisterObj.job_location = this.multiJobLocation;
    }
  }

  getTimingLookupByService() {
    const timing = [];
    const sName = this.employeeRegisterObj.service_name.toLowerCase();

    if (sName === 'cook' || sName === 'car cleaner') {
      timing.push(this.allTimings[2]);
    } else if (sName === 'child care' || sName === 'elder care') {
      timing.push(this.allTimings[1]);
    } else {
      timing.push(this.allTimings[0]); // 24
      timing.push(this.allTimings[1]); // 12
      timing.push(this.allTimings[2]); // part
    }
    this.timings = timing;
    this.employeeRegisterObj.timing = this.timings[0];
  }

  getjobLocationLookupByTiming(timing) {
    if (timing.toLowerCase() === 'part') {
      this.employeeRegisterObj.job_location = this.multiJobLocation;
    } else {
      let arr = [];
      arr.push(this.multiJobLocation[0]);
      this.employeeRegisterObj.job_location = arr;
    }
  }

  addWorkLocation() {
    this.employeeRegisterObj.job_location.push({
      socity_id: null,
      tower_no: '',
      flat_no: null
    });
  }
  removeWorkLocation(_index) {
    const removedElement = this.employeeRegisterObj.job_location.splice(_index, 1);
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  employeeRegister(employeeRegisterData) {
    let url = 'employee/';
    let method = 'POST';
    const formData = this.processEmployeeFormData(employeeRegisterData);
    this.adminService.uploadEmployeePicAndDoc(
      url,
      method,
      formData,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.router.navigate(['/admin/manage-employee']);
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        // this.commonService.showError(err.message);
      }
    );
  }

  employeeUpdate(employeeRegisterData) {
    const id = employeeRegisterData.id;
    delete employeeRegisterData.id;
    let url = 'employee/' + id + '/';
    let method = 'PUT';
    const formData = this.processEmployeeFormData(employeeRegisterData);
    this.adminService.uploadEmployeePicAndDoc(
      url,
      method,
      formData,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.router.navigate(['/admin/manage-employee']);
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        // this.commonService.showError(err.message);
      }
    );
  }

  processEmployeeFormData(employeeRegisterData) {
    delete employeeRegisterData.profile_pic;
    delete employeeRegisterData.document;
    const formData: FormData = new FormData();
    if (this.profile_pic.file) {
      formData.append('profile_pic', this.profile_pic.file);
    }
    if (this.profile_document.file) {
      formData.append('document', this.profile_document.file);
    }
    for (let [key, value] of Object.entries(employeeRegisterData)) {
      formData.append(key, JSON.stringify(value));
    }
    return formData;
  }

  cancel() {
    this.router.navigate(['/admin/manage-employee']);
  }

  // ------------------- DOC Upload ------------------------

  handleFileInput(files: any, type) {
    const file = files[0];
    if (type === 'p') {
      this.profile_pic = {
        name: file.name,
        size: file.size,
        progress: 0,
        uploadedDate: new Date(),
        file: file
      };
    } else if (type === 'd') {
      this.profile_document = {
        name: file.name,
        size: file.size,
        progress: 0,
        uploadedDate: new Date(),
        file: file
      };
    }
  }

  ngOnInit() {
    this.initMultiJobLocation(this.employeeRegisterObj.job_location.length,
      this.employeeRegisterObj.timing, this.employeeRegisterObj.job_location);
  }
}
