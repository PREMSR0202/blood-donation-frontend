import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {

  private baseURL: string = environment.api;
  constructor(private http: HttpClient) { }

  addBloodGroup(bloodType : string) :Observable<any>{
    return this.http.post(this.baseURL + 'addBloodGroup' , {bloodType  : bloodType});
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
