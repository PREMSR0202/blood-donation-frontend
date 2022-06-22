import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, Subject } from 'rxjs';
import { bloodDonation } from 'src/app/interfaces/bloodDonations';


@Injectable({
  providedIn: 'root'
})
export class BlooddonationService {

  private sourceSubject = new Subject<bloodDonation[]>();
  sourceMessage = this.sourceSubject.asObservable();


  private baseURL: string = 'http://blooddonationapp-env.eba-bjdtpx52.us-east-1.elasticbeanstalk.com/';
  constructor(private http: HttpClient) { }

  addBloodDonation() {
    this.http.get(this.baseURL + 'addBloodDonation').subscribe(data => {
      this.allBloodDonations();
    });
  }

  // doubt
  updateBloodDonation(id: string, bloodDonation: bloodDonation): Observable<any> {
    return this.http.patch(`${this.baseURL}updateBloodDonation/${id}`, bloodDonation);
  }

  deleteBloodDonation(id: string) {
    this.http.delete(`${this.baseURL}deleteBloodDonation/${id}`).subscribe(data => {
      this.allBloodDonations();
    })
  }


  allBloodDonations() {
    return this.http.get<bloodDonation[]>(this.baseURL + 'allBloodDonations').subscribe(data => {
      if (data) {
        this.sourceSubject.next(data);
      }
    });
  }

}
