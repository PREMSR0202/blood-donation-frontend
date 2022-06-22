import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '../service/cognito.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private cognitoService: CognitoService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      this.cognitoService.isLoadingSubject.next(true);
    return this.cognitoService.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        this.cognitoService.isLoadingSubject.next(false);
        return true;
      } else {
        this.cognitoService.getUser().then((user) => {
          if (user.attributes['custom:role'] === 'user') {
            this.cognitoService.isLoadingSubject.next(false);
            this.router.navigate(['/']);
          } else {
            this.cognitoService.isLoadingSubject.next(false);
            this.router.navigate(['/admin']);
          }
        });
        return false;
      }
    });
  }
}
