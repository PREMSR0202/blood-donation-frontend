import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { bloodRequest } from 'src/app/interfaces/bloodRequest';

@Injectable({
  providedIn: 'root'
})
export class BloodrequestService {

  private baseURL: string = 'http://blooddonationapp-env.eba-bjdtpx52.us-east-1.elasticbeanstalk.com/';
  
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
        console.log(data);
        return data;
        })
      );
  }
}
