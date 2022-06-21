import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { RequestForm } from 'src/app/interfaces/request-form';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';
import { emailValidator, mobileNumberValidator } from 'src/app/validator/registration.validator';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}
  bloodGroups : bloodGroup[] = [] ;

  bloodGroup!: bloodGroup;

  userId: any = '';

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  ngOnInit(): void {
    
    this.userId = localStorage.getItem('userId');
    this.auth.fetchAllBloodGroups().subscribe(
      (res: any) => {
        this.bloodGroups = res;
      }
    );
    
}
  date:Date = new Date();
  mnth = ("0" + (this.date.getMonth() + 1)).slice(-2);
  day = ("0" + this.date.getDate()).slice(-2);
  todayDate = [this.date.getFullYear(), this.mnth, this.day].join("-");

  get userName() {
    
    return this.requestForm.get('username');
  }

  get email() {
    return this.requestForm.get('email');
  }

  get phno() {
    return this.requestForm.get('phno');
  }

  get bloodgroup() {
    return this.requestForm.get('bloodgroup');
  }

  get address() {
    return this.requestForm.get('address');
  }

  get reqdate() {
    return this.requestForm.get('reqdate');
  }

 

  requestForm = this.formBuilder.group({
    username: ['', Validators.required],    
    email: ['', [Validators.required, emailValidator()]],
    address: ['', [Validators.required]],
    phno: ['', [Validators.required, mobileNumberValidator()]],
    reqdate: ['', Validators.required],
    bloodgroup: ['', Validators.required]
  });



  onSubmit() {
    if(this.requestForm.valid)
      this.requestDonor();
    else
      this.toastr.error("Please fill all the fields correctly");
  
  }
  requestDonor(){

    const request: RequestForm = {
      name:  this.userName?.value,
      email: this.email?.value,
      reqdate: this.reqdate?.value,
      bloodGroup: this.bloodgroup?.value,
      address: this.address?.value,
      contact: this.phno?.value
    };

    console.log(request);

    // this.auth.createUser(user.email, user.password, user.name);
  }
}
