import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAdmin;
    this.auth.user().subscribe(
      (response : any) => {
        isAdmin = response.isAdmin;
        if (isAdmin) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      },
      (error : any) => {
        this.router.navigate(['/login']);
        return false;
      }
    )
    return true;
  }
  
}
