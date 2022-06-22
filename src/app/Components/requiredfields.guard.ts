import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { CognitoService } from '../service/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class RequiredfieldsGuard implements CanActivate {

  constructor(public router: Router, public auth: AuthService, private cognito: CognitoService) {

   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.cognito.isLoadingSubject.next(true);
      console.log(this.auth.isRequiredFieldsFilled,"req");      
      if(!this.auth.isRequiredFieldsFilled)
        this.auth.hasRequiredFields().subscribe(
          (response : any) => {
            this.auth.isRequiredFieldsFilled = true;            
            this.cognito.isLoadingSubject.next(false);
            return true;
          },
          (error : any) => {
            // alert(error.message);
            this.router.navigate([error.error.redirectRoute]);          
            this.cognito.isLoadingSubject.next(false);
            return false;
          }
        )
      else
      {
        this.cognito.isLoadingSubject.next(false);
        return true;
      }

      // console.log(currentUser);

      return true;
  }
  
}
