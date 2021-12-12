import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verifyAuthentication().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['./auth/login']);
        }
      })
    );

    //   if (this.authService.auth.id) {
    //     return true
    //   }

    // console.log('Blocked by AuthGuard - CanActivate');
    // return false;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    // return this.authService.verifyAuthentication();


    return this.authService.verifyAuthentication().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['./auth/login']);
        }
      })
    )

    //   if (this.authService.auth.id) {
    //     return true
    //   }

    //   console.log('Blocked by AuthGuard - CanLoad');

    // return false;
  }
}
