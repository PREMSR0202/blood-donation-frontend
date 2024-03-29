import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { BloodDonarsGroupComponent } from './blood-donars-group/blood-donars-group.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';
import { EmployeesComponent } from './employees/employees.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { DataTablesModule } from "angular-datatables";
import { FindNearestEmployeeComponent } from './find-nearest-employee/find-nearest-employee.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    BloodDonarsGroupComponent,
    UserNavbarComponent,
    UserSidebarComponent,
    UserProfileComponent,
    BloodDonationComponent,
    EmployeesComponent,
    BloodRequestComponent,
    FindNearestEmployeeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gapi,
      libraries: ['places']
    })
  ]
})
export class UserModule { }
