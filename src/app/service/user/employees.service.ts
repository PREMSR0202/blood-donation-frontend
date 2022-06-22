import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})


export class EmployeesService {

  private baseURL: string = environment.api;
  
  constructor(private http: HttpClient) { }

  createUser(user : User): Observable<any> {
    return this.http.post(this.baseURL + 'register', user);
  }

  loginUser(email : string , password : string): Observable<any> {
    return this.http.post(this.baseURL + 'login' ,{email:email , password:password})
  }

  fetchCurrentUser(_id : string):Observable<any>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",_id);
    return this.http.get<any>(this.baseURL+ 'currentUser',{params:queryParams});
    
  }

}
