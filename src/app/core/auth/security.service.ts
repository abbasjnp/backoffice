import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public user: any;
  public security: any;
  constructor(private _authService: AuthService) {
    this._authService.user.subscribe(usr => {
      this.user = usr;
      this.security = usr.privileges;
    });
  }

  // ------------ MP Modules ------------
  isAdminCPManagementEnable() {
    return <boolean>(
      (this.security['create_cp'] ||
        this.security['view_cp_all'] ||
        this.security['view_cp_self'] ||
        this.security['modify_cp_all'] ||
        this.security['modify_cp_self'])
    );
  }
  isAdminCreateCPEnable() {
    return <boolean>this.security['create_cp'];
  }
  isAdminManageCPEnable() {
    return <boolean>(
      (this.security['view_cp_all'] ||
        this.security['view_cp_self'] ||
        this.security['modify_cp_all'] ||
        this.security['modify_cp_self'])
    );
  }
  isAdminModifyCPEnable() {
    return <boolean>(
      (this.security['modify_cp_all'] || this.security['modify_cp_self'])
    );
  }

  isAdminServiceManagementEnable() {
    return <boolean>(
      (this.security['create_service_all'] ||
        this.security['create_service_self'] ||
        this.security['modify_service_all_cp'] ||
        this.security['modify_service_self_cp'] ||
        this.security['view_service_all_cp'] ||
        this.security['view_service_self_cp'] ||
        this.security['review_service_all'] ||
        this.security['review_service_self'])
    );
  }
  isAdminCreateServiceEnable() {
    return <boolean>(
      (this.security['create_service_all'] ||
        this.security['create_service_self'])
    );
  }
  isAdminModifyServiceEnable() {
    return <boolean>(
      (this.security['modify_service_all_cp'] ||
        this.security['modify_service_self_cp'])
    );
  }
  isAdminManageServicesEnable() {
    return <boolean>(
      (this.security['modify_service_all_cp'] ||
        this.security['modify_service_self_cp'] ||
        this.security['view_service_all_cp'] ||
        this.security['view_service_self_cp'])
    );
  }
  isAdminReviewServicesEnable() {
    return <boolean>(
      (this.security['review_service_all'] ||
        this.security['review_service_self'])
    );
  }

  isAdminUserManagementEnable() {
    return <boolean>(
      (this.security['create_user_all'] ||
        this.security['view_user_all_cp'] ||
        this.security['view_user_self_cp'] ||
        this.security['modify_user_all_cp'] ||
        this.security['modify_user_self_cp'] ||
        this.security['view_group'] ||
        this.security['create_group'] ||
        this.security['modify_group'])
    );
  }
  isAdminCreateUserEnable() {
    return <boolean>this.security['create_user_all'];
  }
  isAdminManageUsersEnable() {
    return <boolean>(
      (this.security['view_user_all_cp'] ||
        this.security['view_user_self_cp'] ||
        this.security['modify_user_all_cp'] ||
        this.security['modify_user_self_cp'])
    );
  }
  isAdminModifyUserEnable() {
    return <boolean>(
      (this.security['modify_user_all_cp'] ||
        this.security['modify_user_self_cp'])
    );
  }
  isAdminModifyAllUserEnable() {
    return <boolean>this.security['modify_user_all_cp'];
  }
  isAdminCreateGroupEnable() {
    return <boolean>this.security['create_group'];
  }
  isAdminManageGroupsEnable() {
    return <boolean>(
      (this.security['view_group'] || this.security['modify_group'])
    );
  }
  isAdminModifyGroupEnable() {
    return <boolean>this.security['modify_group'];
  }

  // ------------ Common Modules ------------
  isComplaintsDashboardEnable() {
    return <boolean>this.security['complaints_dashboard'];
  }
  isRevenueDashboardEnable() {
    return <boolean>this.security['revenue_dashboard'];
  }
  isImportUtilityEnable() {
    return <boolean>this.security['import_utility'];
  }
  isHelpEnable() {
    return <boolean>this.security['view_help'];
  }
  isNotificationEnable() {
    return <boolean>(
      (this.security['view_notification_cp'] ||
        this.security['view_notification_mp'])
    );
  }

  // ------------ CP Modules ------------
  isCPServiceManagementEnable() {
    return <boolean>(
      (this.security['create_service'] ||
        this.security['modify_service_all'] ||
        this.security['modify_service_self'] ||
        this.security['view_service_all'] ||
        this.security['view_service_self'])
    );
  }
  isCPCreateServiceEnable() {
    return <boolean>this.security['create_service'];
  }
  isCPManageServicesEnable() {
    return <boolean>(
      (this.security['modify_service_all'] ||
        this.security['modify_service_self'] ||
        this.security['view_service_all'] ||
        this.security['view_service_self'])
    );
  }
  isCPModifyServiceEnable() {
    return <boolean>(
      (this.security['modify_service_all'] ||
        this.security['modify_service_self'])
    );
  }

  isCPUserManagementEnable() {
    return <boolean>(
      (this.security['create_user'] ||
        this.security['view_user_all'] ||
        this.security['view_user_self'] ||
        this.security['modify_user_all'] ||
        this.security['modify_user_self'])
    );
  }
  isCPCreateUserEnable() {
    return <boolean>this.security['create_user'];
  }
  isCPManageUsersEnable() {
    return <boolean>(
      (this.security['view_user_all'] ||
        this.security['view_user_self'] ||
        this.security['modify_user_all'] ||
        this.security['modify_user_self'])
    );
  }
  isCPModifyUserEnable() {
    return <boolean>(
      (this.security['modify_user_all'] || this.security['modify_user_self'])
    );
  }
  isCPEditProfileEnable() {
    return <boolean>this.security['modify_cp_self'];
  }
}
