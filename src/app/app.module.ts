import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { BasicInfoComponent } from './Components/basic-info/basic-info.component';
import { BloodDetailsComponent } from './Components/blood-details/blood-details.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { VerifyComponent } from './Components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BasicInfoComponent,
    BloodDetailsComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NoopAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    AgmCoreModule.forRoot({
      apiKey: environment.gapi,
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
