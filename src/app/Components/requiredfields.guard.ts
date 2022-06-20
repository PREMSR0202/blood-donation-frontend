import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequiredfieldsGuard implements CanActivate {

  constructor(public router: Router, public auth: AuthService) {

   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.auth.hasRequiredFields().subscribe(
        (response : any) => {
          this.router.navigate(['/']);
          return true;
        },
        (error : any) => {
          
          this.router.navigate([error.error.redirectRoute]);          
          return false;
        }
      )

      // console.log(currentUser);

      return true;
  }
  
}
