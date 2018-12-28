// import { NotificationService } from '../../master-partner/services/notification.service';
import { CommonService } from './../services/common.service';
import { AuthService } from './../../core/auth/auth.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// declare var $;
import * as $ from 'jquery';
// import { SecurityService } from '../../core/auth/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  ntfInProgress = false;
  canViewNotifications: boolean;
  @Output()
  markAsRead = new EventEmitter();

  @Input()
  alerts: any;
  @Input()
  alertCount: any;
  constructor(
    private authService: AuthService,
    private _router: Router,
    private _common: CommonService,
    // private _notifyService: NotificationService,
    private route: ActivatedRoute,
    // private _securityService: SecurityService
  ) {
    $(document).ready(function() {
      // Show hide popover
      $('.userbtn').click(function(event) {
        if (event.target.className !== 'mark-read') {
          $(this)
            .find('.usermenu')
            .slideToggle('fast');
        }
      });
    });
    $(document).on('click', function(event) {
      const $trigger = $('.userbtn');
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $('.usermenu').slideUp('fast');
      }
    });
    // if (this._securityService.isNotificationEnable()) {
    //   this.canViewNotifications = true;
    // } else {
    //   this.canViewNotifications = false;
    // }
    // this.getServiceList();
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.authService.user.subscribe(usr => {
      this.user = usr;
    });
    this.getServiceList();
  }

  clickMarkAsRead(alert) {
    this.markAsRead.emit(alert);
    // const data: any = {
    //   id: alert.id,
    //   is_read: true
    // };
    // this._notifyService.updateReadNotifications(
    //   data,
    //   res => {
    //     this.getNotificationsList();
    //   },
    //   err => {}
    // );
  }

  getNotificationsList() {
    // const paramData = {
    //   params: {
    //     pageNumber: 1,
    //     pageSize: 5,
    //     is_read: false
    //   }
    // };
    // this._notifyService.fetchNotifications(
    //   paramData,
    //   data => {
    //     this.alertCount = data.count;
    //     this.alerts = data.result;
    //   },
    //   err => {}
    // );
  }

  allNotification() {
    // this._common.gotoPage('all-notification');
  }

  public gotoUserProfile() {
    // this._common.gotoPage('profile');
  }

  public gotoChangePassword() {
    // this._common.gotoPage('change-pwd');
  }

  // openMenu() {
  //   $('ul.usermenu').slideToggle();
  // }
  // toggleMenu() {
  //   $('#slidingDiv').animate({
  //     width: 'toggle'
  //   });
  // }

  // $('.userbtn').click(function () {
  //   $('ul.usermenu').slideToggle();
  // });
  getServiceList() {}

  onclick(id) {
    // this.cpService.getService(
    //   id,
    //   data => {
    //     this.cpService.selectedService = new CpService(data.result.serviceId);
    //     this.cpService.selectedService.general = data.result;
    //     this._common.gotoPage('edit-service');
    //     // console.log(data.result);
    //   },
    //   err => {}
    // );
  }
}
