import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/interfaces/login-model';
import { EmployeesService } from 'src/app/service/user/employees.service';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cognito: CognitoService,
  ) {}
  loginForm = new LoginModel('', '');
  email = this.loginForm.email;
  password = this.loginForm.password;
  ngOnInit(): void {
  }
  eyeIcon() {
    var x = document.getElementsByName('password')[0] as HTMLInputElement;
    var togglePassword = document.querySelector(
      '#togglePassword'
    ) as HTMLElement;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
    togglePassword.classList.toggle('fa-eye-slash');
  }

  submit() {
    var email = document.getElementsByName('email')[0] as HTMLInputElement;
    var pass = document.getElementsByName('password')[0] as HTMLInputElement;
    this.email = email.value;
    this.password = pass.value;
    if (email.value.length > 0 && pass.value.length > 0) {
      this.loginUser();
    } else {
      this.toastr.info('Please fill out the fields', '', {
        timeOut: 2000,
        closeButton: true,
      });
    }
  }

  loginUser() {
    this.cognito.signIn(this.email, this.password).then(
      (data) => {
        this.toastr.success('Login Successful', '', {
          timeOut: 2000,
          closeButton: true,
        });
        this.cognito.getToken().then((token) => {
          let tkn = token?.idToken?.jwtToken;
          localStorage.setItem('idToken', token.idToken.jwtToken);
          if(localStorage.getItem('idToken')){
            console.log("login comp")
            this.router.navigate(['/']);
          }
        })
      }
    ).catch(
      (err) => {
        if(err.message === 'User is not confirmed.'){
          this.toastr.error('Please confirm your email', '', {
            timeOut: 2000,
            closeButton: true,
          });
          this.router.navigate(['/verify-email'], {queryParams: {email: this.email}});
        }
        else{
          this.toastr.error(err.message, '', {
            timeOut: 2000,
            closeButton: true,
          });
        }
      }
    );
  }
}
