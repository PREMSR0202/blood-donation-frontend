import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, Subject } from 'rxjs';
import { bloodDonation } from 'src/app/interfaces/bloodDonations';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlooddonationService {


  private sourceSubject = new Subject<bloodDonation[]>();
  sourceMessage = this.sourceSubject.asObservable();


  private baseURL: string = environment.api;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  addBloodDonation(bloodDonation: any) {
    this.http.post(this.baseURL + 'addBloodDonation', bloodDonation).subscribe(data => {
      this.allBloodDonations();
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.msg, '', {
        timeOut: 2000,
        closeButton: true,
      });
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
