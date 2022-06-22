import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeseditService {

  private baseURL: string = environment.api;
  
  constructor(private http: HttpClient) { }

  updateuser(id : string , user : User): Observable<any>{
    return this.http.patch(`${this.baseURL}updateuser/${id}`,user);
  }

  deleteuser(id : string): Observable<any>{
    return this.http.delete( `${this.baseURL}deleteuser/${id}`)
  }

  allusers():Observable<any>{
  return this.http.get(this.baseURL + 'allusers').pipe(
      map( (data: any) => {
        console.log(data);
        return data;
        })
      );
  }
}
