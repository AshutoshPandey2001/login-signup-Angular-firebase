import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivateGuardGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate() {
    let isLogin = localStorage.getItem('token');

    if (!isLogin) {
      this.route.navigate(['/Login']);
    }
    return true;
  }
}
