import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {

  private baseURL: string = environment.api;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  private sourceSubject = new Subject<bloodGroup[]>();
  sourceMessage = this.sourceSubject.asObservable();

  addBloodGroup(bloodType: string): Observable<any> {
    return this.http.post(this.baseURL + 'addBloodGroup', { bloodType: bloodType });
  }

  updateBloodGroup(_id: string, bloodType: bloodGroup): Observable<any> {
    return this.http.patch(`${this.baseURL}updateBloodGroup/${_id}`, bloodType)
  }

  deleteBloodGroup(id: string) {
    return this.http.delete(`${this.baseURL}deleteBloodGroup/${id}`).subscribe(data => {
      this.allBloodGroup().subscribe();
      this.toastr.success('Blood Group Deleted Successfully', '', {
        timeOut: 2000,
        closeButton: true,
      });
    })
  }

  allBloodGroup(): Observable<any> {
    return this.http.get(this.baseURL + 'allBloodGroup').pipe(
      map((data: any) => {
        this.sourceSubject.next(data);
        return data;
      })
    );
  }
}
