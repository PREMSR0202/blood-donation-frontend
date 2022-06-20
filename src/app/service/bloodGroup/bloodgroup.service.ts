import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';

@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {

  private baseURL: string = 'http://blooddonationapp-env.eba-bjdtpx52.us-east-1.elasticbeanstalk.com/';
  constructor(private http: HttpClient) { }

  addBloodGroup(bloodType : string) :Observable<any>{
    return this.http.post(this.baseURL + 'addBloodGroup' , {bloodGroup  : bloodType});
  }

  updateBloodGroup(_id : string , bloodType : bloodGroup) : Observable<any>{
    return this.http.patch(`${this.baseURL}updateBloodGroup/${_id}`, bloodType)
  }

  deleteBloodGroup(id : string): Observable<any>{
    return this.http.delete( `${this.baseURL}deleteBloodGroup/${id}`)
  }

  allBloodGroup():Observable<any>{
    return this.http.get(this.baseURL + 'allBloodGroup').pipe(
        map( (data: any) => {
          console.log(data);
          return data;
          })
        );
    }
}
