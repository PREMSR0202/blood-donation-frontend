import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private toastr : ToastrService,
    private cognito : CognitoService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailAddr = params['email'];
      this.verifyForm.get('email')?.setValue(this.emailAddr);
    })
   }

  emailAddr : string = '';

  ngOnInit(): void {
    // email from route
    console.log(this.router)
  }

  verifyForm = this.formBuilder.group({
    email: ['',Validators.required],
    code: ['',Validators.required],
  });

  get email() {
    return this.verifyForm.get('email');
  }

  get code() {
    return this.verifyForm.get('code');
  }

  onSubmit(){
    if(!this.verifyForm.valid){
      this.toastr.error('Please fill all the fields');
    }
    else{
      this.cognito.confirmSignUp(this.email?.value, this.code?.value).then(
        (data) => {
          this.toastr.success('Verification Successful');
          this.router.navigate(['/login']);
        }
      ).catch(
        (err) => {
          this.toastr.error(err.message);
        }
      )
    }
  }

}
