import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  public user: any;
  public navs: any;

  alerts = [];
  alertCount = 0;
  alertsInterval: any;
  constructor(
  ) {
    this.navs = [
      // {
      //   title: 'Dashboard',
      //   url: '/admin/dashboard',
      //   icon: 'glyphicon glyphicon-th-large',
      //   enable: true,
      //   visible: true,
      //   subNavs: []
      // },
      {
        title: 'Society',
        url: '/admin/manage-society',
        icon: '../../../assets/img/society.svg',
        enable: true,
        visible: true,
        subNavs: []
      },
      {
        title: 'Resident',
        url: '/admin/manage-resident',
        icon: '../../../assets/img/resident.svg',
        enable: true,
        visible: true,
        subNavs: []
      },
      {
        title: 'Employee',
        url: '/admin/manage-employee',
        icon: '../../../assets/img/society.svg',
        enable: true,
        visible: true,
        subNavs: []
      },
    ];
  }

  ngOnInit() {
  }

  markAsRead(event) {}
  ngOnDestroy() {
  }
}
