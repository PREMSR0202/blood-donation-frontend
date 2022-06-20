import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { emailValidator, passwordValidator, passwordMatch, mobileNumberValidator, bloodGroupValidator } from 'src/app/validator/registration.validator';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  constructor(private toastr: ToastrService,private router: Router,
    private formBuilder: FormBuilder, private auth: AuthService, private serv : EmployeesService) { }

  ngOnInit(): void {

  }
  showPassword(){
    var pass = document.getElementsByName("password")[0] as HTMLInputElement;
    var cpass = document.getElementsByName("cpassword")[0] as HTMLInputElement;
    var element = <HTMLInputElement> document.getElementById("showpassword");
     var isChecked = element.checked;
    if (isChecked === true) {
      pass.type = "text";
      cpass.type = "text";
    } else {
      pass.type = "password";
      cpass.type="password";
    }
   
  }
  get userName() {
    return this.registrationForm.get('username')
  }


  get password() {
    return this.registrationForm.get('password')
  }

  get email() {
    return this.registrationForm.get('email')
  }

  get designation() {
     return this.registrationForm.get("designation");
  }

  get phno() {
    return this.registrationForm.get("phno");
  }

  get bloodgroup() {
    return this.registrationForm.get("bloodgroup");
  }

  get address() {
    return this.registrationForm.get("address");
  }

  get dob(){
    return this.registrationForm.get("dob");
  }

  registrationForm = this.formBuilder.group({
    username: ['', Validators.required],
    designation:['', Validators.required],
    dob: ['', Validators.required],
    email: ['', [Validators.required, emailValidator()]],
    address: ['', Validators.required],
    bloodgroup: ['',[Validators.required, bloodGroupValidator()]],
    phno: ['', [Validators.required, mobileNumberValidator()]],
    password: ['', [Validators.required, passwordValidator()]],
    confirmpassword: ['', [Validators.required]]
  }, { validator: passwordMatch }
  )

  onSubmit() {
    this.toastr.success('Registration successful ! Please Login now !','',{
      timeOut: 3500,
      closeButton :true
    });
    this.registerUser();
    this.router.navigate(['/login'])
  
  }
  registerUser(){
    const date = new Date();

    const user: User = {
      _id: "1",
      name:  this.userName?.value,
      email: this.email?.value,
      password: this.password?.value,
      isAdmin:false,
      dob: this.dob?.value,
      bloodGroup: this.bloodgroup?.value,
      designation: this.designation?.value,
      address: this.address?.value,
      contact: this.phno?.value,
      isInterested: true,
      createdAt: date,
      updatedAt: date,
    };

    this.serv.createUser(user);
    console.log(user);
  }

}
