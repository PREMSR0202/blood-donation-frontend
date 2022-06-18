import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { map, Observable } from 'rxjs';
import { bloodDonation } from 'src/app/interfaces/bloodDonations';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BlooddonationService {

 
  private baseURL: string = 'http://blooddonationapp-env.eba-bjdtpx52.us-east-1.elasticbeanstalk.com/';
  constructor(private http: HttpClient) { }

  addBloodDonation(user : User , bloodGroup : string , donationDate : Date): Observable<any>{
    return this.http.post(this.baseURL + 'addBloodDonation', {user : user , bloodGroup : bloodGroup , donationDate : donationDate});
  }

  // doubt
  updateBloodDonation(id : string , bloodDonation : bloodDonation): Observable<any>{
    return this.http.patch(`${this.baseURL}updateBloodDonation/${id}`, bloodDonation);
  }

  deleteBloodDonation(id : string): Observable<any>{
    return this.http.delete( `${this.baseURL}deleteBloodDonation/${id}`)
  }

  allBloodDonations():Observable<any>{
  return this.http.get(this.baseURL + 'allBloodDonations').pipe(
      map( (data: any) => {
        console.log(data);
        return data;
        })
      );
  }



}
