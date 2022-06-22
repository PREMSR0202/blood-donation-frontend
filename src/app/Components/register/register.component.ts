import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  emailValidator,
  passwordValidator,
  passwordMatch,
  mobileNumberValidator,
  bloodGroupValidator,
} from 'src/app/validator/registration.validator';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { User } from '../../interfaces/user';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private cognito: CognitoService
  ) {}

  ngOnInit(): void {}
  showPassword() {
    var pass = document.getElementsByName('password')[0] as HTMLInputElement;
    var cpass = document.getElementsByName('cpassword')[0] as HTMLInputElement;
    var element = <HTMLInputElement>document.getElementById('showpassword');
    var isChecked = element.checked;
    if (isChecked === true) {
      pass.type = 'text';
      cpass.type = 'text';
    } else {
      pass.type = 'password';
      cpass.type = 'password';
    }
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

  registrationForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmpassword: ['', [Validators.required]],
    },
    { validator: passwordMatch }
  );

  onSubmit() {
    if (this.registrationForm.valid) this.registerUser();
    else this.toastr.error('Please fill all the fields correctly');
  }
  registerUser() {
    const date = new Date();

    const user: User = {
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

    this.cognito.signUp(user.email,user.password).then(()=>{
      this.toastr.success('User registered successfully');
      this.toastr.success('Verification email sent to your email. Please Enter the Code to verify your account');
      // send to verify-email with email
      this.router.navigate(['/verify-email'],{queryParams:{email:user.email}});
    }).catch(err=>{
      this.toastr.error(err.message);
    })
  }
}
