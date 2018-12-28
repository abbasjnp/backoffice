import { RequestCacheService } from './request-cache.service';
import { Observable, of } from 'rxjs';
import { Role, RoleResponse } from './interfaces/Role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { DataService } from './http/data.service';
import { environment } from '../../environments/environment';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private roles$: Observable<Array<Role>>;
  serviceUrl = environment.baseUrl + 'horizon/';

  constructor(
    private http: HttpClient,
    private cache: RequestCacheService,
    private dataService: DataService
  ) {}
  // TODO: Need to revist here [Hirendra]
  // TODO: Need to revist here [Abhishek]
  get roles() {
    if (this.cache.get('roles')) {
      // if (!this.roles$) {
      const _roles: Array<Role> = this.cache.get('roles');
      return of(_roles);
    }

    return this.requestRoles(); // .pipe(shareReplay(CACHE_SIZE));
    // return this.roles$;
  }

  private requestRoles() {
    return this.http.get<RoleResponse>(this.serviceUrl + 'getRole').pipe(
      map(res => {
        this.cache.set('roles', res.object);
        return res.object;
      })
    );
  }
}
