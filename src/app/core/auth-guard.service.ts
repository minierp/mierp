import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, @Inject('auth') private service) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean {
    let url: string = state.url;
    if (url == '/login') {
      return true;
    }
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.service.checkLogin(url)) {
      return true;
    } else {
      this.service.SetRedirectUre(url);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
