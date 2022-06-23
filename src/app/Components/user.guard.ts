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
export class UserGuard implements CanActivate {
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
      if (user && user.attributes['custom:role'] === 'user') {        
        this.cognitoService.isLoadingSubject.next(false);
        return true;
      } 
      else {
        this.cognitoService.isLoadingSubject.next(true);
        this.router.navigate(['/admin'], {
          queryParams: { state: 'not-a-user' },
        });
        return false;
      }
    });
  }
}
