import { AppMaterialModule } from './../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonService } from '../shared/index.shared';
import { CoreModule } from '../core/core.module';
// import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
// import { ChangePwdComponent } from './change-pwd/change-pwd.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'forgetpwd', component: ForgetPwdComponent },
      // {path: 'changepwd', component: ChangePwdComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent, AccountComponent],
  providers: [CommonService]
})
export class AccountModule { }
