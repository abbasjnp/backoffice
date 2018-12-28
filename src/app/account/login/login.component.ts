import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/index.shared';
import { AuthService } from '../../core/index.core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isError = <boolean>false;
  constructor(
    private router: Router,
    private _commonService: CommonService,
    private authService: AuthService,
    public formBuilder: FormBuilder
  ) {
  }

  getLogin() {
    this.isError = false;
    const encLoginDetails = {
      'cipher_text': btoa(this.loginForm.controls['email'].value + ':' + this.loginForm.controls['password'].value)
    };
    this.authService.login(
      encLoginDetails,
      res => {
        if (res.data && res.data.success) {
          this.authService.loadModulePageByUserType(
            'admin'
          );
          this._commonService.showMessage('Login successfully');
        }
      },
      err => {
        this.isError = true;
        this._commonService.showError(err);
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['maidsncar@gmail.com', [Validators.required, Validators.email]],
        password: ['maidsncar', [Validators.required]]
      }
    );
  }
}
