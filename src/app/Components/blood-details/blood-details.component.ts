import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bloodGroup } from 'src/app/interfaces/bloodGroup';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeesService } from 'src/app/service/user/employees.service';

@Component({
  selector: 'app-blood-details',
  templateUrl: './blood-details.component.html',
  styleUrls: ['./blood-details.component.scss']
})
export class BloodDetailsComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private serv: EmployeesService
  ) {}

  userId: any = '';

  bloodGroups : bloodGroup[] = [] ;

  bloodGroup!: bloodGroup;

  ngOnInit(): void {
    this.auth.user().subscribe((user) => {      
      this.userId = user._id;
    })
    this.auth.fetchAllBloodGroups().subscribe(
      (res: any) => {
        this.bloodGroups = res;
      }
    );
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

  get isInterested(){
    return this.registrationForm.get('isInterested');
  }

  registrationForm = this.formBuilder.group({
    bloodgroup: ['', Validators.required],
    isInterested: ['', Validators.required]
  });
  
  onSubmit() {
    console.log(this.registrationForm.value);
    const bloodGroup = this.bloodGroups.find(
      (bloodGroup) => bloodGroup._id === this.registrationForm.value.bloodgroup
    );
    if(this.registrationForm.valid){
      this.saveBloodGroup(bloodGroup);
    }
    else{
      this.toastr.error('Please fill all the fields');
    }
  }

  saveBloodGroup(bloodGroup: any){
    const date = new Date();

    const user: User = {
      _id: this.userId,
      name: this.userName?.value,
      email: this.email?.value,
      password: this.password?.value,
      isAdmin: false,
      dob: this.dob?.value,
      bloodGroup: bloodGroup,
      designation: this.designation?.value,
      address: this.address?.value,
      contact: this.phno?.value,
      isInterested: this.isInterested?.value,
      createdAt: date,
      updatedAt: date,
    };
    this.auth.storeBloodGroup(user)
  }


}
