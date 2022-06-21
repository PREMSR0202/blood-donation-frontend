import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { BloodDonarsGroupComponent } from './blood-donars-group/blood-donars-group.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    BloodDonarsGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
