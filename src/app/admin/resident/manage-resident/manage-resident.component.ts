import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-resident',
  templateUrl: './manage-resident.component.html',
  styleUrls: ['./manage-resident.component.css']
})
export class ManageResidentComponent implements OnInit {
  residents: any;
  inProgress = false;

  public importErrorMessage = '';
  colDefs = [
    {
      name: 'id',
      displayName: 'ID',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'Full Name',
      width: '100px'
    },
    {
      name: 'mobile',
      displayName: 'Mobile',
      width: '100px'
    },
    {
      name: 'adults',
      displayName: 'Total Family Member',
      width: '170px',
      displayFcn: elem => elem.adults + ' Adults, ' + elem.kids + ' Kids, ' + elem.infant + ' Infant'
    },
    // {
    //   name: 'landline',
    //   displayName: 'Landline',
    //   width: '100px'
    // },
    {
      name: 'tower',
      displayName: 'Tower',
      width: '100px'
    },
    {
      name: 'flat_no',
      displayName: 'Flat No',
      width: '100px'
    },
    {
      name: 'flat_type',
      displayName: 'Flat Type',
      width: '100px'
    },
    {
      name: 'residents_type',
      displayName: 'Type',
      width: '100px',
      displayFcn: elem => this.getResidentType(elem.residents_type)
    },
    {
      name: 'agreement_start_date',
      displayName: 'Agreement Date',
      width: '170px',
      displayFcn: elem => this.getFormattedDate(elem.agreement_start_date) + ' to ' + this.getFormattedDate(elem.agreement_end_date)
    },
    // {
    //   name: 'agreement_end_date',
    //   displayName: 'agreement_end_date',
    //   width: '100px'
    // },
    {
      name: 'owner_name',
      displayName: 'Owner Name',
      width: '100px'
    },
    {
      name: 'owner_number',
      displayName: 'Owner Number',
      width: '120px'
    },
    {
      name: 'adhaar_no',
      displayName: 'ID Proof',
      width: '100px',
      displayFcn: elem => (elem.adhaar_no && elem.adhaar_no > 0) ? 'Aadhaar Card' : ''
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
    this.getResidentsList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.residents.filter = filterValue;
  }

  getResidentType(type) {
    if ( type === 'o' || type === 'O') {
      return 'Owner';
    } else if ( type === 't' || type === 'T') {
      return 'Tenant';
    } else {
      return type;
    }
  }

  getResidentsList() {
    this.inProgress = true;
    this._adminService.getResidentsList(
      res => {
        const resultArray = res.data;
        this.residents = new MatTableDataSource<any>(resultArray);
        this.residents.paginator = this.paginator;
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

}
