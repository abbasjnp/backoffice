import { DataService } from './../http/data.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}
  public user = new BehaviorSubject<any>(null);

  authUrl = environment.baseUrl + 'authentication/login/';

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private router: Router, private dataService: DataService) {
    this.reload();
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
    this.removeUser();
  }

  public login(user, successCall, errorCall) {
    this.dataService.post(this.authUrl, user).subscribe(
      (res: any) => {
        if (res.data && res.data.success) {
            this.loggedIn.next(true);
            this.setUser(res);
            successCall(res);
        } else {
          this.loggedIn.next(false);
          errorCall(res.error);
        }
      },
      err => {
        this.loggedIn.next(false);
        errorCall(err);
      }
    );
  }

  // data: {
  // access_token: "cqHo3iMal8tLWGprV7cAgmZIO2Us4V"
  // client_id: "KoOV9jmpYKt521clJVnprsLWtiAy52pg5HeY6TUa"
  // client_secret: "u3ELxnhtSq9P8JuPLwGubrSoCcxON01pXq7xrkcsGrhLt8qm6B69D8rGk0oRYWeN4cIUhXlKlpkA0djBxgoqG3xN8hcNkJK6P7XrUn4fY9bqxhlSYAilqakWfJD7jIFB"
  // email: "maidsncar@gmail.com"
  // expires_in: 3600000
  // name: "admin"
  // refresh_token: "Nr2tbfVdkaoq9D1PTZKRJmDXAsl3uQ"
  // success: true
  // token_type: "Bearer"

  setUser(res) {
    this.user.next({
      name: res.data.name,
      email: res.data.email,
    });
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('token', JSON.stringify(res.data));
    localStorage.setItem('name', res.data.name);
    localStorage.setItem('email', res.data.email);
  }

  removeUser() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  loadModulePageByUserType(userType) {
      this.router.navigate(['/admin/dashboard']);
  }

  reload() {
    let name = null,
      email = null,
      token = null;
    if (localStorage.getItem('name')) {
      name = localStorage.getItem('name');
    }
    if (localStorage.getItem('email')) {
      email = localStorage.getItem('email');
    }
    // if (localStorage.getItem('token')) {
    //   token = JSON.parse(localStorage.getItem('token'));
    // }
    if (
      name &&
      email
    ) {
      this.user.next({
        name: name,
        email: email
      });
      this.loadModulePageByUserType('admin');
    } else {
      this.router.navigate(['/']);
    }
  }
  public getToken() {
    const tokenObj = JSON.parse(localStorage.getItem('token'));
    return tokenObj.token_type + ' ' + tokenObj.access_token;
  }
}
