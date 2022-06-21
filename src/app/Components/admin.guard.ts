import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {      
    this.auth.user().subscribe(
      (response : any) => {
        if (response.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      },
      (error : any) => {
        this.router.navigate(['/login']);
        return false;
      }
    )
    return true;
  }
  
}
