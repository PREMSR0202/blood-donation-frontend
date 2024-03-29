import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../Components/auth-data';
import { bloodGroup } from '../interfaces/bloodGroup';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private isAdmin = false;
  private token: string = '';
  private userId: string = '';
  private authStateListener = new Subject<boolean>();
  private apiUrl = environment.api;

  isRequiredFieldsFilled: boolean = false;

  // subject for user
  private userSubject = new Subject<User>();
  currentUserData = this.userSubject.asObservable();



  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStateListener() {
    return this.authStateListener.asObservable();
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.userId = '';
    this.authStateListener.next(false);
    localStorage.clear();
    location.reload();
  }

  login(email: string, password: string) {
    const authdata: AuthData = {
      email: email,
      password: password
    };
    console.log(authdata);


    this.http.post(this.apiUrl + 'login', authdata).subscribe(
      (response: any) => {
        console.log(response);
        this.token = response.token;
        this.isAuthenticated = true;
        this.isAdmin = response.user.isAdmin;
        this.userId = response.user._id;
        this.storeAuthData(this.token, this.isAdmin, this.userId);
        this.authStateListener.next(true);
        this.toastr.success('Login Successful !', '', {
          timeOut: 2000,
          closeButton: true
        });
        if (this.isAdmin) {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error, '', {
          timeOut: 2000,
          closeButton: true
        });
      }

    )
  }

  createUser(email: string, password: string, name: string) {
    const authdata: AuthData = {
      email: email,
      password: password,
      name: name
    };
    console.log(authdata);

    this.http.post(this.apiUrl + 'register', authdata).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Registration Successful !', '', {
          timeOut: 3500,
          closeButton: true
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error(error.error.msg, '', {
          timeOut: 3500,
          closeButton: true
        });
        console.log(error);
      }
    )
  }

  storeAuthData(token: string, isAdmin: boolean, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin.toString());
    localStorage.setItem('userId', userId);
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const userId = localStorage.getItem('userId');
    return {
      token: token,
      isAdmin: isAdmin,
      userId: userId
    }
  }

  checkAuthState() {
    const { token, isAdmin, userId } = this.getAuthData();
    if (token && isAdmin && userId) {
      this.isAuthenticated = true;
      this.isAdmin = isAdmin === 'true';
      this.userId = userId;
      this.authStateListener.next(true);
      return true;
    }
    else {
      return false;
    }
  }

  getUser() {
    return this.http.get(this.apiUrl + 'currentUser/')
  }

  getCurrentUser() {
    return this.http.get<User>(this.apiUrl + 'currentUser/').subscribe(
      (response: any) => {
        this.userSubject.next(response);
      },
      (error) => {
        localStorage.clear();
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.userId = '';
        this.authStateListener.next(false);
        this.router.navigate(['/login']);
      }
    )
  }

  user(): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'currentUser/')
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    localStorage.setItem('isAdmin', this.isAdmin.toString());
  }

  hasRequiredFields() {
    return this.http.get<User>(this.apiUrl + 'status/')
  }

  storeBasicInfo(user: User) {
    return this.http.patch(this.apiUrl + 'updateuser/' + user._id, user).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Basic Information Updated !', '', {
          timeOut: 2000,
          closeButton: true
        });
        this.router.navigate(['/blood-group-details']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error, '', {
          timeOut: 2000,
          closeButton: true
        });
      }
    )
  }

  fetchAllBloodGroups(): Observable<bloodGroup[]> {
    return this.http.get<bloodGroup[]>(this.apiUrl + 'allBloodGroup/')
  }

  storeBloodGroup(user: User) {
    return this.http.patch(this.apiUrl + 'updateuser/' + user._id, user).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Blood Group Updated !', '', {
          timeOut: 2000,
          closeButton: true
        });
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error, '', {
          timeOut: 2000,
          closeButton: true
        });
      }
    )
  }


}
