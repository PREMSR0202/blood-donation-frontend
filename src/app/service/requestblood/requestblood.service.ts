import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestForm } from 'src/app/interfaces/request-form';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestbloodService {

  
  private baseURL: string = environment.api;
  
  constructor(private http: HttpClient) { }

  addrequestForm(data : RequestForm) :Observable<any>{
    return this.http.post(this.baseURL + 'addBloodRequest' ,data);
  }

}
