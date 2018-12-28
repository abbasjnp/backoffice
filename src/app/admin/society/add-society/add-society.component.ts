import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-society',
  templateUrl: './add-society.component.html',
  styleUrls: ['./add-society.component.css']
})
export class AddSocietyComponent implements OnInit {
  user: any;
  isNewSociety = true;
  societyRegisterObj: any = {
    id: null,
    name: '',
    total_towers: null,
    state: '',
    city: '',
    area: '',
    pincode: null,
  };
  inProgress = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private adminService: AdminService,
  ) {
    if (this.adminService.selectedSociety && this.adminService.selectedSociety.id && this.adminService.selectedSociety.id !== null ) {
      this.isNewSociety = false;
      this.societyRegisterObj = this.adminService.selectedSociety;
    }
  }

  societyRegister(societyRegisterData) {
    this.adminService.addSociety(
      societyRegisterData,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.router.navigate(['/admin/manage-society']);
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        // this.commonService.showError(err.message);
      }
    );
  }

  societyUpdate(societyRegisterData) {
    const id = societyRegisterData.id;
    delete societyRegisterData.id;
    this.adminService.updateSociety(
      id,
      societyRegisterData,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.router.navigate(['/admin/manage-society']);
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        // this.commonService.showError(err.message);
      }
    );
  }

  cancel() {
    this.router.navigate(['/admin/manage-society']);
  }

  ngOnInit() {
  }
}
