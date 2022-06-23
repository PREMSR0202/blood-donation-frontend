import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { bloodRequest } from 'src/app/interfaces/bloodRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodrequestService {

  private baseURL: string = environment.api;
  
  constructor(private http: HttpClient) { }

  addBloodRequest(BloodRequest : bloodRequest): Observable<any> {
    return this.http.post(this.baseURL + 'addBloodRequest', BloodRequest);
  }

  // refer
  updateBloodRequest(id : string , BloodRequest : bloodRequest): Observable<any>{
    return this.http.patch(`${this.baseURL}updateBloodRequest/${id}`,BloodRequest);
  }

  deleteBloodRequest(id : string): Observable<any>{
    return this.http.delete( `${this.baseURL}deleteBloodRequest/${id}`)
  }

  allBloodRequests():Observable<any>{
  return this.http.get(this.baseURL + 'allBloodRequests').pipe(
      map( (data: any) => {
        return data;
        })
      );
  }
}
