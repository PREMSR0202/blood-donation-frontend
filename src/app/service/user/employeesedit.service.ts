import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeseditService {

  private baseURL: string = environment.api;

  private sourceSubject = new Subject<User[]>();
  sourceMessage = this.sourceSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateuser(id: string, user: any): Observable<any> {
    return this.http.patch(`${this.baseURL}updateuser/${id}`, user);
  }

  deleteuser(id: string) {
    return this.http.delete(`${this.baseURL}deleteuser/${id}`)
  }

  allusers(): Observable<any> {
    return this.http.get(this.baseURL + 'allusers').pipe(
      map((data: any) => {
        this.sourceSubject.next(data);
        return data;
      })
    );
  }

  findNearestUsers(lat: number, lng: number): Observable<any> {
    // return http get request with lat and lng in body
    return this.http.post(`${this.baseURL}findNearestUsers`,{ lat: lat,lng: lng}).pipe(
      map((data: any) => {
        this.sourceSubject.next(data);
      })
    )
  }
}
