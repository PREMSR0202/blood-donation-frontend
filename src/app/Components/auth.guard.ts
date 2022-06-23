import { CognitoService } from '../service/cognito.service';
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
export class AuthGuard implements CanActivate {
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
      if (isAuthenticated) {        
        return true;
      } else {
        this.cognitoService.isLoadingSubject.next(false);
        this.router.navigate(['/login'], {
          queryParams: { state: 'not-authenticated' },
        });
        return false;
      }
    });
  }
}
