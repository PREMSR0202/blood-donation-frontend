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
export class AdminGuard implements CanActivate {
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
    return this.cognitoService.getUser().then((user) => {
      this.cognitoService.isLoadingSubject.next(false);
      if (user && user.attributes['custom:role'] === 'admin') {
        return true;
      } else {
        this.router.navigate(['/'], {
          queryParams: { state: 'not-an-admin' },
        });
        return false;
      }
    });
  }
}
