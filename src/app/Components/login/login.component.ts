import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/Interface/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }   
  eyeIcon(){
    var x = document.getElementsByName("password")[0] as HTMLInputElement;
    var togglePassword = document.querySelector('#togglePassword') as HTMLElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    togglePassword.classList.toggle('fa-eye-slash');
   
  }
  loginForm = new LoginModel('', '');

  submit() {
    const email = this.loginForm.email;
    const password = this.loginForm.password;
    if(email.length > 0 && password.length > 0 )
    {
      this.toastr.success('Login Successful !','',{
        timeOut: 2000,
        closeButton :true
      });
      this.router.navigate(['/'])
    }
    else 
    {
      this.toastr.info('Please fill out the fields','',{
        timeOut: 2000,
        closeButton :true
      });

    }
   
  }
  

}
