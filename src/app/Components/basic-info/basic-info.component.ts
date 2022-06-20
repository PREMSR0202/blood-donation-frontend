import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { mobileNumberValidator } from 'src/app/validator/registration.validator';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private serv: EmployeesService
  ) {}

  userId: any = '';

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }

  get userName() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get designation() {
    return this.registrationForm.get('designation');
  }

  get phno() {
    return this.registrationForm.get('phno');
  }

  get bloodgroup() {
    return this.registrationForm.get('bloodgroup');
  }

  get address() {
    return this.registrationForm.get('address');
  }

  get dob() {
    return this.registrationForm.get('dob');
  }

  registrationForm = this.formBuilder.group({
    dob: ['', Validators.required],
    designation: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phno: ['', [Validators.required, mobileNumberValidator()]],
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      this.saveBasicInfo();
    }
    // this.registerUser();
    else this.toastr.error('Please fill all the fields correctly');
  }

  saveBasicInfo() {
    const date = new Date();

    const user: User = {
      _id: this.userId,
      name: this.userName?.value,
      email: this.email?.value,
      password: this.password?.value,
      isAdmin: false,
      dob: this.dob?.value,
      bloodGroup: this.bloodgroup?.value,
      designation: this.designation?.value,
      address: this.address?.value,
      contact: this.phno?.value,
      isInterested: true,
      createdAt: date,
      updatedAt: date,
    };
    
    this.auth.storeBasicInfo((user));
  }
}
